import Section from './Section';
import { experience, profile } from '../data/cv';
import { yearsSince } from '../lib/tenure';
import { Box, Text, vars } from '../ui';

const current = experience[0];
const first = experience[experience.length - 1];
const facts = [
  { term: 'Current role', value: `${current.title}, ${current.company}` },
  { term: 'Based in', value: profile.location },
];

function ExperienceStat() {
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
        title={`Since ${first.start.label}`}
      >
        <span data-years-since={first.start.iso}>{yearsSince(first.start.iso)}</span>
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

export default function About() {
  return (
    <Section id="about" index="01" title="Summary">
      <Box
        display={{ default: 'grid', print: 'block' }}
        gridTemplateColumns={{ default: 'minmax(0, 1fr)', lg: 'minmax(0, 1fr) 280px' }}
        alignItems="end"
        gap={{ default: '10', lg: '16' }}
      >
        <Box
          display={{ default: 'grid', print: 'block' }}
          gap="6"
          maxWidth={{ default: '62ch', print: 'none' }}
          lineHeight={1.5}
        >
          {profile.summary.map((paragraph, i) => (
            <Text
              variant="lead"
              data-reveal
              key={paragraph}
              fontWeight={{ default: 300, print: 400 }}
              color={i === 0 ? vars.color.white : vars.color.muted}
              marginTop={i === 0 ? undefined : { print: '1' }}
            >
              {paragraph}
            </Text>
          ))}
        </Box>
        <Box as="dl" data-reveal display={{ default: 'grid', print: 'none' }} gap="5">
          <ExperienceStat />
          {facts.map((fact) => (
            <Box key={fact.term} paddingTop="3" borderTop={`1px solid ${vars.color.line}`}>
              <Text as="dt" variant="eyebrow" color={vars.color.muted}>
                {fact.term}
              </Text>
              <Box as="dd" marginTop="1" fontSize={17} color={vars.color.white}>
                {fact.value}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Section>
  );
}
