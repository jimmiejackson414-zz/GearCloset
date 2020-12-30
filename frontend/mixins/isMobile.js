export default {
  data: () => ({
    isMobile: true
  }),

  methods: {
    onResize () {
      this.isMobile = window.innerWidth < 768;
    }
  },

  mounted () {
    this.onResize();
  }
};
