import portraitUrl from '../assets/portrait.jpg?url';
import efset2026Url from '../assets/cert-english-ef-set-b2-2026.png?url';
import efset2024Url from '../assets/cert-english-ef-set-b2-2024.png?url';
import reactOneRoadmapUrl from '../assets/cert-react-oneroadmap-2026.jpg?url';
import javascriptOneRoadmapUrl from '../assets/cert-javascript-oneroadmap-2026.jpg?url';
import htmlCssUrl from '../assets/cert-html-css-testprovider-2017.jpg?url';
import javascriptUrl from '../assets/cert-javascript-essential-testprovider-2017.jpg?url';
import phpUrl from '../assets/cert-php-starter-testprovider-2017.jpg?url';
import masterComputerScienceUrl from '../assets/diploma-master-computer-science-kharkiv-2021.png?url';
import masterOilGasUrl from '../assets/diploma-master-oil-gas-poltava-2020.png?url';
import bachelorMiningUrl from '../assets/diploma-bachelor-mining-poltava-2019.png?url';
import fiverrUrl from '../assets/logos/fiverr.svg?url';
import auto1Url from '../assets/logos/auto1-group.svg?url';
import intelliceedUrl from '../assets/logos/intelliceed.svg?url';
import brightgroveUrl from '../assets/logos/brightgrove.svg?url';
import alevelUrl from '../assets/logos/a-level.png?url';
import type { HeroPhoto } from '../components/Hero';
import type { DocumentImage, DocumentImages, Logos } from '../lib/documents';

const documentImage = (url: string, width: number, height: number): DocumentImage => ({
  thumb: url,
  full: url,
  width,
  height,
});

export const photo: HeroPhoto = { src: portraitUrl, width: 1201, height: 1800, sources: [] };

export const documents: DocumentImages = {
  efset2026: documentImage(efset2026Url, 1537, 2182),
  efset2024: documentImage(efset2024Url, 1533, 2171),
  reactOneRoadmap: documentImage(reactOneRoadmapUrl, 2708, 1927),
  javascriptOneRoadmap: documentImage(javascriptOneRoadmapUrl, 2712, 1927),
  htmlCss: documentImage(htmlCssUrl, 1200, 824),
  javascript: documentImage(javascriptUrl, 1200, 824),
  php: documentImage(phpUrl, 1200, 824),
  masterComputerScience: documentImage(masterComputerScienceUrl, 2958, 2080),
  masterOilGas: documentImage(masterOilGasUrl, 2941, 2070),
  bachelorMining: documentImage(bachelorMiningUrl, 2948, 2073),
};

export const logos: Logos = {
  fiverr: { src: fiverrUrl, width: 400, height: 121 },
  auto1: { src: auto1Url, width: 310, height: 42 },
  intelliceed: { src: intelliceedUrl, width: 160, height: 32 },
  brightgrove: { src: brightgroveUrl, width: 123, height: 24 },
  alevel: { src: alevelUrl, width: 298, height: 99, displayHeight: 36 },
};
