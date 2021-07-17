// Dependencies
import { useState, useEffect } from 'react';
import { Constants } from '@utils/layout';

/**
 * useCheckMobile();
 * @description Define if the client resolution is mobile.
 * @returns {boolean}
 */
export function useCheckMobile() {
  const isBrowser = typeof window !== 'undefined';

  // Constants
  const [width, setWidth] = useState(isBrowser ? window.innerWidth : 0);

  // Hook Effect
  useEffect(() => {
    const handleResize = () => isBrowser ? setWidth(window.innerWidth) : () => {};

    if (isBrowser) {
      // Listeners
      window.addEventListener('load', handleResize);
      window.addEventListener('resize', handleResize);
    }

    if (isBrowser) {
      // Listeners
      window.addEventListener('load', handleResize);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (isBrowser) {
        window.removeEventListener('load', handleResize);
        window.removeEventListener('resize', handleResize);
      }
    };
  });

  return (width < Constants().sizing.MAX_MOBILE_WIDTH);
}
