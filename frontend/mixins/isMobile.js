export default {
  data: () => ({
    isMobile: true
  }),

  methods: {
    onResize () {
      // console.log('mobile: ', this.$vuetify.breakpoint.mobile);
      this.isMobile = this.$vuetify.breakpoint.mobile;
    }
  },

  mounted () {
    this.onResize();
  }
};
