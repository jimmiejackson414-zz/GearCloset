<template>
  <v-form
    ref="accountSettingsForm"
    v-model="valid">
    <v-container class="pt-0">
      <v-row>
        <v-col class="col-12 pb-0">
          <h6 class="text-h6 text-left">
            Password
          </h6>
        </v-col>
      </v-row>
      <v-row class="justify-center align-center">
        <!-- Password -->
        <v-col class="col-12 col-md-6">
          <v-text-field
            v-model="currentUser.password"
            color="primary"
            dense
            :disabled="submitting"
            label="Password"
            outlined
            required
            :rules="passwordRules"
            type="password"
            validate-on-blur>
            <template #prepend-inner>
              <custom-icon
                fill="#0077be"
                :height="20"
                name="padlock"
                :width="20" />
            </template>
          </v-text-field>
        </v-col>

        <!-- Verify Password -->
        <v-col class="col-12 col-md-6">
          <v-text-field
            v-model="confirm_password"
            color="primary"
            dense
            :disabled="submitting"
            label="Confirm Password"
            outlined
            required
            :rules="passwordsMatchRules"
            type="password"
            validate-on-blur>
            <template #prepend-inner>
              <custom-icon
                fill="#0077be"
                :height="20"
                name="padlock"
                :width="20" />
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <!-- Form Submit -->
      <v-row class="text-right">
        <v-col class="col-12">
          <v-btn
            color="primary"
            depressed
            :disabled="submitting"
            :ripple="false"
            @click="handleSubmit">
            <loading
              v-if="submitting"
              color="#fff"
              height="30px"
              width="30px" />
            <span v-else>Submit</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  import CustomIcon from '~/components/icons/CustomIcon';
  import Loading from '~/components/Loading';

  export default {
    props: {
      currentUser: {
        type: Object,
        default: () => {}
      },
      submitting: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        confirm_password: '',
        passwordRules: [v => !!v || 'Password is required'],
        passwordsMatchRules: [
          v => !!v || 'Password confirmation is required',
          v => (this.currentUser.password === this.confirm_password) || 'Passwords must match'
        ],
        valid: false
      };
    },

    methods: {
      handleSubmit () {
        this.$emit('handle-submit');
      }
    },

    components: {
      CustomIcon,
      Loading
    }
  };
</script>

<style lang="scss" scoped>

</style>
