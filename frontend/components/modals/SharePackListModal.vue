<template>
  <v-dialog
    v-model="show"
    max-width="500">
    <v-card>
      <v-card-title>Share Your Pack</v-card-title>
      <v-card-text>Share your pack list with friends.</v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          class="light-grey--text"
          :ripple="false"
          text
          @click="closeModal">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },

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
      closeModal () {
        this.show = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '~/css/colors';

  .v-card {
    border-top: 5px solid $primary;
  }
</style>
