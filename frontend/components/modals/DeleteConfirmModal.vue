<template>
  <v-dialog
    v-model="show"
    max-width="500"
    :persistent="submitting">
    <v-card>
      <v-card-title>Delete {{ formatItem }}</v-card-title>
      <v-card-text>Are you sure you want to delete this {{ item }}? This action cannot be undone.</v-card-text>
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
          color="errorDark"
          depressed
          :disabled="submitting"
          :ripple="false"
          @click="handleDeleteItem">
          <loading
            v-if="submitting"
            color="#fff"
            height="30px"
            width="30px" />
          <span v-else>Delete</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions } from 'vuex';
  import { capitalize } from '~/helpers/functions';
  import Loading from '~/components/Loading.vue';

  export default {
    props: {
      item: {
        type: String,
        default: ''
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
      formatItem () {
        return capitalize(this.item);
      },
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
        this.$emit('handle-reset-modal');
      },
      handleDeleteItem () {
        this.$emit('handle-remove-item', this.selectedItem);
        this.success(`${capitalize(this.item)} successfully deleted`);
        this.closeModal();
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

    .v-card__actions {
      .v-btn {
        color: #fff;
      }
    }
  }
</style>
