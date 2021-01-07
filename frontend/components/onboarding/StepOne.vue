<template>
  <div>
    <h4 class="text-h4 font-weight-bold step-title">
      Upload Your Avatar
    </h4>
    <div class="image-wrapper">
      <image-uploader @handle-image-upload="handleImageUpload" />
    </div>
    <v-row class="mt-4">
      <v-col class="col-12 col-md-6 offset-md-3">
        <v-alert
          v-if="isError"
          border="top"
          color="error"
          outlined>
          <template #prepend>
            <custom-icon
              custom-class="mr-4"
              :fill="errorColor"
              :height="30"
              name="exclamation-triangle"
              :width="30" />
          </template>
          <p class="body-text-1 mb-0 error--text">
            There was an error uploading your profile picture. Please try again, or contact us if the issue persists.
          </p>
        </v-alert>
      </v-col>
    </v-row>
    <div class="btn-wrapper">
      <v-btn
        color="primary"
        depressed
        :disabled="submitting"
        @click="handleNextStep">
        <loading
          v-if="submitting"
          color="#fff"
          height="30px"
          width="30px" />
        <span v-else>{{ stepText }}</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import currentUser from '~/mixins/currentUser';
  import CustomIcon from '~/components/icons/CustomIcon.vue';
  import Loading from '~/components/Loading.vue';

  export default {
    mixins: [currentUser],

    data: () => ({
      avatar: null,
      errorColor: '',
      isError: false,
      submitting: false
    }),

    computed: {
      stepText () {
        return this.avatar ? 'Continue' : 'Skip';
      }
    },

    methods: {
      ...mapActions('entities/users', [
        'updateAvatar'
      ]),
      handleImageUpload (avatar) {
        this.avatar = avatar;
      },
      async handleNextStep () {
        if (!this.avatar) {
          this.$emit('handle-change-step', 2);
          return;
        }

        try {
          this.submitting = true;
          const payload = { variables: { file: this.avatar } };

          const res = await this.updateAvatar(payload);

          if (!res.success) {
            this.isError = true;
            this.submitting = false;
            return;
          }

          this.$emit('handle-change-step', 2);
          this.submitting = false;
        } catch (e) {
          console.log({ e });
          this.isError = true;
          this.submitting = false;
        }
      }
    },

    mounted () {
      this.errorColor = this.$nuxt.$vuetify.theme.themes.light.error;
    },

    components: {
      CustomIcon,
      ImageUploader: () => import(/* webpackPrefetch: true */ '~/components/ImageUploader.vue'),
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
    justify-content: center;
    margin-top: 2rem;

    @include breakpoint(laptop) {
      justify-content: flex-end;
    }
  }
</style>
