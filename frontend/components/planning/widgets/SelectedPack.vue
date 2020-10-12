<template>
  <div class="widget-wrapper">
    <div class="widget-header">
      <div class="text-h6">
        Selected Pack: <span class="font-weight-regular">{{ packName }}</span>
      </div>
      <ellipsis-button
        :items="ellipsisItems"
        @change-pack="modalOpen = true" />
    </div>
    <div
      v-if="activePack"
      class="selected-pack-wrapper">
      <selected-pack-graph :height="300" />
    </div>
    <p v-else>
      You haven't added a pack to this trip yet! Click on the dots in the top right to get started.
    </p>
    <select-pack-modal v-model="modalOpen" />
  </div>
</template>

<script>
  import EllipsisButton from '~/components/icons/EllipsisButton';
  import SelectedPackGraph from '~/components/graphs/SelectedPackGraph';
  import SelectPackModal from '~/components/modals/SelectPackModal';
  import currentUser from '~/mixins/currentUser';

  export default {
    mixins: [currentUser],

    data: () => ({
      ellipsisItems: [{ title: 'Change Selected Pack', event: 'change-pack' }],
      modalOpen: false
    }),

    computed: {
      activePack () {
        return this.currentUser.packs.find(pack => pack.active);
      },
      packName () {
        return this.activePack && this.activePack.name;
      }
    },

    components: {
      EllipsisButton,
      SelectedPackGraph,
      SelectPackModal
    }
  };
</script>

<style lang="scss" scoped>
  @import 'widget-styles';
</style>