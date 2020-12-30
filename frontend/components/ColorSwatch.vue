<template>
  <div class="color-wrapper">
    <div
      v-for="(color, index) in colors"
      :key="index"
      class="color-box"
      :style="calculateColor(color)" />
  </div>
</template>

<script>
  export default {
    name: 'ColorSwatch',

    props: {
      colors: {
        type: [Array, Promise],
        default: () => []
      }
    },

    methods: {
      calculateColor (color) {
        return {
          backgroundColor: color
        };
      }
    }
  };
</script>

<style lang="scss" scoped>
  .color-wrapper {
    display: flex;

    .color-box {
      border: 1px solid white;
      border-radius: 3px;
      height: 16px;
      width: 16px;
    }
  }
</style>
