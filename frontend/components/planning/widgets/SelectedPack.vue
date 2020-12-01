<template>
  <div class="widget-wrapper">
    <div class="content-wrapper">
      <div
        class="widget-header">
        <div class="text-h6">
          Selected Pack: <span class="font-weight-regular">{{ packName }}</span>
        </div>
        <ellipsis-button
          :items="ellipsisItems"
          @change-pack="modalOpen = true" />
      </div>
      <div
        v-if="packState === 'SHOW_GRAPH'"
        class="selected-pack-wrapper">
        <selected-pack-graph
          v-resize="onResize"
          :height="chartHeight"
          :selected-pack="activePack" />
      </div>
      <p
        v-else-if="packState === 'ADD_CATEGORIES'"
        class="body-text-1">
        You haven't added anything to this pack yet! Head over to your <nuxt-link :to="{ name: 'closet' }">
          Closet
        </nuxt-link> to modify this pack.
      </p>
      <p
        v-else
        class="body-text-1">
        You haven't added a pack to this trip yet! Click on the dots in the top right to get started.
      </p>
    </div>
    <select-pack-modal
      v-model="modalOpen"
      :trip="trip"
      @handle-reset-modal="resetModal" />
  </div>
</template>

<script>
  import EllipsisButton from '~/components/icons/EllipsisButton.vue';
  import SelectedPackGraph from '~/components/graphs/SelectedPackGraph.vue';

  export default {
    props: {
      trip: {
        type: Object,
        default: () => {}
      }
    },

    data: () => ({
      chartHeight: 300,
      ellipsisItems: [{ title: 'Change Selected Pack', event: 'change-pack' }],
      loading: 0,
      modalOpen: false
    }),

    computed: {
      activePack () {
        if (!this.trip) { return null; }
        return this.trip.pack;
      },
      packName () {
        return this.trip?.pack?.name || 'None selected';
      },
      packState () {
        if (!this.activePack) {
          return 'ADD_PACK';
        } else if (this.activePack && !this.activePack?.categories?.length) {
          return 'ADD_CATEGORIES';
        }
        return 'SHOW_GRAPH';
      }
    },

    methods: {
      onResize () {
        window.innerWidth < 769 ? this.chartHeight = 200 : this.chartHeight = 300;
      },
      resetModal () {
        this.modalOpen = false;
      }
    },

    mounted () {
      this.onResize();
    },

    components: {
      EllipsisButton,
      SelectedPackGraph,
      SelectPackModal: () => import(/* webpackPrefetch: true */ '~/components/modals/SelectPackModal')
    }
  };
</script>

<style lang="scss" scoped>
  @import 'widget-styles';
</style>
