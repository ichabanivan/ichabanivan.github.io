import { marquee } from '../data/cv';
import { Box, effects, vars } from '../ui';

const ROW = [...marquee, ...marquee];

function Track({ words, direction }: { words: string[]; direction: 1 | -1 }) {
  return (
    <Box
      data-marquee-track={direction}
      display="flex"
      gap="0.5em"
      width="max-content"
      marginLeft={direction === 1 ? '-40vw' : undefined}
      fontFamily={vars.font.display}
      fontSize="clamp(64px, 12vw, 180px)"
      lineHeight={0.95}
      letterSpacing="0.03em"
      textTransform="uppercase"
      whiteSpace="nowrap"
      color="transparent"
    >
      {words.map((word, i) => (
        <span className={effects.marqueeWord} data-word={word} key={i} />
      ))}
    </Box>
  );
}

export default function Marquee() {
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
      <Track words={ROW} direction={-1} />
      <Track words={[...ROW].reverse()} direction={1} />
    </Box>
  );
}
