import { Box, VerifyLink, type StyleProps } from '../../ui';
import { srOnly } from '../../styles/a11y.css';
import { vars } from '../../styles/theme.css';
import { dialog } from './Lightbox.css';
import { RoundButton } from './RoundButton';

const SIDE_BUTTON_POSITION = {
  top: { default: 'auto', lg: '50%' },
  bottom: { default: 12, lg: 'auto' },
  translate: { default: 'none', lg: '0 -50%' },
} satisfies StyleProps;

export function Lightbox() {
  return (
    <Box
      as="dialog"
      data-lightbox-dialog
      className={dialog}
      aria-label="Document"
      width="100vw"
      maxWidth="none"
      height="100dvh"
      maxHeight="none"
      margin="0"
      padding="clamp(56px, 7vw, 72px) clamp(12px, 6vw, 88px) clamp(16px, 3vw, 32px)"
      border={0}
      background={vars.color.scrim}
      color={vars.color.text}
      overflow="auto"
    >
      <Box
        as="figure"
        data-lightbox-figure
        display="grid"
        gap="4"
        justifyItems="center"
        margin="0"
        maxWidth="100%"
      >
        <Box
          as="img"
          data-lightbox-image
          alt=""
          width="auto"
          maxWidth="100%"
          height="auto"
          maxHeight="calc(100dvh - 190px)"
          borderRadius={8}
          background={vars.color.paper}
        />
        <Box
          as="figcaption"
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap="2 5"
          fontSize={15}
          textAlign="center"
          color={vars.color.muted}
          aria-live="polite"
        >
          <span>
            <span className={srOnly} data-lightbox-counter />
            <span data-lightbox-caption />
          </span>
          <VerifyLink href="" credentialName="" data-lightbox-verify hidden />
        </Box>
      </Box>
      <RoundButton aria-label="Close" data-lightbox-close top={12} right={12}>
        ×
      </RoundButton>
      <RoundButton
        aria-label="Previous document"
        data-lightbox-prev
        hidden
        left={12}
        {...SIDE_BUTTON_POSITION}
      >
        ‹
      </RoundButton>
      <RoundButton
        aria-label="Next document"
        data-lightbox-next
        hidden
        right={12}
        {...SIDE_BUTTON_POSITION}
      >
        ›
      </RoundButton>
    </Box>
  );
}
