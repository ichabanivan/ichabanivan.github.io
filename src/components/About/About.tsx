import { currentEmployer, currentPosition, profile } from '../../data/cv';
import { Box, Text } from '../../ui';
import { vars } from '../../styles/theme.css';
import { Section } from '../Section';
import { ExperienceStat } from './ExperienceStat';

const FACTS = [
  { term: 'Current role', value: `${currentPosition.title}, ${currentEmployer.company}` },
  { term: 'Based in', value: profile.location },
];

export function About() {
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
              color={i === 0 ? vars.color.textStrong : vars.color.muted}
              marginTop={i === 0 ? undefined : { print: '1' }}
            >
              {paragraph}
            </Text>
          ))}
        </Box>
        <Box as="dl" data-reveal display={{ default: 'grid', print: 'none' }} gap="5">
          <ExperienceStat />
          {FACTS.map((fact) => (
            <Box key={fact.term} paddingTop="3" borderTop={`1px solid ${vars.color.line}`}>
              <Text as="dt" variant="eyebrow" color={vars.color.muted}>
                {fact.term}
              </Text>
              <Box as="dd" marginTop="1" fontSize={16} color={vars.color.textStrong}>
                {fact.value}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Section>
  );
}
