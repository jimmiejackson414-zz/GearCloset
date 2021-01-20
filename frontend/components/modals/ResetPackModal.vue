<template>
  <v-dialog
    v-model="show"
    max-width="500"
    :persistent="submitting">
    <v-card>
      <v-card-title>Reset Pack</v-card-title>
      <v-card-text>Are you sure you want to reset this pack to empty? This will completely remove all categories and items <span class="font-weight-bold">permanently</span> from this pack and cannot be undone. </v-card-text>
      <v-card-text class="font-italic">
        Note: Items can still be found in the sidebar to recreate categories.
      </v-card-text>
      <v-card-actions class="justify-space-between">
        <v-btn
          class="grey7--text"
          :disabled="submitting"
          :ripple="false"
          text
          @click="closeModal">
          Cancel
        </v-btn>
        <v-btn
          class="white--text"
          color="errorDark"
          depressed
          :disabled="submitting"
          :ripple="false"
          @click="handleResetPack">
          <loading
            v-if="submitting"
            color="#fff"
            height="30px"
            width="30px" />
          <span v-else>Reset</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions } from 'vuex';
  // import { packService } from '~/services';
  import Loading from '~/components/Loading.vue';

  export default {
    props: {
      pack: {
        type: Object,
        default: () => {}
      },
      value: {
        type: Boolean,
        default: false
      }
    },

    data: () => ({
      submitting: false
    }),

    computed: {
      show: {
        get () {
          return this.value;
        },
        set (value) {
          this.$emit('input', value);
        }
      }
    },

    methods: {
      ...mapActions({
        success: 'alert/success'
      }),
      closeModal () {
        this.show = false;
      },
      handleResetPack () {
        // TODO: handleResetPack
        console.log('NEED TO RECREATE THIS METHOD');
        // const payload = { id: this.pack.id };
        // await packService.reset(payload);
        // this.success('Pack successfully reset');
        // this.closeModal();
      }
    },

    components: {
      Loading
    }
  };
</script>

<style lang="scss" scoped>
  .v-card {
    border-top: 5px solid $errorDark;
  }
</style>
