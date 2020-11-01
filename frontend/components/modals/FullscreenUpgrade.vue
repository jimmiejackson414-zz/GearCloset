<template>
  <v-dialog
    v-model="show"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar flat>
        <v-btn
          icon
          @click="show = false">
          <custom-icon
            fill="#4a4a4a"
            :height="30"
            name="multiply"
            :width="30" />
        </v-btn>
        <v-toolbar-title>Upgrade</v-toolbar-title>
        <v-card-text>Need to put upgrade options here.</v-card-text>
      </v-toolbar>
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
    }
  };
</script>

<style lang="scss" scoped>

</style>
