<template>
  <v-dialog
    v-model="show"
    max-width="750"
    :persistent="submitting">
    <v-card>
      <v-card-title>Select a Pack</v-card-title>
      <v-card-text>
        <v-autocomplete
          v-model="selectedPack"
          cache-items
          dense
          hide-details
          item-text="name"
          item-value="id"
          :items="packs"
          label="Choose a pack for this trip"
          :loading="isLoading"
          outlined
          return-object
          :search-input.sync="search"
          @click="populatePacks" />
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
          @click="handleSelectPack">
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
  import { mapActions } from 'vuex';
  import Loading from '~/components/Loading.vue';
  import { packService, tripService } from '~/services';

  export default {
    props: {
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
      isLoading: false,
      packs: [],
      search: null,
      selectedPack: null,
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
        success: 'alert/success',
        error: 'alert/error'
      }),
      closeModal () {
        this.show = false;
      },
      async handleSelectPack () {
        this.submitting = true;

        const payload = {
          fields: { pack_id: this.selectedPack.id, id: this.trip.id },
          apollo: this.$apollo
        };
        await tripService.update(payload);
        this.submitting = false;
        this.$emit('handle-refetch-trips');
        this.$emit('handle-reset-modal');
      },
      async populatePacks () {
        this.isLoading = true;
        const payload = { apollo: this.$apollo };
        const { data } = await packService.getPacks(payload);
        this.packs = data.packs;
        this.isLoading = false;
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
