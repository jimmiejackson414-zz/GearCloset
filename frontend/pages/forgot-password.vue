<template>
  <div class="forgot-password">
    <div class="left">
      <fade-transition>
        <login-description-box />
      </fade-transition>
    </div>
    <div class="right">
      <slide-fade-transition>
        <div
          v-if="!submitted"
          class="form-wrapper">
          <v-form
            ref="forgotPasswordForm"
            v-model="valid"
            @submit.prevent="handleSubmit">
            <div class="form-header">
              <logo-icon
                height="50px"
                width="50px" />
              <div class="text-h4">
                Forgot Your Password?
              </div>
              <span class="body-1"><router-link to="/login">Login to your existing account.</router-link></span>
            </div>

            <!-- Email -->
            <v-text-field
              v-model="email"
              color="primary"
              dense
              :disabled="submitting"
              label="Email"
              outlined
              required
              :rules="emailRules"
              validate-on-blur>
              <template #prepend-inner>
                <custom-icon
                  fill="#0077be"
                  :height="20"
                  name="envelope-alt"
                  :width="20" />
              </template>
            </v-text-field>

            <!-- Form Submit -->
            <div class="btn-actions">
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
                <span v-else>Submit</span>
              </v-btn>
            </div>
          </v-form>
        </div>
      </slide-fade-transition>
      <slide-fade-transition>
        <div
          v-if="submitted"
          class="submitted-wrapper">
          <div class="header">
            <logo-icon
              height="50px"
              width="50px" />
            <div class="text-h4 text-center mb-4">
              Submitted!
            </div>

            <p class="body-text-1 text-center">
              Please check your email to reset your password.
            </p>
          </div>
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
  import resetPasswordMutation from '~/apollo/mutations/auth/resetPassword.gql';
  import CustomIcon from '~/components/icons/CustomIcon.vue';
  import FadeTransition from '~/components/transitions/FadeTransition.vue';
  import Loading from '~/components/Loading.vue';
  import LoginDescriptionBox from '~/components/LoginDescriptionBox.vue';
  import LogoIcon from '~/components/icons/LogoIcon.vue';
  import SlideFadeTransition from '~/components/transitions/SlideFadeTransition.vue';

  export default {
    layout: 'auth',

    name: 'ForgotPassword',

    data () {
      return {
        email: '',
        emailRules: [
          v => !!v || 'Email is required'
        ],
        submitted: false,
        submitting: false,
        valid: false
      };
    },

    methods: {
      async handleSubmit () {
        if (this.$refs.forgotPasswordForm.validate()) {
          this.submitting = true;
          const email = this.email;

          try {
            const { errors } = await this.$apollo.mutate({
              mutation: resetPasswordMutation,
              variables: {
                email
              }
            });

            if (errors?.length) {
              this.isError = true;
              this.submitting = false;
            }
          } catch (e) {
            console.error('reset password error: ', e);
            this.isError = true;
            this.submitting = false;
          }
        }
      }
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
        title: 'Forgot Password'
      };
    }
  };
</script>

<style lang="scss" scoped>
  .forgot-password {
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

      .form-wrapper, .submitted-wrapper {
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

        .header {
          text-align: center;
        }
      }

      .contact-wrapper {
        text-align: center;
      }
    }
  }
</style>
