import type { ReactNode } from 'react';
import Section from './Section';
import { volunteering, languages } from '../data/cv';
import { Box, Card, PrintOnly, Text, vars } from '../ui';

function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card data-reveal marginBottom={{ print: '1' }}>
      <Text as="h3" variant="eyebrow" display={{ print: 'inline' }}>
        {title}
        <PrintOnly>: </PrintOnly>
      </Text>
      <Box
        as="ul"
        display={{ default: 'grid', print: 'inline' }}
        gap={{ default: '3', print: '1' }}
        marginTop={{ default: '4', print: '1' }}
        color={vars.color.text}
      >
        {children}
      </Box>
    </Card>
  );
}

export default function AdditionalInformation() {
  return (
    <Section id="additional" navTarget="education" index="05" title="Additional Information">
      <Box
        display={{ default: 'grid', print: 'block' }}
        gridTemplateColumns={{ default: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' }}
        gap="4"
      >
        <InfoCard title="Languages">
          {languages.map((language, i) => (
            <Box as="li" key={language.name} display={{ print: 'inline' }}>
              {language.name}{' '}
              <Box as="span" color={vars.color.muted}>
                ({language.level})
              </Box>
              {i < languages.length - 1 && <PrintOnly>, </PrintOnly>}
            </Box>
          ))}
        </InfoCard>
        <InfoCard title="Volunteering">
          {volunteering.map((item) => (
            <Box as="li" key={item.organization + item.start.iso} display={{ print: 'inline' }}>
              {item.organization}: {item.role},{' '}
              <time dateTime={item.start.iso}>{item.start.label}</time> to{' '}
              <time dateTime={item.end.iso}>{item.end.label}</time>. {item.note}
            </Box>
          ))}
        </InfoCard>
      </Box>
    </Section>
  );
}
