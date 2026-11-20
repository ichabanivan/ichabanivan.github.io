import { globalStyle } from '@vanilla-extract/css';

const BANNER_CLEARANCE = 220;

globalStyle('html:has([data-consent-banner]:not([hidden]))', {
  scrollPaddingBottom: BANNER_CLEARANCE,
});
