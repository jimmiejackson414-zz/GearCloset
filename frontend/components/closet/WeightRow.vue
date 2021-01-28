<template>
  <td
    :key="identifier"
    class="px-0 py-1">
    <span class="weight-column">
      <click-to-edit
        :style="{ fontSize: '0.875rem' }"
        :unique-identifier="`weight${item.id}Ref`"
        :value="item | displayWeight(item.unit)"
        @handle-update-item="updateItem($event, item, 'weight')" />
      <v-select
        dense
        hide-details
        :items="weightItems"
        :value="item.unit"
        @change="handleUpdateUnits($event, item)" />
    </span>
  </td>
</template>

<script>
  import ClickToEdit from '~/components/ClickToEdit.vue';

  export default {
    props: {
      identifier: {
        type: String,
        default: ''
      },
      item: {
        type: Object,
        default: () => {}
      }
    },

    data: () => ({
      weight: '',
      weightItems: ['oz', 'lb', 'g', 'kg']
    }),

    computed: {
      displayWeight () {
        return this.$options.filters.displayWeight(this.item, this.item.unit);
      }
    },

    methods: {
      handleUpdateUnits (event, item) {
        this.$emit('handle-update-units', event, item);
      },
      updateItem (event, item, field) {
        this.$emit('handle-update-item', event, item, field);
      }
    },

    components: {
      ClickToEdit
    }
  };
</script>

<style lang="scss" scoped>

</style>
