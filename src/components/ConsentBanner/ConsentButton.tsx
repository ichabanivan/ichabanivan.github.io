import { Box, type BoxProps } from '../../ui';
import { vars } from '../../styles/theme.css';

export type ConsentButtonProps = BoxProps<'button'>;

export function ConsentButton(props: ConsentButtonProps) {
  return (
    <Box
      as="button"
      type="button"
      flex="1"
      minHeight={44}
      padding="0 5"
      border="1px solid"
      borderColor={{ default: vars.color.line, hover: vars.color.textStrong }}
      borderRadius={999}
      background="none"
      color={vars.color.textStrong}
      fontSize={14}
      fontWeight={600}
      whiteSpace="nowrap"
      cursor="pointer"
      transition={`border-color ${vars.duration.base} ${vars.ease}`}
      {...props}
    />
  );
}
