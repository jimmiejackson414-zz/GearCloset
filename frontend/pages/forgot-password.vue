<template>
  <div class="forgot-password">
    <div class="left">
      <fade-transition>
        <login-description-box />
      </fade-transition>
    </div>
    <div class="right">
      <slide-fade-transition>
        <v-form
          ref="forgotPasswordForm"
          v-model="valid">
          <div class="form-header">
            <logo-icon
              height="50px"
              width="50px" />
            <h2 class="display-1">
              Forgot Your Password?
            </h2>
            <span class="body-1"><router-link to="/login">Login to your existing account.</router-link></span>
          </div>

          <!-- Email -->
          <v-text-field
            v-model="email"
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
      </slide-fade-transition>
      <div class="contact body-1">
        <a
          href="mailto:jimmiejackson414@gmail.com?subject=Gear_Closet"
          target="_blank">
          Contact Us
        </a>
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
        email: '',
        emailRules: [
          v => !!v || 'Email is required'
        ],
        loggingIn: false,
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

  .forgot-password {
    display: flex;
    flex-flow: row wrap;
    height: 100%;

    .left {
      display: none;

      @include breakpoint(tablet) {
        align-items: center;
        display: flex;
        flex-basis: 70%;
      }
    }

    .right {
      align-items: center;
      background-color: white;
      box-shadow: -3px 0px 15px 0px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-basis: 100%;
      padding: 0 5rem;

      @include breakpoint(tablet) {
        flex-basis: 30%;
        padding: 0 4rem;
      }

      form {
        width: 100%;

        .form-header {
          margin-bottom: 1rem;
          text-align: center;
        }
      }

      .contact {
        bottom: 3%;
        position: absolute;
        right: 32px;

        a {
          color: $dark-grey;
        }
      }
    }
  }
</style>
