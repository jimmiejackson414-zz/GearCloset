<template>
  <svg
    id="L4"
    enable-background="new 0 0 0 0"
    :height="height"
    version="1.1"
    viewBox="0 0 100 100"
    :width="width"
    x="0px"
    xml:space="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    y="0px">
    <circle
      cx="6"
      cy="50"
      :fill="color"
      r="6"
      stroke="none">
      <animate
        attributeName="opacity"
        begin="0.1"
        dur="1s"
        repeatCount="indefinite"
        values="0;1;0" />
    </circle>
    <circle
      cx="26"
      cy="50"
      :fill="color"
      r="6"
      stroke="none">
      <animate
        attributeName="opacity"
        begin="0.2"
        dur="1s"
        repeatCount="indefinite"
        values="0;1;0" />
    </circle>
    <circle
      cx="46"
      cy="50"
      :fill="color"
      r="6"
      stroke="none">
      <animate
        attributeName="opacity"
        begin="0.3"
        dur="1s"
        repeatCount="indefinite"
        values="0;1;0" />
    </circle>
  </svg>
</template>

<script>
  export default {
    props: {
      color: {
        default: '#4a4a4a',
        type: String
      },
      height: {
        default: '30px',
        type: String
      },
      width: {
        default: '30px',
        type: String
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
