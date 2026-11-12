import { createVar, style, type StyleRule } from '@vanilla-extract/css';
import { media } from './media';

const LAYOUT_PROPS = [
  'display',
  'position',
  'inset',
  'top',
  'right',
  'bottom',
  'left',
  'zIndex',
  'overflow',
  'visibility',
  'width',
  'height',
  'minHeight',
  'maxWidth',
  'maxHeight',
  'aspectRatio',
  'flex',
  'flexDirection',
  'flexWrap',
  'alignItems',
  'alignSelf',
  'justifyContent',
  'justifyItems',
  'justifySelf',
  'placeItems',
  'gridTemplateColumns',
  'gridColumn',
  'gridRow',
] as const;

export const SPACE_PROPS = [
  'gap',
  'rowGap',
  'columnGap',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginInline',
  'marginBlock',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'paddingInline',
  'paddingBlock',
] as const;

const SURFACE_PROPS = [
  'border',
  'borderTop',
  'borderBottom',
  'borderLeft',
  'borderColor',
  'borderRadius',
  'background',
  'backgroundSize',
  'color',
  'opacity',
  'transform',
  'transformOrigin',
  'translate',
  'transition',
  'cursor',
  'pointerEvents',
  'userSelect',
  'objectFit',
  'objectPosition',
  'clipPath',
  'breakInside',
] as const;

const TYPOGRAPHY_PROPS = [
  'fontFamily',
  'fontSize',
  'fontWeight',
  'lineHeight',
  'letterSpacing',
  'textTransform',
  'textAlign',
  'whiteSpace',
  'overflowWrap',
] as const;

export const STYLE_PROPS = [
  ...LAYOUT_PROPS,
  ...SPACE_PROPS,
  ...SURFACE_PROPS,
  ...TYPOGRAPHY_PROPS,
] as const;

export const STATE_PROPS = [
  'color',
  'background',
  'backgroundSize',
  'borderColor',
  'opacity',
  'transform',
] as const;

export type StyleProp = (typeof STYLE_PROPS)[number];
export type SpaceProp = (typeof SPACE_PROPS)[number];
export type StateProp = (typeof STATE_PROPS)[number];

const BREAKPOINTS = Object.keys(media) as (keyof typeof media)[];

export const CONDITIONS = ['default', 'hover', 'groupHover', ...BREAKPOINTS] as const;
export type Condition = (typeof CONDITIONS)[number];

export interface Atom {
  className: string;
  variable: string;
}

const SELECTORS: Partial<Record<Condition, string>> = {
  hover: '&:hover, &:focus-visible',
  groupHover: '[data-group]:hover &, [data-group]:focus-visible &',
};

function wrap(condition: Condition, rule: StyleRule): StyleRule {
  if (condition === 'default') return rule;
  const selector = SELECTORS[condition];
  if (selector) return { selectors: { [selector]: rule } } as StyleRule;
  return { '@media': { [media[condition as keyof typeof media]]: rule } };
}

export const atoms = {} as Record<Condition, Partial<Record<StyleProp, Atom>>>;

for (const condition of CONDITIONS) {
  atoms[condition] = {};
  const props: readonly StyleProp[] = SELECTORS[condition] ? STATE_PROPS : STYLE_PROPS;
  for (const prop of props) {
    const value = createVar(`${prop}-${condition}`);
    atoms[condition][prop] = {
      className: style(wrap(condition, { [prop]: value } as StyleRule), `${prop}_${condition}`),
      variable: value.slice('var('.length, -1),
    };
  }
}
