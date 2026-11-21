const WINDOWS: { top: (h: number) => number; bottom: (h: number) => number }[] = [
  { top: (h) => h / 3, bottom: (h) => 30 + h / 3 },
  { top: (h) => h / 7, bottom: (h) => 75 + h / 7 },
  { top: (h) => 10 + h / 10, bottom: (h) => 85 + h / 10 },
  { top: (h) => 10 + h / 15, bottom: (h) => 95 + h / 15 },
  { top: (h) => 20 + h / 8, bottom: (h) => 85 + h / 8 },
  { top: (h) => 12 + h / 2.5, bottom: (h) => 52 + h / 2.5 },
];

export const REST = { fine: 50, coarse: 30 };

export const PORTRAIT_PENDING_CLASS = 'portrait-pending';

const round = (n: number) => Math.round(n * 100) / 100;

export const stripWindow = (i: number, h: number) => ({
  t: round(WINDOWS[i].top(h)),
  b: round(Math.min(100, WINDOWS[i].bottom(h))),
});
