export type Direction = 1 | -1;

export interface RevealUnit {
  show: (elements: HTMLElement[], direction: Direction) => void;
  showNow: (elements: HTMLElement[]) => void;
  hide: (elements: HTMLElement[]) => void;
  cleanup: () => void;
}

export interface Scale {
  offset: number;
  time: number;
}

export const staggerFrom = (direction: Direction) => (direction > 0 ? 'start' : 'end');
