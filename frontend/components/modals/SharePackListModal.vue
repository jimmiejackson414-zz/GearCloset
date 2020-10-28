<template>
  <v-dialog
    v-model="show"
    max-width="500">
    <v-card>
      <v-card-title class="justify-center">
        Share Your Pack
      </v-card-title>
      <v-card-text class="text-center">
        Share your pack list with friends!
      </v-card-text>
      <v-card-text class="d-flex">
        <v-text-field
          ref="shareableUrlRef"
          color="primary"
          dense
          hide-details
          outlined
          readonly
          :value="shareableUrl" />
        <v-tooltip
          max-width="300"
          top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              icon
              :ripple="false"
              v-on="on"
              @click="handleCopyToClipboard">
              <custom-icon
                fill="#4a4a4a"
                height="20px"
                name="copy"
                width="20px" />
            </v-btn>
          </template>
          <span>Copy to clipboard</span>
        </v-tooltip>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          class="light-grey--text"
          :ripple="false"
          text
          @click="closeModal">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    props: {
      list: {
        type: Object,
        default: () => {},
        required: true
      },
      value: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      shareableUrl () {
        return `${process.env.baseUrl}/share/${this.list.uuid}`;
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
      },
      handleCopyToClipboard () {
        const textToCopy = this.$refs.shareableUrlRef.$el.querySelector('input');
        textToCopy.select();
        document.execCommand('copy');
        this.success('Copied to clipboard.');
      }
    }
  };
</script>

<style lang="scss" scoped>
  .v-card {
    border-top: 5px solid $primary;
  }
</style>
