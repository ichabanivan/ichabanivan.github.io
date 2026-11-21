import { marquee } from '../../data/cv';
import { Box } from '../../ui';
import { MarqueeTrack } from './MarqueeTrack';

interface MarqueeProps {
  words?: readonly string[];
}

export function Marquee({ words = marquee }: MarqueeProps) {
  const row = [...words, ...words];

  return (
    <Box
      aria-hidden
      data-marquee
      display={{ default: 'grid', print: 'none' }}
      gap="1"
      paddingBlock="clamp(16px, 4vw, 48px)"
      overflow="hidden"
      userSelect="none"
    >
      <MarqueeTrack words={row} direction={-1} />
      <MarqueeTrack words={[...row].reverse()} direction={1} />
    </Box>
  );
}
