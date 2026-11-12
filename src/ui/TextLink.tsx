import { Box, type BoxProps } from './Box';
import { vars } from './theme.css';
import { NEW_TAB_HINT_ID } from './hints';

export const underline = (thickness: string) =>
  `linear-gradient(${vars.color.accent}, ${vars.color.accent}) no-repeat 0 100% / 100% ${thickness}`;

export function TextLink(props: BoxProps<'a'>) {
  return (
    <Box
      as="a"
      color={{ default: vars.color.text, hover: vars.color.white }}
      background={{ default: underline('1px'), print: 'none' }}
      backgroundSize={{ hover: '100% 100%' }}
      paddingBottom="1"
      transition={`background-size 0.4s ${vars.ease}, color 0.3s`}
      aria-describedby={props.target === '_blank' ? NEW_TAB_HINT_ID : undefined}
      {...props}
    />
  );
}
