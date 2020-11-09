<template>
  <div class="login">
    <div class="left">
      <fade-transition>
        <login-description-box />
      </fade-transition>
    </div>
    <div class="right">
      <slide-fade-transition>
        <div class="form-wrapper">
          <v-form
            ref="loginForm"
            v-model="valid"
            @submit.prevent="handleSubmit">
            <div class="form-header">
              <logo-icon
                height="50px"
                width="50px" />
              <div class="text-h4">
                Login
              </div>
              <span class="body-1">or <router-link to="/register">create a new account.</router-link></span>
            </div>

            <!-- Email -->
            <v-text-field
              v-model="email"
              color="primary"
              dense
              :disabled="loggingIn"
              :error="isError"
              label="Email"
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
              v-model="password"
              color="primary"
              dense
              :disabled="loggingIn"
              :error="isError"
              label="Password"
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
                  Your email or password is incorrect. Please try again.
                </p>
              </v-alert>
              <v-btn
                block
                color="primary"
                depressed
                :disabled="loggingIn"
                :ripple="false"
                type="submit">
                <loading
                  v-if="loggingIn"
                  color="#0077be"
                  height="30px"
                  width="30px" />
                <span v-else>Login</span>
              </v-btn>
              <v-btn
                class="mt-3"
                color="primary"
                nuxt
                text
                to="/forgot-password">
                Forgot Password?
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
  // import { loginService } from '~/services';
  import loginMutation from '~/apollo/mutations/auth/login.gql';
  import LogoIcon from '~/components/icons/LogoIcon';
  import SlideFadeTransition from '~/components/transitions/SlideFadeTransition';

  export default {
    layout: 'homepage',

    name: 'Login',

    data: () => ({
      email: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      errorColor: '',
      isError: false,
      loggingIn: false,
      password: '',
      passwordRules: [v => !!v || 'Password is required'],
      valid: false
    }),

    methods: {
      async handleSubmit () {
        if (this.$refs.loginForm.validate()) {
          this.loggingIn = true;

          const email = this.email;
          const password = this.password;

          try {
            const { data: { login: { token } }, errors } = await this.$apollo.mutate({
              mutation: loginMutation,
              variables: {
                email,
                password
              }
            });

            if (errors?.length) {
              this.isError = true;
              this.loggingIn = false;
            }

            // set the jwt to the this.$apolloHelpers.onLogin
            await this.$apolloHelpers.onLogin(token);
            this.$router.push({ path: '/closet' });
          } catch (e) {
            console.error('login error: ', e);
            this.isError = true;
            this.loggingIn = false;
          }
        }
      }
    },

    async mounted () {
      this.errorColor = this.$nuxt.$vuetify.theme.themes.light.error;
      // clear apollo-token from cookies to make sure user is fully logged out
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
        title: 'Login'
      };
    }
  };
</script>

<style lang="scss" scoped>
  .login {
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
