import { Box, srOnly, VerifyLink, vars, type BoxProps, type StyleProps } from '../ui';
import { dialog } from './Lightbox.css';

export default function Lightbox() {
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
          <VerifyLink href="" label="" data-lightbox-verify hidden />
        </Box>
      </Box>
      <RoundButton aria-label="Close" data-lightbox-close top={12} right={12}>
        ×
      </RoundButton>
      <RoundButton aria-label="Previous document" data-lightbox-prev hidden left={12} {...SIDE}>
        ‹
      </RoundButton>
      <RoundButton aria-label="Next document" data-lightbox-next hidden right={12} {...SIDE}>
        ›
      </RoundButton>
    </Box>
  );
}

const SIDE = {
  top: { default: 'auto', lg: '50%' },
  bottom: { default: 12, lg: 'auto' },
  translate: { default: 'none', lg: '0 -50%' },
} satisfies StyleProps;

function RoundButton(props: BoxProps<'button'>) {
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
