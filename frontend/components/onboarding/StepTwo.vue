<template>
  <validation-observer
    ref="observer"
    v-slot="{ invalid }"
    slim>
    <h4 class="text-h4 font-weight-bold step-title">
      Update your details
    </h4>
    <v-form @submit.prevent="handleNextStep">
      <div class="form-wrapper">
        <v-row>
          <!-- First Name -->
          <v-col class="col-12 col-md-6">
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
                label="First Name*"
                outlined
                required
                validate-on-blur
                @keyup.enter="handleNextStep">
                <template #prepend-inner>
                  <custom-icon
                    :fill="primaryColor"
                    :height="20"
                    name="user-circle"
                    :width="20" />
                </template>
              </v-text-field>
            </validation-provider>
          </v-col>

          <!-- Last Name -->
          <v-col class="col-12 col-md-6">
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
                label="Last Name*"
                outlined
                required
                validate-on-blur
                @keyup.enter="handleNextStep">
                <template #prepend-inner>
                  <custom-icon
                    :fill="primaryColor"
                    :height="20"
                    name="user-circle"
                    :width="20" />
                </template>
              </v-text-field>
            </validation-provider>
          </v-col>

          <!-- Trail Name -->
          <v-col class="col-12 col-md-6">
            <validation-provider
              v-slot="{ errors }"
              name="Trail Name">
              <v-text-field
                v-model="user.trail_name"
                color="primary"
                dense
                :disabled="submitting"
                :error="!!errors.length"
                label="Trail Name"
                outlined
                validate-on-blur
                @keyup.enter="handleNextStep">
                <template #prepend-inner>
                  <custom-icon
                    :fill="primaryColor"
                    :height="20"
                    name="user-circle"
                    :width="20" />
                </template>
              </v-text-field>
            </validation-provider>
          </v-col>

          <!-- Measuring System -->
          <v-col class="col-12 col-md-6">
            <validation-provider
              v-slot="{ errors }"
              name="Measuring System"
              rules="required">
              <v-select
                v-model="user.measuring_system"
                color="primary"
                dense
                :disabled="submitting"
                :error="!!errors.length"
                :items="systems"
                label="Measurement System"
                outlined
                required
                validate-on-blur>
                <template #prepend-inner>
                  <custom-icon
                    :fill="primaryColor"
                    :height="20"
                    name="balance-scale"
                    :width="20" />
                </template>
              </v-select>
            </validation-provider>
          </v-col>

          <!-- State -->
          <v-col class="col-12 col-md-6">
            <validation-provider
              v-slot="{ errors }"
              name="State"
              rules="required">
              <v-text-field
                v-model="user.state"
                color="primary"
                dense
                :disabled="submitting"
                :error="!!errors.length"
                :error-messages="errors"
                label="State"
                outlined
                validate-on-blur
                @keyup.enter="handleNextStep">
                <template #prepend-inner>
                  <custom-icon
                    :fill="primaryColor"
                    :height="20"
                    name="globe"
                    :width="20" />
                </template>
              </v-text-field>
            </validation-provider>
          </v-col>

          <!-- Country -->
          <v-col class="col-12 col-md-6">
            <validation-provider
              v-slot="{ errors }"
              name="Country"
              rules="required">
              <v-select
                v-model="user.country"
                color="primary"
                dense
                :disabled="submitting"
                :error="!!errors.length"
                :items="countriesArr"
                label="Country"
                outlined
                required
                validate-on-blur>
                <template #prepend-inner>
                  <custom-icon
                    :fill="primaryColor"
                    :height="20"
                    name="globe"
                    :width="20" />
                </template>
              </v-select>
            </validation-provider>
          </v-col>
        </v-row>
      </div>
      <div class="btn-wrapper">
        <v-btn
          class="grey7--text"
          :disabled="submitting"
          :ripple="false"
          text
          @click="handlePrevStep">
          Previous
        </v-btn>
        <v-btn
          color="primary"
          depressed
          :disabled="submitting || invalid"
          @click="handleNextStep">
          <loading
            v-if="submitting"
            color="#fff"
            height="30px"
            width="30px" />
          <span v-else>Continue</span>
        </v-btn>
      </div>
    </v-form>
  </validation-observer>
</template>

<script>
  import { mapActions } from 'vuex';
  import { required } from 'vee-validate/dist/rules';
  import { extend, setInteractionMode, ValidationProvider, ValidationObserver } from 'vee-validate';
  import { countries } from '~/helpers/countries';
  import currentUser from '~/mixins/currentUser';
  import CustomIcon from '~/components/icons/CustomIcon.vue';
  import Loading from '~/components/Loading.vue';

  setInteractionMode('eager');

  extend('required', {
    ...required,
    message: '{_field_} is required'
  });

  export default {
    mixins: [currentUser],

    data: () => ({
      isError: false,
      primaryColor: '',
      submitting: false,
      systems: [
        { text: 'Imperial (oz, lb)', value: 'Imperial' },
        { text: 'Metric (g, kg)', value: 'Metric' }
      ],
      user: {
        country: '',
        first_name: '',
        last_name: '',
        measuring_system: 'Imperial',
        state: '',
        trail_name: ''
      }
    }),

    computed: {
      countriesArr () {
        return countries;
      }
    },

    methods: {
      ...mapActions('entities/users', [
        'updateUser'
      ]),
      async handleNextStep () {
        this.submitting = true;

        try {
          const payload = { variables: { ...this.user, id: this.currentUser.id } };

          const res = await this.updateUser(payload);

          if (!res.success) {
            this.isError = true;
            this.submitting = false;
            return;
          }

          this.$emit('handle-change-step', 3);
          this.submitting = false;
        } catch (e) {
          console.error(e);
          this.isError = true;
        }
      },
      handlePrevStep () {
        this.$emit('handle-change-step', 1);
      }
    },

    mounted () {
      this.primaryColor = this.$nuxt.$vuetify.theme.themes.light.primary;
    },

    watch: {
      currentUser () {
        if (this.currentUser) {
          this.$set(this.user, 'first_name', this.currentUser.first_name);
          this.$set(this.user, 'last_name', this.currentUser.last_name);
        }
      }
    },

    components: {
      CustomIcon,
      Loading,
      ValidationObserver,
      ValidationProvider
    }
  };
</script>

<style lang="scss" scoped>
  .step-title {
    margin-bottom: 16px;
    text-align: center;
  }

  .btn-wrapper {
    display: flex;
    justify-content: space-between;
  }
</style>
