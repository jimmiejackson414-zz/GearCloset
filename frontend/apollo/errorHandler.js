export default ({ graphQLErrors, networkError, operation, forward }, nuxtContext) => {
  const isDev = process.env.NODE_ENV === 'production';
  if (isDev) {
    console.log('***** Global error handler *****');
    console.log({ graphQLErrors }, { networkError }, { operation }, { forward });
    console.log({ nuxtContext });
  }
};
