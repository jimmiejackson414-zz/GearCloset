<template>
  <div class="widget-wrapper">
    <div class="widget-header mb-0">
      <div class="text-h6">
        Hike Details
      </div>
      <plus-button @handle-click="hikeDetailsModalOpen = true" />
    </div>
    <div class="trip-details-wrapper">
      <div class="row">
        <div class="col-12 d-flex align-center">
          <h2>{{ trip.name }}</h2>
        </div>
      </div>
      <transition-group
        v-if="trip.hike_details.length"
        class="trip-details"
        name="list"
        tag="ul">
        <li
          v-for="detail in trip.hike_details"
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

    <hike-details-modal
      v-model="hikeDetailsModalOpen"
      :detail="selectedDetail"
      @handle-reset-modal="resetModal" />

    <delete-confirm-modal
      v-model="removeDetailModalOpen"
      item="detail"
      :selected-detail="selectedDetail"
      @handle-remove-item="removeDetail"
      @handle-reset-modal="resetModal" />
  </div>
</template>

<script>
  import EllipsisButton from '~/components/icons/EllipsisButton.vue';
  import PlusButton from '~/components/icons/PlusButton.vue';

  export default {
    props: {
      trip: {
        type: Object,
        default: () => {}
      }
    },

    data: () => ({
      ellipsisItems: [
        { title: 'Update', event: 'update-detail' },
        { title: 'Delete', event: 'delete-detail' }
      ],
      hikeDetailsModalOpen: false,
      removeDetailModalOpen: false,
      selectedDetail: null
    }),

    methods: {
      openDelete (detail) {
        this.selectedDetail = detail;
        this.removeDetailModalOpen = true;
      },
      openUpdate (detail) {
        this.selectedDetail = detail;
        console.log('openUpdate');
        this.$nextTick(() => {
          console.log('nextTick');
          this.hikeDetailsModalOpen = true;
        });
      },
      removeDetail () {
        console.log('removeDetail');
      },
      resetModal () {
        this.selectedDetail = null;
      }
    },

    components: {
      DeleteConfirmModal: () => import(/* webpackPrefetch: true */ '~/components/modals/DeleteConfirmModal.vue'),
      EllipsisButton,
      HikeDetailsModal: () => import(/* webpackPrefetch: true */'~/components/modals/HikeDetailsModal.vue'),
      PlusButton
    }
  };
</script>

<style lang="scss" scoped>
  @import 'widget-styles';
  @import '~/css/list-transition';

  .trip-details-wrapper {
    .trip-details {
      display        : grid;
      list-style-type: none;
      padding        : 0;
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
