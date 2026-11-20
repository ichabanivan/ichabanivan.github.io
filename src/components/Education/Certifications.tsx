import { certifications, type Certification } from '../../data/cv';
import type { DocumentImages } from '../../lib/documents';
import { Box, Text } from '../../ui';
import { vars } from '../../styles/theme.css';
import { CertificateCard } from './CertificateCard';
import { HEADING_CLEARANCE } from '../Section';

const certificateKey = (certificate: Certification) =>
  `${certificate.title}|${certificate.issuer}|${certificate.year ?? ''}`;

interface CertificationsProps {
  documents: DocumentImages;
}

export function Certifications({ documents }: CertificationsProps) {
  return (
    <Box
      as="section"
      id="certifications"
      aria-labelledby="certifications-title"
      scrollMarginTop={{ default: HEADING_CLEARANCE, print: '0' }}
    >
      <Text
        as="h2"
        variant="display"
        id="certifications-title"
        data-reveal
        margin={{
          default: 'clamp(48px, 7vw, 88px) 0 clamp(20px, 3vw, 32px)',
          print: '3 0 1',
        }}
        fontFamily={{ default: vars.font.display, print: 'inherit' }}
        fontSize={{ default: 'clamp(30px, 3.6vw, 46px)', print: '10.5pt' }}
        fontWeight={{ print: 600 }}
        letterSpacing={{ default: '0.03em', print: 0 }}
        textTransform={{ default: 'uppercase', print: 'none' }}
      >
        Certifications
      </Text>
      <Box
        as="ul"
        display={{ default: 'grid', print: 'block' }}
        gridTemplateColumns="repeat(auto-fill, minmax(min(100%, 250px), 1fr))"
        gap="4"
      >
        {certifications.map((certificate) => (
          <CertificateCard
            key={certificateKey(certificate)}
            certificate={certificate}
            image={certificate.image && documents[certificate.image]}
          />
        ))}
      </Box>
    </Box>
  );
}
