// Dependencies
import UniversalCookie from 'universal-cookie';

export const Cookies = new UniversalCookie();

export const setCookie = (key, value, options) => {
  Cookies.set(key, value, options);
};

export const getCookie = (req = null, key, fallback = null) => {
  let result = fallback;

  try {
    if (typeof window !== 'undefined') {
      result = Cookies.get(key) || fallback;
    } else {
      result = req && req.universalCookies ? req.universalCookies.get(key) : fallback;
    }
  } catch (e) {
    // console.log(e)
  }

  return result;
};
