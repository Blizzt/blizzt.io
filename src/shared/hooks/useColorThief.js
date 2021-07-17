// Dependencies
import { useEffect, useState } from 'react';
import ColorThief from 'colorthief';

const thief = new ColorThief();

export default function useColorThief(image = null) {
  // Hooks
  const [picked, setPicked] = useState([0, 0, 0]);
  const [palette, setPalette] = useState([0, 0, 0]);

  useEffect(() => {
    if (image.current) {
      try {
        const color = thief.getColor(image.current);
        const palette = thief.getPalette(image.current);
        setPicked(color);
        setPalette(palette);
      } catch (e) {}
    }
  }, [image]);

  return {
    RGB: `rgb(${picked[0]}, ${picked[1]}, ${picked[2]})`,
    PALETTE: palette
  };
}
