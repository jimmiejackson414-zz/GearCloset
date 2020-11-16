<template>
  <div class="register">
    <div class="left">
      <fade-transition>
        <login-description-box />
      </fade-transition>
    </div>
    <div class="right">
      <slide-fade-transition>
        <div class="form-wrapper">
          <v-form
            ref="registerForm"
            v-model="valid"
            @submit.prevent="handleSubmit">
            <div class="form-header">
              <logo-icon
                height="50px"
                width="50px" />
              <div class="text-h4">
                Register
              </div>
              <span class="text-body-1">or <router-link to="/login">login to your existing account.</router-link></span>
            </div>

            <!-- First Name -->
            <v-text-field
              v-model="user.first_name"
              color="primary"
              dense
              :disabled="submitting"
              :error="isError"
              label="First Name*"
              outlined
              required
              :rules="nameRules"
              validate-on-blur
              @keyup.enter="handleSubmit">
              <template #prepend-inner>
                <custom-icon
                  fill="#0077be"
                  :height="20"
                  name="user-circle"
                  :width="20" />
              </template>
            </v-text-field>

            <!-- Last Name -->
            <v-text-field
              v-model="user.last_name"
              color="primary"
              dense
              :disabled="submitting"
              :error="isError"
              label="Last Name*"
              outlined
              required
              :rules="nameRules"
              validate-on-blur
              @keyup.enter="handleSubmit">
              <template #prepend-inner>
                <custom-icon
                  fill="#0077be"
                  :height="20"
                  name="user-circle"
                  :width="20" />
              </template>
            </v-text-field>

            <!-- Email -->
            <v-text-field
              v-model="user.email"
              color="primary"
              dense
              :disabled="submitting"
              :error="isError"
              label="Email*"
              outlined
              required
              :rules="emailRules"
              validate-on-blur
              @keyup.enter="handleSubmit">
              <template #prepend-inner>
                <custom-icon
                  fill="#0077be"
                  :height="20"
                  name="envelope-alt"
                  :width="20" />
              </template>
            </v-text-field>

            <!-- Password -->
            <v-text-field
              v-model="user.password"
              color="primary"
              dense
              :disabled="submitting"
              :error="isError"
              label="Password*"
              outlined
              required
              :rules="passwordRules"
              type="password"
              validate-on-blur
              @keyup.enter="handleSubmit">
              <template #prepend-inner>
                <custom-icon
                  fill="#0077be"
                  :height="20"
                  name="padlock"
                  :width="20" />
              </template>
            </v-text-field>

            <!-- Verify Password -->
            <v-text-field
              v-model="confirm_password"
              color="primary"
              dense
              :disabled="submitting"
              :error="isError"
              label="Confirm Password*"
              outlined
              required
              :rules="passwordsMatchRules"
              type="password"
              validate-on-blur
              @keyup.enter="handleSubmit">
              <template #prepend-inner>
                <custom-icon
                  fill="#0077be"
                  :height="20"
                  name="padlock"
                  :width="20" />
              </template>
            </v-text-field>

            <!-- Form Submit -->
            <div class="btn-actions">
              <v-alert
                v-if="isError"
                border="top"
                color="error"
                outlined>
                <template #prepend>
                  <custom-icon
                    custom-class="mr-4"
                    :fill="errorColor"
                    :height="30"
                    name="exclamation-triangle"
                    :width="30" />
                </template>
                <p class="body-text-1 mb-0 error--text">
                  There was an error creating your account. Please try again.
                </p>
              </v-alert>
              <v-btn
                block
                color="primary"
                depressed
                :disabled="submitting"
                :ripple="false"
                type="submit">
                <loading
                  v-if="submitting"
                  color="#0077be"
                  height="30px"
                  width="30px" />
                <span v-else>Register</span>
              </v-btn>
            </div>
          </v-form>
        </div>
      </slide-fade-transition>
      <div class="contact-wrapper">
        <div class="contact body-1 mb-2">
          <nuxt-link to="/contact">
            Contact Us
          </nuxt-link>
        </div>
        <span class="subtitle-1">&copy; {{ new Date().getFullYear() }} Gear Closet</span>
      </div>
    </div>
  </div>
</template>

<script>
  import CustomIcon from '~/components/icons/CustomIcon';
  import FadeTransition from '~/components/transitions/FadeTransition';
  import Loading from '~/components/Loading';
  import LoginDescriptionBox from '~/components/LoginDescriptionBox';
  import LogoIcon from '~/components/icons/LogoIcon';
  import registerMutation from '~/apollo/mutations/auth/register.gql';
  import SlideFadeTransition from '~/components/transitions/SlideFadeTransition';

  export default {
    layout: 'homepage',

    name: 'Register',

    data () {
      return {
        confirm_password: '',
        emailRules: [
          v => !!v || 'Email is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        errorColor: '',
        isError: false,
        submitting: false,
        nameRules: [
          v => !!v || 'This is a required field'
        ],
        passwordRules: [v => !!v || 'Password is required'],
        passwordsMatchRules: [
          v => !!v || 'Password confirmation is required',
          v => (this.user.password === this.confirm_password) || 'Passwords must match'
        ],
        user: {
          first_name: '',
          last_name: '',
          email: '',
          password: ''
        },
        valid: false
      };
    },

    methods: {
      async handleSubmit () {
        if (this.$refs.registerForm.validate()) {
          this.submitting = true;

          try {
            const { data: { register: { token } }, errors } = await this.$apollo.mutate({
              mutation: registerMutation,
              variables: {
                ...this.user
              }
            });

            if (errors?.length) {
              this.isError = true;
              this.loggingIn = false;
            }

            // set the jwt to the this.$apolloHelpers.onLogin
            await this.$apolloHelpers.onLogin(token);
            this.$router.push({ path: '/onboarding' });
          } catch (e) {
            console.error('register error: ', e);
            this.isError = true;
            this.submitting = false;
          }
        }
      }
    },

    async mounted () {
      this.errorColor = this.$nuxt.$vuetify.theme.themes.light.error;

      // clear apollo-token from cookies to make sure none were accidentally set
      await this.$apolloHelpers.onLogout();
    },

    components: {
      CustomIcon,
      FadeTransition,
      Loading,
      LoginDescriptionBox,
      LogoIcon,
      SlideFadeTransition
    },

    head () {
      return {
        title: 'Register'
      };
    }
  };
</script>

<style lang="scss" scoped>
  .register {
    display: flex;
    flex-flow: row wrap;
    height: 100%;

    .left {
      display: none;

      @include breakpoint(laptop) {
        align-items: center;
        display: flex;
        flex-basis: 60%;
        flex-flow: row wrap;
      }

      @include breakpoint(smallDisplay) {
        flex-basis: 70%;
      }
    }

    .right {
      align-items: center;
      background-color: white;
      box-shadow: -3px 0px 15px 0px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-basis: 100%;
      flex-direction: column;
      justify-content: center;
      padding: 1rem 5rem;

      @include breakpoint(laptop) {
        flex-basis: 40%;
        padding: 1rem 4rem;
      }

      @include breakpoint(smallDisplay) {
        flex-basis: 30%;
      }

      .form-wrapper {
        align-items: center;
        display: flex;
        flex-grow: 1;
        width: 100%;

        form {
          width: 100%;

          .form-header {
            margin-bottom: 1rem;
            text-align: center;
          }

          .btn-actions {
            display: flex;
            flex-direction: column;
          }
        }
      }

      .contact-wrapper {
        text-align: center;
      }
    }
  }
</style>
