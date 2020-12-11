export const getCookie = (cookieName, stringCookie) => {
  const strCookie = new RegExp('' + cookieName + '[^;]+').exec(stringCookie)[0];
  return unescape(strCookie ? strCookie.toString().replace(/^[^=]+./, '') : '');
};
