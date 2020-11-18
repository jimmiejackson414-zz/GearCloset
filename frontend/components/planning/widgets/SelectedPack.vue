<template>
  <div class="widget-wrapper">
    <div
      v-if="!loading"
      class="content-wrapper">
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
        class="selected-pack-wrapper">
        <selected-pack-graph
          v-resize="onResize"
          :height="chartHeight"
          :selected-pack="activePack" />
      </div>
    </div>
    <p v-else>
      You haven't added a pack to this trip yet! Click on the dots in the top right to get started.
    </p>
    <select-pack-modal v-model="modalOpen" />
  </div>
</template>

<script>
  import EllipsisButton from '~/components/icons/EllipsisButton.vue';
  import SelectedPackGraph from '~/components/graphs/SelectedPackGraph.vue';
  import packsQuery from '~/apollo/queries/content/packs.gql';

  export default {
    apollo: {
      packs: {
        query: packsQuery
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
        return this.packs.find(pack => pack.active);
      },
      packName () {
        return this.activePack && this.activePack.name;
      }
    },

    methods: {
      onResize () {
        window.innerWidth < 769 ? this.chartHeight = 200 : this.chartHeight = 300;
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
