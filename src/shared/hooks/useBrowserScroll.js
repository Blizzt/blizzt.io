// Dependencies
import { useEffect, useState } from 'react';

export default function useBrowserScroll() {
  // States
  const [position, setPosition] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', listenScrollPosition);

    return () => {
      window.removeEventListener('scroll', listenScrollPosition);
    };
  }, []);

  const listenScrollPosition = () =>
    setPosition(document.body.scrollTop || document.documentElement.scrollTop);

  return position;
}
