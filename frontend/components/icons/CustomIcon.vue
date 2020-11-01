<template>
  <client-only>
    <unicon
      :class="customClass"
      :fill="fillStyles"
      :height="height"
      :name="name"
      :style="styles"
      :width="width" />
  </client-only>
</template>

<script>
  export default {
    props: {
      customClass: {
        type: String,
        default: '',
        required: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      name: {
        type: String,
        default: '',
        required: true
      },
      fill: {
        type: String,
        default: '#9e9e9e',
        required: false
      },
      height: {
        type: Number,
        default: 20,
        required: false
      },
      width: {
        type: Number,
        default: 20,
        required: false
      }
    },

    computed: {
      fillStyles () {
        return this.disabled ? '#cccccc' : this.fill;
      },
      styles () {
        return {
          height: this.height,
          width: this.width
        };
      }
    }
  };
</script>

<style lang="scss" scoped>
  .unicon {
    align-items: center;
    display: flex;
    justify-content: center;
  }
</style>
