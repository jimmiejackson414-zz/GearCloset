<template>
  <div class="login">
    <div class="left">
      <fade-transition>
        <login-description-box />
      </fade-transition>
    </div>
    <div class="right">
      <slide-fade-transition>
        <v-form
          ref="loginForm"
          v-model="valid">
          <div class="form-header">
            <logo-icon
              height="50px"
              width="50px" />
            <h2 class="display-1">
              Login
            </h2>
            <span class="body-1">or <router-link to="/register">create a new account</router-link></span>
          </div>

          <!-- Email -->
          <v-text-field
            v-model="email"
            color="primary"
            label="Email"
            outlined
            required
            :rules="emailRules"
            validate-on-blur
            @keyup.enter="handleSubmit">
            <template v-slot:prepend-inner>
              <icon
                name="envelope-alt"
                fill="#0077be"
                height="20px"
                width="20px" />
            </template>
          </v-text-field>

          <!-- Password -->
          <v-text-field
            v-model="password"
            color="primary"
            label="Password"
            outlined
            required
            :rules="passwordRules"
            type="password"
            validate-on-blur
            @keyup.enter="handleSubmit">
            <template v-slot:prepend-inner>
              <icon
                name="padlock"
                fill="#0077be"
                height="20px"
                width="20px" />
            </template>
          </v-text-field>

          <!-- Form Submit -->
          <div class="btn-actions">
            <v-btn
              color="primary"
              :disabled="loggingIn"
              block
              depressed
              :ripple="false"
              @click="handleSubmit">
              Login
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
  import Icon from '~/components/Icon';
  import LoginDescriptionBox from '~/components/LoginDescriptionBox';
  import LogoIcon from '~/components/icons/LogoIcon';
  import FadeTransition from '~/components/transitions/FadeTransition';
  import SlideFadeTransition from '~/components/transitions/SlideFadeTransition';

  export default {
    layout: 'homepage',

    data: () => ({
      email: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      loggingIn: false,
      password: '',
      passwordRules: [v => !!v || 'Password is required'],
      valid: false
    }),

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

  .login {
    display: flex;
    flex-flow: row wrap;
    height: 100%;

    .left {
      display: none;

      @media screen and (min-width: 800px) {
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

      @media screen and (min-width: 800px) {
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
