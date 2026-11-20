export const media = {
  sm: 'screen and (min-width: 480px)',
  md: 'screen and (min-width: 768px)',
  lg: 'screen and (min-width: 992px)',
  print: 'print',
} as const;

export const reducedMotion = '(prefers-reduced-motion: reduce)';
export const motionOk = '(prefers-reduced-motion: no-preference)';
export const hoverCapable = '(hover: hover)';
export const finePointer = '(hover: hover) and (pointer: fine)';
