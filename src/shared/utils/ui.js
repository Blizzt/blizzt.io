export const lockMainPageScrollY = (disabled) => {
  document.body.style.overflowY = disabled ? 'hidden' : 'visible';
};
