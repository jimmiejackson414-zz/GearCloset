<template>
  <div class="widget-wrapper">
    <div class="widget-header mb-0">
      <div class="text-h6">
        Trip Details
      </div>
      <plus-button @handle-click="openCreate" />
    </div>
    <div class="trip-details-wrapper">
      <div class="row d-inline-flex">
        <div class="col-12 d-flex align-center pl-0">
          <click-to-edit
            :custom-style="tripPointsStyles"
            unique-identifier="tripStartingPointRef"
            :value="trip ? trip.starting_point : ''"
            @handle-update-item="updateTripField($event, 'starting_point')" />
          <custom-icon
            :fill="arrowColor"
            :height="20"
            name="arrow-right"
            :width="40" />
          <click-to-edit
            :custom-style="tripPointsStyles"
            unique-identifier="tripEndingPointRef"
            :value="trip ? trip.ending_point: ''"
            @handle-update-item="updateTripField($event, 'ending_point')" />
        </div>
      </div>
      <transition-group
        v-if="tripDetails.length"
        class="trip-details"
        name="list"
        tag="ul">
        <li
          v-for="detail in tripDetails"
          :key="detail.id"
          class="detail">
          <span class="font-weight-bold">{{ detail.title }}</span>
          <a
            class="value"
            :href="`${detail.url}`"
            rel="noopener noreferrer"
            target="_blank">{{ detail.value }}</a>
          <ellipsis-button
            class="ellipsis"
            :items="ellipsisItems"
            @delete-detail="openDelete(detail)"
            @update-detail="openUpdate(detail)" />
        </li>
      </transition-group>

      <p v-else>
        You haven't added any details yet!
      </p>
    </div>

    <create-trip-detail-modal
      v-model="createTripDetailModalOpen"
      detail-type="trip"
      :trip="trip"
      @handle-reset-modal="resetModal" />

    <update-trip-detail-modal
      v-model="updateTripDetailModalOpen"
      :detail="selectedDetail"
      :trip="trip"
      @handle-reset-modal="resetModal" />

    <delete-confirm-modal
      v-model="removeDetailModalOpen"
      item="detail"
      :selected-item="selectedDetail"
      @handle-remove-item="removeDetail"
      @handle-reset-modal="resetModal" />
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import ClickToEdit from '~/components/ClickToEdit.vue';
  import CustomIcon from '~/components/icons/CustomIcon.vue';
  import EllipsisButton from '~/components/icons/EllipsisButton.vue';
  import PlusButton from '~/components/icons/PlusButton.vue';
  import Trip from '~/database/models/trip';
  import TripDetail from '~/database/models/tripDetail';

  export default {
    data: () => ({
      arrowColor: '',
      createTripDetailModalOpen: false,
      ellipsisItems: [
        { title: 'Update', event: 'update-detail' },
        { title: 'Delete', event: 'delete-detail', customClass: 'error--text' }
      ],
      removeDetailModalOpen: false,
      selectedDetail: null,
      updateTripDetailModalOpen: false

    }),

    computed: {
      ...mapState({
        selectedTripId: state => state.entities.trips.selectedTripId
      }),
      trip () {
        return Trip.find(this.selectedTripId);
      },
      tripDetails () {
        return TripDetail.query().where(detail => {
          return detail.trip_id === this.selectedTripId && detail.type === 'trip';
        }).get();
      },
      tripPointsStyles () {
        return {
          fontSize: '1.5em',
          fontWeight: 'bold',
          letterSpacing: '1px'
        };
      }
    },

    methods: {
      ...mapActions('entities/tripDetails', [
        'destroyTripDetail'
      ]),
      ...mapActions('entities/trips', [
        'updateTrip'
      ]),
      openCreate () {
        this.selectedDetail = { type: 'trip' };
        this.$nextTick(() => {
          this.createTripDetailModalOpen = true;
        });
      },
      openDelete (detail) {
        this.selectedDetail = detail;
        this.$nextTick(() => {
          this.removeDetailModalOpen = true;
        });
      },
      openUpdate (detail) {
        this.selectedDetail = detail;
        this.$nextTick(() => {
          this.updateTripDetailModalOpen = true;
        });
      },
      async removeDetail (detail) {
        const payload = {
          variables: { id: detail.id, trip: this.trip.id }
        };
        await this.destroyTripDetail(payload);
      },
      resetModal () {
        this.createTripDetailModalOpen = false;
        this.updateTripDetailModalOpen = false;
        this.selectedDetail = null;
      },
      updateTripField (e, field) {
        // return if value hasn't changed
        if (e === this.trip[field]) { return; }

        const payload = {
          variables: {
            id: this.trip.id,
            [field]: e
          }
        };
        this.updateTrip(payload);
      }
    },

    mounted () {
      this.arrowColor = $nuxt.$vuetify.theme.themes.light['dark-grey'];
    },

    components: {
      ClickToEdit,
      CreateTripDetailModal: () => import(/* webpackPrefetch: true */'~/components/modals/CreateTripDetailModal.vue'),
      CustomIcon,
      DeleteConfirmModal: () => import(/* webpackPrefetch: true */ '~/components/modals/DeleteConfirmModal.vue'),
      EllipsisButton,
      PlusButton,
      UpdateTripDetailModal: () => import(/* webpackPrefetch: true */'~/components/modals/UpdateTripDetailModal.vue')
    }
  };
</script>

<style lang="scss" scoped>
  @import 'widget-styles';
  @import '~/css/list-transition';

  .trip-details-wrapper {
    .trip-details {
      display: grid;
      list-style-type: none;
      padding: 0;
      text-decoration: none;

      .detail {
        align-items: center;
        display: grid;
        grid-template-columns: 1fr repeat(2, auto);
        overflow: hidden;
        padding: 0.75rem 0 0;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>

<style lang="scss">
  .detail {
    .ellipsis {
      opacity: 0;
    }

    &:hover {
      .ellipsis {
        opacity: 1;
      }
    }
  }
</style>
