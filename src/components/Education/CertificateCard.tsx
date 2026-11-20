import type { Certification } from '../../data/cv';
import type { DocumentImage } from '../../lib/documents';
import { Box, Card, PrintOnly, Text, VerifyLink, type StyleProps } from '../../ui';
import { vars } from '../../styles/theme.css';
import { DocumentThumb } from '../DocumentThumb';

const TITLE_STYLE = {
  display: { print: 'inline' },
  fontSize: { default: 16, print: 'inherit' },
  fontWeight: { default: 600, print: 400 },
} satisfies StyleProps;

const META_STYLE = {
  display: { print: 'inline' },
  fontSize: { default: 14, print: 'inherit' },
} satisfies StyleProps;

const certificateMeta = (certificate: Certification) =>
  [certificate.issuer, certificate.year].filter(Boolean).join(', ');

interface CertificateCardProps {
  certificate: Certification;
  image?: DocumentImage;
}

export function CertificateCard({ certificate, image }: CertificateCardProps) {
  return (
    <Card
      as="li"
      data-reveal
      display={{ default: 'flex', print: 'block' }}
      flexDirection="column"
      gap="4"
      padding={{ default: '4', print: '0' }}
      marginBottom={{ print: '1' }}
    >
      {image && (
        <DocumentThumb
          image={image}
          caption={`${certificate.title}. ${certificateMeta(certificate)}`}
          verify={certificate.url}
        />
      )}
      <Box
        flex={1}
        display={{ default: 'flex', print: 'block' }}
        flexDirection="column"
        alignItems="flex-start"
        gap="1"
        padding={{ default: '1', print: '0' }}
      >
        <Text as="h3" variant="title" {...TITLE_STYLE}>
          {certificate.title}
          <PrintOnly>, </PrintOnly>
        </Text>
        <Text variant="meta" {...META_STYLE}>
          {certificate.issuer}
          {certificate.year && (
            <>
              , <time dateTime={String(certificate.year)}>{certificate.year}</time>
            </>
          )}
        </Text>
        {certificate.url && (
          <VerifyLink
            href={certificate.url}
            credentialName={certificate.title}
            display={{ default: 'flex', print: 'inline' }}
            justifyContent="space-between"
            gap="3"
            width={{ default: '100%', print: 'auto' }}
            minHeight={{ default: 44, print: 0 }}
            marginTop={{ default: 'auto', print: '0' }}
            paddingTop={{ default: '2', print: '0' }}
            borderTop={{ default: `1px solid ${vars.color.line}`, print: 0 }}
            fontSize={{ default: 14, print: 'inherit' }}
          />
        )}
      </Box>
    </Card>
  );
}
