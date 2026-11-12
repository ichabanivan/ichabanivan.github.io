import type { CSSProperties, ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import {
  atoms,
  CONDITIONS,
  SPACE_PROPS,
  type Condition,
  type SpaceProp,
  type StateProp,
  type StyleProp,
} from './box.css';
import { resolveSpace, type SpaceValue } from './space';

type Value = string | number;
type Breakpoint = Exclude<Condition, 'hover' | 'groupHover'>;

export type Responsive<T = Value> = T | Partial<Record<Breakpoint, T>>;
type Stateful<T = Value> = T | Partial<Record<Condition, T>>;

export type StyleProps = {
  [P in StyleProp]?: P extends SpaceProp
    ? Responsive<SpaceValue>
    : P extends StateProp
      ? Stateful
      : Responsive;
};

export type BoxProps<E extends ElementType = 'div'> = StyleProps & {
  as?: E;
  group?: boolean;
  htmlWidth?: number;
  htmlHeight?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & Omit<ComponentPropsWithRef<E>, StyleProp | 'as' | 'width' | 'height'>;

const UNITLESS = new Set<string>([
  'zIndex',
  'opacity',
  'lineHeight',
  'fontWeight',
  'flex',
  'aspectRatio',
  'gridRow',
  'gridColumn',
]);

const SPACE = new Set<string>(SPACE_PROPS);

const isStyleProp = (key: string): key is StyleProp => key in atoms.default;

const isCondition = (key: string): key is Condition =>
  (CONDITIONS as readonly string[]).includes(key);

function toCssValue(prop: StyleProp, value: Value): string {
  if (SPACE.has(prop)) return resolveSpace(prop, value);
  if (typeof value === 'number' && !UNITLESS.has(prop)) return `${value}px`;
  return String(value);
}

function resolveStyleProps(props: Record<string, unknown>) {
  const classNames: string[] = [];
  const variables: Record<string, string> = {};
  const rest: Record<string, unknown> = {};

  for (const [key, raw] of Object.entries(props)) {
    if (!isStyleProp(key)) {
      rest[key] = raw;
      continue;
    }
    if (raw == null || raw === false) continue;

    const byCondition = typeof raw === 'object' ? (raw as Record<string, Value>) : { default: raw };
    for (const [condition, value] of Object.entries(byCondition)) {
      if (value == null) continue;
      const atom = isCondition(condition) ? atoms[condition][key] : undefined;
      if (!atom) throw new Error(`<Box ${key}> does not support the "${condition}" condition`);
      classNames.push(atom.className);
      variables[atom.variable] = toCssValue(key, value as Value);
    }
  }

  return { classNames, variables, rest };
}

export function Box<E extends ElementType = 'div'>({
  as,
  group,
  htmlWidth,
  htmlHeight,
  className,
  style,
  ...props
}: BoxProps<E>) {
  const Element: ElementType = as ?? 'div';
  const { classNames, variables, rest } = resolveStyleProps(props);
  const classes = [...classNames, className].filter(Boolean).join(' ');
  const hasStyle = Object.keys(variables).length > 0 || style;

  return (
    <Element
      className={classes || undefined}
      style={hasStyle ? { ...variables, ...style } : undefined}
      width={htmlWidth}
      height={htmlHeight}
      data-group={group || undefined}
      {...rest}
    />
  );
}
