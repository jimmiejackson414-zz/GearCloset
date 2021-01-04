import Cookies from 'js-cookie';

function requestHeaders () {
  return { authorization: `Bearer ${Cookies.get('gc-token')}` };
};

export default requestHeaders();
