import type { Logo } from '../../lib/documents';
import { Box } from '../../ui';

const DEFAULT_HEIGHT = 22;

interface LogoImageProps {
  logo: Logo;
  height?: number;
}

export function LogoImage({ logo, height = DEFAULT_HEIGHT }: LogoImageProps) {
  return (
    <Box
      as="img"
      src={logo.src}
      htmlWidth={logo.width}
      htmlHeight={logo.height}
      alt=""
      loading="lazy"
      flex="none"
      width="auto"
      height={logo.displayHeight ?? height}
      maxWidth={150}
      objectFit="contain"
      opacity={{ default: 0.75, groupHover: 1 }}
      transition="opacity 0.4s"
      display={{ print: 'none' }}
    />
  );
}
