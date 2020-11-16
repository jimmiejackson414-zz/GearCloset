<template>
  <div>
    <h4 class="text-h4 font-weight-bold step-title">
      Update your details
    </h4>
    <div class="form-wrapper">
      <v-row>
        <!-- First Name -->
        <v-col class="col-12 col-md-6">
          <v-text-field
            v-model="user.first_name"
            color="primary"
            dense
            :disabled="submitting"
            :error="isError"
            label="First Name*"
            outlined
            required
            :rules="nameRules"
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
        </v-col>

        <!-- Last Name -->
        <v-col class="col-12 col-md-6">
          <v-text-field
            v-model="user.last_name"
            color="primary"
            dense
            :disabled="submitting"
            :error="isError"
            label="Last Name*"
            outlined
            required
            :rules="nameRules"
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
        </v-col>

        <!-- Trail Name -->
        <v-col class="col-12 col-md-6">
          <v-text-field
            v-model="user.trail_name"
            color="primary"
            dense
            :disabled="submitting"
            :error="isError"
            label="Trail Name"
            outlined
            :rules="nameRules"
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
        </v-col>

        <!-- Measuring System -->
        <v-col class="col-12 col-md-6">
          <v-select
            v-model="user.measuring_system"
            color="primary"
            dense
            :disabled="submitting"
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
        </v-col>

        <!-- State -->
        <v-col class="col-12 col-md-6">
          <v-text-field
            v-model="user.state"
            color="primary"
            dense
            :disabled="submitting"
            :error="isError"
            label="State"
            outlined
            :rules="nameRules"
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
        </v-col>

        <!-- Country -->
        <v-col class="col-12 col-md-6">
          <v-select
            v-model="user.country"
            color="primary"
            dense
            :disabled="submitting"
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
        :disabled="submitting"
        @click="handleNextStep">
        <loading
          v-if="submitting"
          color="#fff"
          height="30px"
          width="30px" />
        <span v-else>Continue</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
  import { countries } from '~/helpers/countries';
  import currentUser from '~/mixins/currentUser';
  import Loading from '~/components/Loading.vue';
  import updateMutation from '~/apollo/mutations/auth/update.gql';

  export default {
    mixins: [currentUser],

    data: () => ({
      isError: false,
      nameRules: [
        v => !!v || 'This is a required field'
      ],
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
      async handleNextStep () {
        this.submitting = true;

        try {
          const payload = { ...this.user, id: Number(this.currentUser.id) };
          const { errors } = await this.$apollo.mutate({
            mutation: updateMutation,
            variables: payload
          });

          if (errors?.length) {
            this.isError = true;
            this.submitting = false;
            return;
          }

          this.$emit('handle-change-step', 3);
          this.submitting = false;
        } catch (e) {
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
      Loading
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
