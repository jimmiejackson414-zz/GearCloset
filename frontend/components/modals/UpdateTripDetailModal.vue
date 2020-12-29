<template>
  <v-dialog
    v-model="show"
    class="test"
    max-width="750"
    :persistent="submitting">
    <v-card>
      <v-card-title>Update {{ detailType }} Detail</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="localDetail.title"
                color="primary"
                dense
                :disabled="submitting"
                hide-details
                label="Title"
                outlined
                placeholder="Elevation Gain"
                required />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="localDetail.value"
                color="primary"
                dense
                :disabled="submitting"
                hide-details
                label="Value"
                outlined
                placeholder="5400 ft."
                required />
            </v-col>
            <v-col cols="12">
              <v-checkbox
                v-model="hasUrl"
                class="mt-0"
                color="primary"
                :false-value="false"
                hide-details
                label="Link to external URL?"
                :ripple="false"
                :true-value="true" />
            </v-col>
            <v-col
              v-if="hasUrl"
              cols="12">
              <v-text-field
                v-model="localDetail.url"
                color="primary"
                dense
                :disabled="submitting"
                hide-details
                label="URL"
                outlined
                placeholder="https://www.southwest.com"
                required />
            </v-col>
          </v-row>
        </v-container>
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
          color="primary"
          depressed
          :disabled="submitting"
          :ripple="false"
          @click="handleUpdate">
          <loading
            v-if="submitting"
            color="#fff"
            height="30px"
            width="30px" />
          <span v-else>Update</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { capitalize, prependProtocol } from '~/helpers/functions';
  import { tripDetailService } from '~/services';
  import Loading from '~/components/Loading.vue';

  export default {
    props: {
      detail: {
        type: Object,
        default: () => {}
      },
      trip: {
        type: Object,
        default: () => {}
      },
      value: {
        type: Boolean,
        default: false
      }
    },

    data: () => ({
      localDetail: {
        title: '',
        type: '',
        url: '',
        value: ''
      },
      hasUrl: false,
      submitting: false
    }),

    computed: {
      detailType () {
        return this.localDetail ? capitalize(this.localDetail?.type) : '';
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
      closeModal () {
        this.show = false;
        this.$emit('handle-reset-modal');
      },
      handleUpdate () {
        this.submitting = true;

        const payload = {
          fields: {
            id: this.detail.id,
            title: this.localDetail.title,
            type: this.localDetail.type,
            url: this.hasUrl ? prependProtocol(this.localDetail.url) : null,
            value: this.localDetail.value,
            trip: this.trip.id
          },
          apollo: this.$apollo
        };

        tripDetailService.update(payload);

        this.submitting = false;
        this.closeModal();
      }
    },

    watch: {
      detail (val) {
        if (val) {
          this.localDetail = {
            title: val.title,
            type: val.type,
            url: val.url,
            value: val.value
          };
        }
      },
      localDetail: {
        deep: true,
        handler (val) {
          this.hasUrl = !!val.url;
        }
      }
    },

    components: {
      Loading
    }
  };
</script>

<style lang="scss" scoped>
  .v-card {
    border-top: 5px solid $primary;
  }
</style>
