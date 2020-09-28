<template>
  <!-- <span> -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 178.18148803710938 178.7877655029297">
    <path
      fill="#fff"
      fill-opacity="0"
      pointer-events="none"
      d="M0 0h178.18148804v178.7877655H0z" />
    <g
      fill="#fff"
      fill-opacity="0">
      <path
        pointer-events="none"
        d="M-244.84855652-13.43730545h1399.99994545v192.32915638H-244.84855652z" />
      <g stroke="#4a4a4a">
        <path
          d="M86.77473285 166.39907556h77.35649628l-37.7992025-85.2679046s-39.55729378 83.50980837-39.55729378 85.2679046z"
          stroke-width="11.66652"
          paint-order="stroke" />
        <path
          d="M13.99221506 165.52744287h73.73300748l29.49319077-63.1997196-37.91982107-82.15963778-65.30637718 145.35935738z"
          stroke-width="12.01296"
          paint-order="fill" />
      </g>
    </g>
  </svg>
  <!-- </span> -->
</template>

<script>
  export default {
    props: {
      color: {
        type: String,
        default: '#4a4a4a'
      },
      height: {
        type: String,
        default: '30px'
      },
      width: {
        type: String,
        default: 'auto'
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
