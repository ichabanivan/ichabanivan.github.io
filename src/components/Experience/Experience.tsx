import { experience } from '../../data/cv';
import type { Logos } from '../../lib/documents';
import { Box } from '../../ui';
import { vars } from '../../styles/theme.css';
import { Section } from '../Section';
import { EmployerEntry } from './EmployerEntry';
import { LINE_LEFT } from './layout';

interface ExperienceProps {
  logos: Logos;
}

export function Experience({ logos }: ExperienceProps) {
  return (
    <Section id="experience" index="02" title="Professional Experience">
      <Box data-timeline position="relative">
        <Box
          data-timeline-line
          aria-hidden
          position="absolute"
          top={8}
          bottom={0}
          left={{ default: 5, lg: LINE_LEFT }}
          width={1}
          background={`linear-gradient(to bottom, ${vars.color.accent}, ${vars.color.accentFaint})`}
          transformOrigin="top"
          display={{ print: 'none' }}
        />
        {experience.map((employer, i) => (
          <EmployerEntry
            employer={employer}
            logos={logos}
            isLast={i === experience.length - 1}
            key={employer.company}
          />
        ))}
      </Box>
    </Section>
  );
}
