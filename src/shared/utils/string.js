export const shortenDescription = (text, length = 128) => {
  return (text.length > length) ? text.substr(0, length - 1) + '...' : text;
};
