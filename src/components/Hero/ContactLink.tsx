import { Box, type BoxProps } from '../../ui';
import { hitArea } from '../../styles/a11y.css';
import { NEW_TAB_HINT_ID } from '../../styles/hints';
import { vars } from '../../styles/theme.css';

type ContactLinkProps = BoxProps<'a'>;

export function ContactLink(props: ContactLinkProps) {
  const describedBy =
    props.target === '_blank' && !props['aria-describedby'] ? NEW_TAB_HINT_ID : undefined;
  return (
    <Box
      as="a"
      className={hitArea}
      color={{ hover: vars.color.white }}
      aria-describedby={describedBy}
      {...props}
    />
  );
}
