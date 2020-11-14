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
  import currentUser from '~/mixins/currentUser';
  import ImageUploader from '~/components/ImageUploader.vue';
  import Loading from '~/components/Loading.vue';
  import updateAvatarMutation from '~/apollo/mutations/auth/updateAvatar.gql';

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
      handleImageUpload (avatar) {
        this.avatar = avatar;
      },
      async handleNextStep () {
        this.submitting = true;

        try {
          const payload = { avatar: JSON.stringify(this.avatar), id: Number(this.currentUser.id) };
          const { errors } = await this.$apollo.mutate({
            mutation: updateAvatarMutation,
            variables: payload
          });

          if (errors?.length) {
            this.isError = true;
            this.submitting = false;
          }

          this.$emit('handle-change-step', 2);
          this.submitting = false;
        } catch (e) {
          this.isError = true;
          this.submitting = false;
        }
      }
    },

    components: {
      ImageUploader,
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
