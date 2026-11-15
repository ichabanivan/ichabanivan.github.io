import { education } from '../../data/cv';
import type { DocumentImages } from '../../lib/documents';
import { Box } from '../../ui';
import { Section } from '../Section';
import { Certifications } from './Certifications';
import { SchoolEntry } from './SchoolEntry';

interface EducationProps {
  documents: DocumentImages;
}

export function Education({ documents }: EducationProps) {
  return (
    <Section id="education" index="04" title="Education">
      <Box display="grid" gap={{ default: '4', print: '0' }}>
        {education.map((school, i) => (
          <SchoolEntry
            key={`${school.school}-${school.start.iso}`}
            school={school}
            diploma={documents[school.diploma]}
            isLast={i === education.length - 1}
          />
        ))}
      </Box>
      <Certifications documents={documents} />
    </Section>
  );
}
