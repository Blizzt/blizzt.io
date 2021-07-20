export const ERROR_CODES = {
  NFT_NOT_EXISTS: {
    code: 10000,
    message: 'The collectible you wish to access does not exist.'
  }
};

const errorHandler = (code) => {
  return {
    data: null,
    error: ERROR_CODES[code]
  };
};

export default errorHandler;
