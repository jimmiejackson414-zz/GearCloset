<template>
  <div class="widget-wrapper">
    <div class="widget-header mb-0">
      <div class="text-h6">
        Hike Details
      </div>
      <plus-button @handle-click="openCreate" />
    </div>
    <div class="trip-details-wrapper">
      <div class="row">
        <div class="col-12 d-flex align-center pl-0">
          <click-to-edit
            :custom-style="hikeNameStyles"
            unique-identifier="hikeNameRef"
            :value="trip ? trip.name : ''"
            @handle-update-item="updateTripField($event, 'name')" />
        </div>
      </div>
      <transition-group
        v-if="hikeDetails.length"
        class="trip-details"
        name="list"
        tag="ul">
        <li
          v-for="detail in hikeDetails"
          :key="detail.id"
          class="detail">
          <span class="font-weight-bold">{{ detail.title }}</span>
          <a
            v-if="detail.url"
            class="value"
            :href="`${detail.url}`"
            rel="noopener noreferrer"
            target="_blank">{{ detail.value }}</a>
          <p
            v-else
            class="body-text-1 mb-0">
            {{ detail.value }}
          </p>
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
      detail-type="hike"
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
  import EllipsisButton from '~/components/icons/EllipsisButton.vue';
  import PlusButton from '~/components/icons/PlusButton.vue';
  import Trip from '~/database/models/trip';
  import TripDetail from '~/database/models/tripDetail';

  export default {
    data: () => ({
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
      hikeDetails () {
        return TripDetail.query().where(detail => {
          return detail.trip_id === this.selectedTripId && detail.type === 'hike';
        }).get();
      },
      hikeNameStyles () {
        return {
          fontSize: '1.5em',
          fontWeight: 'bold',
          letterSpacing: '1px'
        };
      },
      trip () {
        return Trip.find(this.selectedTripId);
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
        this.selectedDetail = { type: 'hike' };
        this.$nextTick(() => {
          this.createTripDetailModalOpen = true;
        });
      },
      openDelete (detail) {
        this.selectedDetail = detail;
        this.removeDetailModalOpen = true;
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
        if (e === this.trip.name) { return; }

        const payload = {
          variables: {
            id: this.trip.id,
            [field]: e
          }
        };
        this.updateTrip(payload);
      }
    },

    components: {
      ClickToEdit,
      CreateTripDetailModal: () => import(/* webpackPrefetch: true */'~/components/modals/CreateTripDetailModal.vue'),
      DeleteConfirmModal: () => import(/* webpackPrefetch: true */ '~/components/modals/DeleteConfirmModal.vue'),
      EllipsisButton,
      UpdateTripDetailModal: () => import(/* webpackPrefetch: true */'~/components/modals/UpdateTripDetailModal.vue'),
      PlusButton
    }
  };
</script>,
        ClickToEdit

<style lang="scss" scoped>
  @import 'widget-styles';
  @import '~/css/list-transition';

  .trip-details-wrapper {
    overflow-y: scroll;

    .trip-details {
      display        : grid;
      list-style-type: none;
      padding        : 0;
      text-decoration: none;

      .detail {
        align-items          : center;
        display              : grid;
        grid-template-columns: 1fr repeat(2, auto);
        overflow             : hidden;
        padding              : 0.75rem 0 0;
        text-overflow        : ellipsis;
        white-space          : nowrap;
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
