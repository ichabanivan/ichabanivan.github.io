import { getImage } from 'astro:assets';
import type { DocumentKey, LogoKey } from '../data/cv';

import efset2026 from '../assets/cert-english-ef-set-b2-2026.png';
import efset2024 from '../assets/cert-english-ef-set-b2-2024.png';
import reactOneRoadmap from '../assets/cert-react-oneroadmap-2026.jpg';
import javascriptOneRoadmap from '../assets/cert-javascript-oneroadmap-2026.jpg';
import htmlCss from '../assets/cert-html-css-testprovider-2017.jpg';
import javascript from '../assets/cert-javascript-essential-testprovider-2017.jpg';
import php from '../assets/cert-php-starter-testprovider-2017.jpg';
import masterComputerScience from '../assets/diploma-master-computer-science-kharkiv-2021.png';
import masterOilGas from '../assets/diploma-master-oil-gas-poltava-2020.png';
import bachelorMining from '../assets/diploma-bachelor-mining-poltava-2019.png';

import fiverr from '../assets/logos/fiverr.svg';
import auto1 from '../assets/logos/auto1-group.svg';
import intelliceed from '../assets/logos/intelliceed.svg';
import brightgrove from '../assets/logos/brightgrove.svg';
import alevel from '../assets/logos/a-level.png';

const SOURCES: Record<DocumentKey, ImageMetadata> = {
  efset2026,
  efset2024,
  reactOneRoadmap,
  javascriptOneRoadmap,
  htmlCss,
  javascript,
  php,
  masterComputerScience,
  masterOilGas,
  bachelorMining,
};

export interface DocumentImage {
  thumb: string;
  full: string;
  width: number;
  height: number;
}

export type DocumentImages = Record<DocumentKey, DocumentImage>;

const THUMB_WIDTH = 640;
const FULL_WIDTH = 1800;

export async function getDocumentImages(): Promise<DocumentImages> {
  const entries = await Promise.all(
    (Object.keys(SOURCES) as DocumentKey[]).map(async (key) => {
      const source = SOURCES[key];
      const fullWidth = Math.min(FULL_WIDTH, source.width);
      const [thumb, full] = await Promise.all([
        getImage({
          src: source,
          width: Math.min(THUMB_WIDTH, source.width),
          format: 'webp',
          quality: 72,
        }),
        getImage({ src: source, width: fullWidth, format: 'webp', quality: 82 }),
      ]);
      const image: DocumentImage = {
        thumb: thumb.src,
        full: full.src,
        width: fullWidth,
        height: Math.round((fullWidth / source.width) * source.height),
      };
      return [key, image] as const;
    }),
  );
  return Object.fromEntries(entries) as DocumentImages;
}

export interface Logo {
  src: string;
  width: number;
  height: number;
  displayHeight?: number;
}

export type Logos = Record<LogoKey, Logo>;

export const logos: Logos = {
  fiverr: { src: fiverr.src, width: fiverr.width, height: fiverr.height },
  auto1: { src: auto1.src, width: auto1.width, height: auto1.height },
  intelliceed: { src: intelliceed.src, width: intelliceed.width, height: intelliceed.height },
  brightgrove: { src: brightgrove.src, width: brightgrove.width, height: brightgrove.height },
  alevel: { src: alevel.src, width: alevel.width, height: alevel.height, displayHeight: 36 },
};
