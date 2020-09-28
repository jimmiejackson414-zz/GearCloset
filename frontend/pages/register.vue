<template>
  <div class="register">
    <div class="left">
      <fade-transition>
        <login-description-box />
      </fade-transition>
    </div>
    <div class="right">
      <slide-fade-transition>
        <v-form
          ref="registerForm"
          v-model="valid">
          <div class="form-header">
            <logo-icon
              height="50px"
              width="50px" />
            <h2 class="display-1">
              Register
            </h2>
            <span class="body-1">or <router-link to="/login">login to your existing account.</router-link></span>
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

          <!-- Password -->
          <v-text-field
            v-model="user.password"
            color="primary"
            label="Password"
            outlined
            required
            :rules="passwordRules"
            type="password"
            validate-on-blur>
            <template v-slot:prepend-inner>
              <icon
                fill="#0077be"
                height="20px"
                name="padlock"
                width="20px" />
            </template>
          </v-text-field>

          <!-- Verify Password -->
          <v-text-field
            v-model="confirm_password"
            color="primary"
            label="Confirm Password"
            outlined
            required
            :rules="passwordsMatchRules"
            type="password"
            validate-on-blur>
            <template v-slot:prepend-inner>
              <icon
                fill="#0077be"
                height="20px"
                name="padlock"
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
              Register
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
        confirm_password: '',
        email: '',
        emailRules: [
          v => !!v || 'Email is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        loggingIn: false,
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
          password: '',
          trail_name: ''
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
      padding: 0 5rem;

      @include breakpoint(laptop) {
        flex-basis: 40%;
        padding: 0 4rem;
      }

      @include breakpoint(smallDisplay) {
        flex-basis: 30%;
      }

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