<template>
  <div class="widget-wrapper">
    <div class="widget-header mb-0">
      <div class="text-h6">
        Trip Details
      </div>
      <plus-button @handle-click="tripDetailsModalOpen = true" />
    </div>
    <div class="trip-details-wrapper">
      <div class="row">
        <div class="col-12 d-flex align-center">
          <h2>{{ startingPoint }}</h2>
          <custom-icon
            :fill="arrowColor"
            :height="20"
            name="arrow-right"
            :width="40" />
          <h2>{{ endingPoint }}</h2>
        </div>
      </div>
      <transition-group
        v-if="details.length"
        class="trip-details"
        name="list"
        tag="ul">
        <li
          v-for="detail in details"
          :key="detail.id"
          class="detail">
          <span class="font-weight-bold">{{ detail.title }}</span>
          <a
            class="value"
            :href="`${detail.url}`"
            rel="noopener noreferrer"
            target="_blank">{{ detail.url_title }}</a>
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

    <trip-details-modal
      v-model="tripDetailsModalOpen"
      :detail="selectedDetail"
      @handle-reset-modal="resetModal" />

    <delete-confirm-modal
      v-model="removeDetailModalOpen"
      item="detail"
      :selected-detail="selectedDetail"
      @handle-remove-item="removeDetail" />
  </div>
</template>

<script>
  import CustomIcon from '~/components/icons/CustomIcon';
  import EllipsisButton from '~/components/icons/EllipsisButton';
  import PlusButton from '~/components/icons/PlusButton';

  export default {
    data: () => ({
      arrowColor: '',
      details: [
        { id: 1, title: 'Flight 1', url: 'https://www.southwest.com', url_title: 'SW436', created_at: '2020-03-09 17:08:21', updated_at: '2020-03-09 17:08:21' },
        { id: 2, title: 'Flight 2', url: 'https://www.southwest.com', url_title: 'SW38', created_at: '2020-03-09 17:08:21', updated_at: '2020-03-09 17:08:21' },
        { id: 3, title: 'Car Rental', url: 'https://www.avis.com', url_title: 'Avis', created_at: '2020-03-09 17:08:21', updated_at: '2020-03-09 17:08:21' },
        { id: 4, title: 'Food Drop', url: 'https://www.standingbearhostel.com', url_title: 'Standing Bear Hostel', created_at: '2020-03-09 17:08:21', updated_at: '2020-03-09 17:08:21' },
        { id: 5, title: 'Hostel', url: 'https://www.blackrockhostel.com', url_title: 'Black Rock Hostel', created_at: '2020-03-09 17:08:21', updated_at: '2020-03-09 17:08:21' }
      ],
      ellipsisItems: [
        { title: 'Update', event: 'update-detail' },
        { title: 'Delete', event: 'delete-detail' }
      ],
      endingPoint: 'Mt. Whitney',
      removeDetailModalOpen: false,
      selectedDetail: null,
      startingPoint: 'Yosemite',
      tripDetailsModalOpen: false
    }),

    methods: {
      openDelete (detail) {
        this.selectedDetail = detail;
        this.removeDetailModalOpen = true;
      },
      openUpdate (detail) {
        this.selectedDetail = detail;
        this.tripDetailsModalOpen = true;
      },
      removeDetail () {
        console.log('removeDetail');
      },
      resetModal () {
        this.selectedDetail = null;
      }
    },

    mounted () {
      this.arrowColor = $nuxt.$vuetify.theme.themes.light['dark-grey'];
    },

    components: {
      CustomIcon,
      DeleteConfirmModal: () => import(/* webpackPrefetch: true */ '~/components/modals/DeleteConfirmModal'),
      EllipsisButton,
      PlusButton,
      TripDetailsModal: () => import(/* webpackPrefetch: true */ '~/components/modals/TripDetailsModal')
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
