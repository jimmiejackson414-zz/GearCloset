<template>
  <div>
    <h4 class="text-h4 font-weight-bold step-title">
      Upload Your Avatar
    </h4>
    <div class="image-wrapper">
      <image-uploader @handle-image-upload="handleImageUpload" />
    </div>
    <div class="btn-wrapper">
      <v-btn
        color="primary"
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
  import Loading from '~/components/Loading.vue';

  export default {
    mixins: [currentUser],

    data: () => ({
      avatar: null,
      submitting: false
    }),

    computed: {
      stepText () {
        return this.avatar ? 'Continue' : 'Skip';
      }
    },

    methods: {
      ...mapActions({
        updateAvatar: 'users/updateAvatar'
      }),
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

          await this.updateAvatar(payload);

          this.$emit('handle-change-step', 2);
          this.submitting = false;
        } catch (e) {
          console.log({ e });
          this.isError = true;
          this.submitting = false;
        }
      }
    },

    components: {
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
