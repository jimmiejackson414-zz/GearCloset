<template>
  <v-menu
    bottom
    class="ellipsis-menu"
    nudge-bottom
    offset-y
    transition="slide-y-transition">
    <template #activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        class="ellipsis"
        icon
        :ripple="false"
        v-on="on">
        <custom-icon
          :fill="primaryColor"
          :height="30"
          name="ellipsis-v"
          :width="30" />
      </v-btn>
    </template>
    <v-list
      dense
      elevation="1">
      <v-list-item-group>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          dense
          @click="handleEvent(item)">
          <span :class="['body-1', 'font-weight-medium', ...item.customClass]">{{ item.title }}</span>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
  import CustomIcon from '~/components/icons/CustomIcon';

  export default {
    props: {
      items: {
        type: Array,
        required: true,
        default: () => ''
      },
      selectedDetail: {
        type: Object,
        default: () => {}
      }
    },

    data: () => ({
      primaryColor: ''
    }),

    methods: {
      handleEvent (item) {
        this.$emit(item.event);
      }
    },

    mounted () {
      this.primaryColor = $nuxt.$vuetify.theme.themes.light.primary;
    },

    components: {
      CustomIcon
    }
  };
</script>

<style lang="scss" scoped>

</style>
