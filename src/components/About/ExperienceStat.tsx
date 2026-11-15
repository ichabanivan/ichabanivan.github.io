import { careerStart } from '../../data/cv';
import { yearsSince } from '../../lib/tenure';
import { Box, Text } from '../../ui';
import { vars } from '../../styles/theme.css';

export function ExperienceStat() {
  return (
    <Box paddingTop="3" borderTop={`1px solid ${vars.color.line}`}>
      <Text as="dt" variant="eyebrow" color={vars.color.muted}>
        In the industry
      </Text>
      <Box
        as="dd"
        marginTop="2"
        fontFamily={vars.font.display}
        fontSize="clamp(64px, 6vw, 88px)"
        lineHeight={0.85}
        color={vars.color.white}
        title={`Since ${careerStart.label}`}
      >
        <span data-years-since={careerStart.iso}>{yearsSince(careerStart.iso)}</span>
        <Box as="span" color={vars.color.accentText}>
          +
        </Box>{' '}
        <Box as="span" fontSize="0.4em" letterSpacing="0.04em" color={vars.color.text}>
          years
        </Box>
      </Box>
    </Box>
  );
}
