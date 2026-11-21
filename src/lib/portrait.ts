import { getImage } from 'astro:assets';
import portrait from '../assets/portrait.jpg';

const WIDTHS = [480, 640, 800, 960, 1200];
const FORMATS = [{ format: 'webp', type: 'image/webp', quality: 78 }] as const;

export interface PortraitSource {
  type: string;
  srcSet: string;
}

export interface Portrait {
  src: string;
  width: number;
  height: number;
  sources: PortraitSource[];
}

export async function getPortrait(): Promise<Portrait> {
  const images = await Promise.all(
    FORMATS.map(({ format, quality }) =>
      getImage({ src: portrait, widths: WIDTHS, format, quality }),
    ),
  );

  return {
    src: images[images.length - 1].src,
    width: portrait.width,
    height: portrait.height,
    sources: images.map((image, i) => ({
      type: FORMATS[i].type,
      srcSet: image.srcSet.attribute,
    })),
  };
}
