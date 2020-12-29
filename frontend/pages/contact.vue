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
          key="submitted"
          class="submitted-message">
          <div class="text-h4">
            Thank You!
          </div>
          <p class="body-1">
            We have received your message and will respond as soon as possible.
          </p>
        </div>
        <div
          v-else
          key="notSubmitted"
          class="form-wrapper">
          <v-form
            ref="contactForm"
            v-model="valid">
            <div class="form-header">
              <logo-icon
                height="50px"
                width="50px" />
              <div class="text-h4">
                Contact Us
              </div>
              <span class="body-1">or <router-link to="/login">go back to login.</router-link></span>
            </div>

            <!-- First Name -->
            <v-text-field
              v-model="user.first_name"
              color="primary"
              dense
              :disabled="submitting"
              label="First Name"
              outlined
              required
              :rules="nameRules"
              validate-on-blur>
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
              label="Last Name"
              outlined
              required
              :rules="nameRules"
              validate-on-blur>
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

            <!-- Message -->
            <v-textarea
              v-model="user.message"
              color="primary"
              dense
              :disabled="submitting"
              label="Message"
              outlined
              required
              validate-on-blur>
              <template #prepend-inner>
                <custom-icon
                  fill="#0077be"
                  :height="20"
                  name="comment-alt-dots"
                  :width="20" />
              </template>
            </v-textarea>

            <!-- Form Submit -->
            <div class="btn-actions">
              <v-btn
                block
                color="primary"
                depressed
                :disabled="submitting"
                :ripple="false"
                @click="handleSubmit">
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
  import CustomIcon from '~/components/icons/CustomIcon.vue';
  import FadeTransition from '~/components/transitions/FadeTransition.vue';
  import Loading from '~/components/Loading.vue';
  import LoginDescriptionBox from '~/components/LoginDescriptionBox.vue';
  import LogoIcon from '~/components/icons/LogoIcon.vue';
  import SlideFadeTransition from '~/components/transitions/SlideFadeTransition.vue';

  export default {
    layout: 'homepage',

    name: 'Contact',

    data () {
      return {
        emailRules: [
          v => !!v || 'Email is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        isSubmitted: false,
        submitting: false,
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
        //   this.submitting = true;
        //   const payload = { email: this.email, password: this.password };
        //   if (payload.email && payload.password) {
        //     const res = await userService.login(payload);
        //     if (res.status === 401) {
        //       this.logginIn = false;
        //     } else {
        //       this.submitting = false;
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
      CustomIcon,
      FadeTransition,
      Loading,
      LoginDescriptionBox,
      LogoIcon,
      SlideFadeTransition
    },

    head () {
      return {
        title: 'Contact'
      };
    }
  };
</script>

<style lang="scss" scoped>
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
