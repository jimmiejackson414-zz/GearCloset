export default {
  data: () => ({
    isMobile: true
  }),

  methods: {
    onResize () {
      this.isMobile = this.$vuetify.breakpoint.mobile;
    }
  },

  mounted () {
    this.onResize();
  }
};
