import { createGlobalTheme, globalFontFace, globalStyle, style } from '@vanilla-extract/css';
import { media } from './media';

const bebas = 'Bebas Neue';
const inter = 'Inter Variable';
const interFallback = 'Inter Fallback';

export const BG = '#0b0b0c';

globalFontFace(bebas, {
  src: "url('../assets/fonts/bebas-neue-bold.woff2') format('woff2')",
  fontWeight: 700,
  fontStyle: 'normal',
  fontDisplay: 'swap',
});

globalFontFace(inter, [
  {
    src: "url('../assets/fonts/inter-latin-ext-pl-wght.woff2') format('woff2-variations')",
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: '100 900',
    unicodeRange: 'U+0104-0107,U+0118-0119,U+0141-0144,U+015A-015B,U+0179-017C',
  },
  {
    src: "url('@fontsource-variable/inter/files/inter-latin-wght-normal.woff2') format('woff2-variations')",
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: '100 900',
    unicodeRange:
      'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
  },
]);

const INTER_ASCENT = 1984 / 2048;
const INTER_DESCENT = 494 / 2048;
const percent = (n: number) => `${(n * 100).toFixed(2)}%`;

const fallback = (local: string, fontWeight: string, sizeAdjust: number) => ({
  src: `local('${local}')`,
  fontWeight,
  sizeAdjust: percent(sizeAdjust),
  ascentOverride: percent(INTER_ASCENT / sizeAdjust),
  descentOverride: percent(INTER_DESCENT / sizeAdjust),
  lineGapOverride: '0%',
});

globalFontFace(interFallback, [
  fallback('Arial', '100 350', 1.0387),
  fallback('Arial', '351 500', 1.0568),
  fallback('Arial Bold', '501 900', 1.0101),
]);

export const vars = createGlobalTheme(':root', {
  color: {
    bg: BG,
    surface: '#131315',
    surface2: '#1b1b1e',
    line: 'rgba(255, 255, 255, 0.1)',
    text: '#ececee',
    muted: '#a1a1aa',
    white: '#fff',
    paper: '#fff',
    accent: '#cd0d2e',
    accentLine: 'rgba(205, 13, 46, 0.6)',
    accentText: '#ff4d67',
    accentFaint: 'rgba(205, 13, 46, 0.15)',
    glass: 'rgba(11, 11, 12, 0.78)',
    scrim: 'rgba(8, 8, 9, 0.94)',
    control: 'rgba(20, 20, 22, 0.9)',
    outline: 'rgba(255, 255, 255, 0.36)',
  },
  font: {
    display: `'${bebas}', 'Arial Narrow', Impact, sans-serif`,
    body: `'${inter}', Inter, '${interFallback}', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`,
  },
  space: {
    gutter: 'clamp(20px, 5vw, 64px)',
    wrap: '1240px',
    section: 'clamp(88px, 12vw, 168px)',
    headerH: '64px',
  },
  radius: '14px',
  ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
  easeExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
});

globalStyle(':root', {
  '@media': {
    [media.print]: {
      colorScheme: 'light',
      vars: {
        [vars.color.bg]: '#fff',
        [vars.color.surface]: '#fff',
        [vars.color.surface2]: '#fff',
        [vars.color.line]: '#ccc',
        [vars.color.text]: '#000',
        [vars.color.muted]: '#222',
        [vars.color.accent]: '#000',
        [vars.color.accentText]: '#000',
        [vars.space.section]: '8px',
      },
    },
  },
});

export const lightTheme = style({
  '@media': {
    screen: {
      colorScheme: 'light',
      vars: {
        [vars.color.bg]: '#f4f3ef',
        [vars.color.surface]: '#ebeae5',
        [vars.color.surface2]: '#e3e2dc',
        [vars.color.line]: 'rgba(11, 11, 12, 0.12)',
        [vars.color.text]: '#1c1c1f',
        [vars.color.muted]: '#5f5f66',
        [vars.color.white]: BG,
        [vars.color.accentLine]: 'rgba(205, 13, 46, 0.5)',
        [vars.color.accentText]: '#cd0d2e',
        [vars.color.accentFaint]: 'rgba(205, 13, 46, 0.08)',
        [vars.color.outline]: 'rgba(11, 11, 12, 0.28)',
      },
    },
  },
});

globalStyle(`${lightTheme} ::selection`, { color: '#fff' });
