// Dependencies
import { useEffect, useState } from 'react';

// Hooks
import useBrowserScroll from './useBrowserScroll';

export default function useTransformOnScroll(element) {
  // Other Hooks
  const [active, setActive] = useState(false);
  const [initialPosition, setInitialPosition] = useState(null);

  const scrollPosition = useBrowserScroll();

  useEffect(() => {
    if (element.current) {
    	if (!initialPosition) {
    		setInitialPosition(element.current.offsetTop);
      } else {
        if (!active && scrollPosition >= initialPosition - 60) {
          setActive(true);
          element.current.classList.add('x-axis-top');
        }

        if (active && scrollPosition <= initialPosition - 60) {
          setActive(false);
          element.current.classList.remove('x-axis-top');
        }
      }
    }
  }, [element, scrollPosition, initialPosition]);

  return active;
}
