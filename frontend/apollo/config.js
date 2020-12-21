export default ({ env }) => {
  return {
    httpEndpoint: env.NUXT_ENV_BACKEND_API_URL,
    inMemoryCacheOptions: {
      freezeResults: true
    },
    assumeImmutableResults: true
  };
};
