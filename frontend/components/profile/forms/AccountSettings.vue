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
          <v-alert
            v-if="hasError"
            border="top"
            class="mt-4"
            color="error"
            dense
            dismissible
            outlined>
            <template #prepend>
              <custom-icon
                custom-class="mr-4"
                :fill="errorColor"
                :height="30"
                name="exclamation-triangle"
                :width="30" />
              <p class="body-text-1 mb-0 error--text">
                {{ hasError }}
              </p>
            </template>
          </v-alert>
        </v-col>
      </v-row>
      <v-row class="justify-center align-center">
        <!-- New Password -->
        <v-col class="col-12 col-md-6">
          <v-text-field
            v-model="new_password"
            color="primary"
            dense
            :disabled="submitting"
            label="New Password"
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
  import { mapActions } from 'vuex';
  import { userService } from '~/services';
  import CustomIcon from '~/components/icons/CustomIcon.vue';
  import Loading from '~/components/Loading.vue';

  export default {
    props: {
      currentUser: {
        type: Object,
        default: () => {}
      }
    },

    data () {
      return {
        confirm_password: '',
        errorColor: '',
        hasError: null,
        new_password: '',
        passwordRules: [v => !!v || 'Password is required'],
        passwordsMatchRules: [
          v => !!v || 'Password confirmation is required',
          v => (this.new_password === this.confirm_password) || 'Passwords must match'
        ],
        submitting: false,
        valid: false
      };
    },

    methods: {
      ...mapActions({
        success: 'alert/success'
      }),
      async handleSubmit () {
        if (this.$refs.accountSettingsForm.validate()) {
          this.submitting = true;
          const payload = {
            fields: { password: this.new_password, password_confirmation: this.confirm_password },
            apollo: this.$apollo
          };
          const res = await userService.updatePassword(payload);

          if (!res.data) {
            this.hasError = 'There was an error updating your password. Please check all values are correct.';
            this.submitting = false;
          } else {
            this.success('Password successfully updated');
            this.submitting = false;
          }
        }
      }
    },

    mounted () {
      this.errorColor = this.$nuxt.$vuetify.theme.themes.light.error;
    },

    components: {
      CustomIcon,
      Loading
    }
  };
</script>

<style lang="scss" scoped>

</style>
