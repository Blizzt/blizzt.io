// Dependencies
import axios from 'axios';
import { chainsTypeId } from '@types/web3';

export const getQuery = (limit, page) =>
  `limit=${limit}&offset=${page ? page * limit : 0}`;

const parseFormData = (data, attachment) => {
  return new Promise((resolve) => {
    const formData = new FormData();
    formData.append('attachment', attachment);

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    resolve(formData);
  });
};

export function fetcherAPI(path) {
  return new Promise(async(resolve, reject) => {
    const baseURL = `http://127.0.0.1:5000${path}`;

    const headers = {
      Accept: 'application/json'
    };

    const data = {};

    if (process.env.NODE_ENV === 'development') {
      console.info('fetch::request', {
        headers,
        data,
        baseURL
      });
    }

    try {
      const result = await axios(baseURL);

      if (process.env.NODE_ENV === 'development') {
        console.info('fetch::response', { baseURL, result });
      }

      return resolve(result.data);
    } catch (e) {
      reject(e);
    }
  });
}

export default function fetchAPI({
  method,
  endPoint,
  body = {},
  attachment = null,
  credentials = {
    userAddress: '',
    userChainId: chainsTypeId.RINKEBY
  }
}) {
  return new Promise(async(resolve, reject) => {
    const baseURL = `http://127.0.0.1:5000${endPoint}`;

    let headers = {
      Accept: 'application/json',
      Credentials: JSON.stringify(credentials)
    };

    let data = {};

    if (attachment && typeof attachment !== 'string') {
      headers = {
        ...headers,
        'Content-Type': 'multipart/form-data',
        type: 'formData'
      };

      data = await parseFormData(body, attachment);
    } else {
      headers = {
        ...headers,
        'Content-Type': 'application/json'
      };

      data = JSON.stringify(body);
    }

    if (process.env.NODE_ENV === 'development') {
      console.info('fetch::request', {
        headers,
        data,
        baseURL
      });
    }

    try {
      const result = await axios({
        baseURL,
        method,
        headers,
        data
      });

      if (process.env.NODE_ENV === 'development') {
        console.info('fetch::response', { baseURL, result });
      }

      return resolve({
        statusCode: result.status,
        data: result.data
      });
    } catch (e) {
      reject(e);
    }
  });
}
