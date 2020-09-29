<template>
  <div class="contact">
    <div class="left">
      <fade-transition>
        <login-description-box />
      </fade-transition>
    </div>
    <div class="right">
      <slide-fade-transition>
        <div
          v-if="isSubmitted"
          class="submitted-message">
          <h2 class="display-1">
            Thank You.
          </h2>
          <p class="body-1">
            We have received your message and will respond as soon as possible.
          </p>
        </div>
        <div
          v-else
          class="form-wrapper">
          <v-form
            ref="contactForm"
            v-model="valid">
            <div class="form-header">
              <logo-icon
                height="50px"
                width="50px" />
              <h2 class="display-1">
                Contact Us
              </h2>
              <span class="body-1">or <router-link to="/login">go back to login.</router-link></span>
            </div>

            <!-- First Name -->
            <v-text-field
              v-model="user.first_name"
              color="primary"
              label="First Name"
              outlined
              required
              :rules="nameRules"
              validate-on-blur>
              <template v-slot:prepend-inner>
                <icon
                  fill="#0077be"
                  height="20px"
                  name="user-circle"
                  width="20px" />
              </template>
            </v-text-field>

            <!-- Last Name -->
            <v-text-field
              v-model="user.last_name"
              color="primary"
              label="Last Name"
              outlined
              required
              :rules="nameRules"
              validate-on-blur>
              <template v-slot:prepend-inner>
                <icon
                  fill="#0077be"
                  height="20px"
                  name="user-circle"
                  width="20px" />
              </template>
            </v-text-field>

            <!-- Email -->
            <v-text-field
              v-model="user.email"
              color="primary"
              label="Email"
              outlined
              required
              :rules="emailRules"
              validate-on-blur>
              <template v-slot:prepend-inner>
                <icon
                  fill="#0077be"
                  height="20px"
                  name="envelope-alt"
                  width="20px" />
              </template>
            </v-text-field>

            <!-- Message -->
            <v-textarea
              v-model="user.message"
              color="primary"
              label="Message"
              outlined
              required
              validate-on-blur>
              <template v-slot:prepend-inner>
                <icon
                  fill="#0077be"
                  height="20px"
                  name="comment-alt-dots"
                  width="20px" />
              </template>
            </v-textarea>

            <!-- Form Submit -->
            <div class="btn-actions">
              <v-btn
                block
                color="primary"
                depressed
                :disabled="loggingIn"
                :ripple="false"
                @click="handleSubmit">
                Submit
              </v-btn>
            </div>
          </v-form>
          </div.submitted-message>
        </div>
      </slide-fade-transition>
      <div class="contact-wrapper">
        <div class="body-1 mb-2">
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
  import Icon from '~/components/icons/Icon';
  import FadeTransition from '~/components/transitions/FadeTransition';
  import LoginDescriptionBox from '~/components/LoginDescriptionBox';
  import LogoIcon from '~/components/icons/LogoIcon';
  import SlideFadeTransition from '~/components/transitions/SlideFadeTransition';

  export default {
    layout: 'homepage',

    data () {
      return {
        emailRules: [
          v => !!v || 'Email is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        isSubmitted: false,
        loggingIn: false,
        nameRules: [
          v => !!v || 'This is a required field'
        ],
        user: {
          first_name: '',
          last_name: '',
          email: '',
          message: ''
        },
        valid: false
      };
    },

    methods: {
      handleSubmit () {
        console.log('user Service');
        // if (this.$refs.loginForm.validate()) {
        //   this.loggingIn = true;
        //   const payload = { email: this.email, password: this.password };
        //   if (payload.email && payload.password) {
        //     const res = await userService.login(payload);
        //     if (res.status === 401) {
        //       this.logginIn = false;
        //     } else {
        //       this.loggingIn = false;
        //       router.push('/');
        //     }
        //   }
        // }
        setTimeout(() => {
          this.isSubmitted = true;
        }, 2000);
      }
    },

    components: {
      FadeTransition,
      Icon,
      LoginDescriptionBox,
      LogoIcon,
      SlideFadeTransition
    }
  };
</script>

<style lang="scss" scoped>
  @import '~/css/global';
  @import '~/css/breakpoints';

  .contact {
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

      .submitted-message {
        align-items: center;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: center;
        text-align: center;
        width: 60%;
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
