import type { DocumentImage } from '../../lib/documents';
import { Box, type StyleProps } from '../../ui';
import { vars } from '../../styles/theme.css';

export type DocumentThumbProps = StyleProps & {
  image: DocumentImage;
  caption: string;
  verify?: string;
};

export function DocumentThumb({ image, caption, verify, ...style }: DocumentThumbProps) {
  return (
    <Box
      as="a"
      group
      href={image.full}
      target="_blank"
      rel="noopener"
      data-lightbox
      data-caption={caption}
      data-verify={verify}
      data-width={image.width}
      data-height={image.height}
      aria-label={`View document: ${caption}`}
      position="relative"
      display={{ default: 'block', print: 'none' }}
      aspectRatio="16 / 10"
      border="1px solid"
      borderColor={{ default: vars.color.line, hover: vars.color.accentLine }}
      borderRadius={10}
      background={vars.color.paper}
      overflow="hidden"
      cursor="zoom-in"
      transform={{ hover: 'translateY(-3px)' }}
      transition={`border-color ${vars.duration.base} ${vars.ease}, transform ${vars.duration.base} ${vars.ease}`}
      {...style}
    >
      <Box
        as="img"
        src={image.thumb}
        alt=""
        loading="lazy"
        decoding="async"
        width="100%"
        height="100%"
        padding="2"
        objectFit="contain"
        objectPosition="center"
        opacity={{ groupHover: 0.8 }}
        transition={`opacity ${vars.duration.base} ${vars.ease}`}
      />
      <Box
        as="span"
        aria-hidden
        position="absolute"
        right={10}
        bottom={10}
        padding="1 3"
        borderRadius={999}
        background={vars.color.accent}
        color={vars.color.onAccent}
        fontSize={12}
        fontWeight={500}
        letterSpacing="0.08em"
        textTransform="uppercase"
        opacity={{ default: 0, groupHover: 1 }}
        transform={{ default: 'translateY(6px)', groupHover: 'none' }}
        transition={`opacity ${vars.duration.base} ${vars.ease}, transform ${vars.duration.base} ${vars.ease}`}
      >
        View
      </Box>
    </Box>
  );
}
