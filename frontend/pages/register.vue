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
          <validation-observer
            ref="observer"
            v-slot="{ invalid }"
            slim>
            <v-form
              ref="registerForm"
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
              <validation-provider
                v-slot="{ errors }"
                name="First Name"
                rules="required">
                <v-text-field
                  v-model="user.first_name"
                  color="primary"
                  dense
                  :disabled="submitting"
                  :error="!!errors.length"
                  :error-messages="errors"
                  label="First Name*"
                  outlined
                  required
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
              </validation-provider>

              <!-- Last Name -->
              <validation-provider
                v-slot="{ errors }"
                name="Last Name"
                rules="required">
                <v-text-field
                  v-model="user.last_name"
                  color="primary"
                  dense
                  :disabled="submitting"
                  :error="!!errors.length"
                  :error-messages="errors"
                  label="Last Name*"
                  outlined
                  required
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
              </validation-provider>

              <!-- Email -->
              <validation-provider
                v-slot="{ errors }"
                name="Email"
                rules="required|email">
                <v-text-field
                  v-model="user.email"
                  color="primary"
                  dense
                  :disabled="submitting"
                  :error="!!errors.length"
                  :error-messages="errors"
                  label="Email*"
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
                rules="required|min:6"
                vid="confirm">
                <v-text-field
                  v-model="user.password"
                  color="primary"
                  dense
                  :disabled="submitting"
                  :error="!!errors.length"
                  :error-messages="errors"
                  label="Password*"
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

              <!-- Verify Password -->
              <validation-provider
                v-slot="{ errors }"
                name="Password Confirmation"
                rules="required|password:@confirm">
                <v-text-field
                  v-model="user.password_confirmation"
                  color="primary"
                  dense
                  :disabled="submitting"
                  :error="!!errors.length"
                  :error-messages="errors"
                  label="Confirm Password*"
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
                    There was an error creating your account. Please try again.
                  </p>
                </v-alert>
                <v-btn
                  block
                  color="primary"
                  depressed
                  :disabled="submitting || invalid"
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
  import { email, min, required } from 'vee-validate/dist/rules';
  import { extend, ValidationProvider, ValidationObserver } from 'vee-validate';
  import { authService } from '~/services';
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

  extend('min', {
    ...min,
    message: 'Password must be minimum of six characters'
  });

  extend('password', {
    params: ['target'],
    validate (value, { target }) {
      return value === target;
    },
    message: 'Password confirmation does not match'
  });

  export default {
    layout: 'auth',

    name: 'Register',

    data () {
      return {
        errorColor: '',
        isError: false,
        submitting: false,
        passwordRules: [v => !!v || 'Password is required'],
        user: {
          password_confirmation: '',
          first_name: '',
          last_name: '',
          email: '',
          password: ''
        }
      };
    },

    methods: {
      async handleSubmit () {
        if (await this.$refs.observer.validate()) {
          this.submitting = true;

          const payload = { variables: { ...this.user }, graphql: this.$graphql };

          try {
            const { token } = await authService.register(payload);

            // set the token in cookies
            if (token) {
              this.$cookies.set('gc-token', token, { expires: 7 });

              this.$router.push({ path: '/onboarding' });
            } else {
              this.isError = true;
              this.loggingIn = false;
              return;
            }
          } catch (e) {
            console.error(e);
            this.isError = true;
            this.submitting = false;
          }
        }
      }
    },

    mounted () {
      this.errorColor = this.$nuxt.$vuetify.theme.themes.light.error;

      // clear apollo-token from cookies to make sure none were accidentally set
      this.$cookies.remove('gc-token');
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
