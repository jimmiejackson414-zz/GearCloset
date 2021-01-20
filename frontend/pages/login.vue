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
          <validation-observer
            ref="observer"
            v-slot="{ invalid }"
            slim>
            <v-form
              ref="loginForm"
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
              <validation-provider
                v-slot="{ errors }"
                mode="eager"
                name="Email"
                rules="required|email">
                <v-text-field
                  v-model="email"
                  color="primary"
                  dense
                  :disabled="loggingIn"
                  :error="!!errors.length"
                  :error-messages="errors"
                  label="Email"
                  outlined
                  required
                  type="email"
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
              </validation-provider>

              <!-- Password -->
              <validation-provider
                v-slot="{ errors }"
                name="Password"
                rules="required">
                <v-text-field
                  v-model="password"
                  color="primary"
                  dense
                  :disabled="loggingIn"
                  :error="!!errors.length"
                  :error-messages="errors"
                  label="Password"
                  outlined
                  required
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
              </validation-provider>

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
                  :disabled="loggingIn || invalid"
                  :ripple="false"
                  type="submit">
                  <loading
                    v-if="loggingIn"
                    color="#0077be"
                    height="30px"
                    width="30px" />
                  <span v-else>Login</span>
                </v-btn>
                <!-- <v-btn
                class="mt-3"
                color="primary"
                nuxt
                text
                to="/forgot-password">
                Forgot Password?
              </v-btn> -->
              </div>
            </v-form>
          </validation-observer>
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
  import { mapActions } from 'vuex';
  import { email, required } from 'vee-validate/dist/rules';
  import { extend, ValidationProvider, ValidationObserver } from 'vee-validate';
  import CustomIcon from '~/components/icons/CustomIcon';
  import FadeTransition from '~/components/transitions/FadeTransition';
  import Loading from '~/components/Loading';
  import LoginDescriptionBox from '~/components/LoginDescriptionBox';
  import LogoIcon from '~/components/icons/LogoIcon';
  import SlideFadeTransition from '~/components/transitions/SlideFadeTransition';

  extend('required', {
    ...required,
    message: '{_field_} is required'
  });

  extend('email', {
    ...email,
    message: 'Please provide a valid email'
  });

  export default {
    layout: 'auth',

    name: 'Login',

    data: () => ({
      email: '',
      errorColor: '',
      isError: false,
      loggingIn: false,
      password: ''
    }),

    methods: {
      ...mapActions('entities/users', [
        'login',
        'logout'
      ]),
      async handleSubmit () {
        if (await this.$refs.observer.validate()) {
          this.loggingIn = true;

          const email = this.email;
          const password = this.password;
          const payload = { variables: { email, password } };

          try {
            const res = await this.login(payload);

            if (!res.success) {
              this.isError = true;
              this.loggingIn = false;
              return;
            }

            this.$router.push({ path: '/closet ' });
          } catch (e) {
            console.error(e);
            this.isError = true;
            this.loggingIn = false;
          }
        }
      }
    },

    mounted () {
      this.errorColor = this.$nuxt.$vuetify.theme.themes.light.error;
      // clear token from cookies to make sure user is fully logged out
      if (this.$cookies.get('gc_token')) {
        this.logout();
      }
      this.$store.dispatch('entities/deleteAll');
    },

    components: {
      CustomIcon,
      FadeTransition,
      Loading,
      LoginDescriptionBox,
      LogoIcon,
      SlideFadeTransition,
      ValidationObserver,
      ValidationProvider
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
