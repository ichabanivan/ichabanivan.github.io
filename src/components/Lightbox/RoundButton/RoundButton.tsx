import { Box, type BoxProps } from '../../../ui';
import { vars } from '../../../styles/theme.css';

export type RoundButtonProps = BoxProps<'button'>;

export function RoundButton(props: RoundButtonProps) {
  return (
    <Box
      as="button"
      type="button"
      position="fixed"
      display="grid"
      placeItems="center"
      width={44}
      height={44}
      padding="0 0 1"
      border="1px solid"
      borderColor={{ default: vars.color.line, hover: vars.color.accent }}
      borderRadius="50%"
      background={{ default: vars.color.control, hover: vars.color.accent }}
      color={vars.color.white}
      fontSize={26}
      lineHeight={1}
      cursor="pointer"
      transition="background-color 0.3s, border-color 0.3s"
      {...props}
    />
  );
}
