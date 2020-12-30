export default (isLoading, countModifier) => {
  const isDev = process.env.NODE_ENV !== 'production';
  if (isDev) {
    console.log('===== Global loading handler =====');
    console.log({ isLoading }, { countModifier });
  }
};
