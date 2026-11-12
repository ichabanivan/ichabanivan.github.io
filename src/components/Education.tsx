import type { ReactNode } from 'react';
import Section from './Section';
import Period, { PERIOD_WIDTH } from './Period';
import { education, certifications, volunteering, languages, type Certification } from '../data/cv';
import type { DocumentImage, DocumentImages } from '../lib/documents';
import {
  Box,
  Card,
  PrintOnly,
  ScreenOnly,
  Text,
  NEW_TAB_HINT_ID,
  effects,
  vars,
  type StyleProps,
} from '../ui';

type ThumbProps = StyleProps & {
  image: DocumentImage;
  caption: string;
  verify?: string;
};

function DocumentThumb({ image, caption, verify, ...style }: ThumbProps) {
  return (
    <Box
      as="a"
      group
      href={image.full}
      target="_blank"
      rel="noopener"
      data-lightbox
      data-caption={caption}
      data-verify={verify}
      data-width={image.width}
      data-height={image.height}
      aria-label={`View document: ${caption}`}
      position="relative"
      display={{ default: 'block', print: 'none' }}
      aspectRatio="16 / 10"
      border="1px solid"
      borderColor={{ default: vars.color.line, hover: vars.color.accentLine }}
      borderRadius={10}
      background={vars.color.paper}
      overflow="hidden"
      cursor="zoom-in"
      transform={{ hover: 'translateY(-3px)' }}
      transition={`border-color 0.4s, transform 0.4s ${vars.ease}`}
      {...style}
    >
      <Box
        as="img"
        src={image.thumb}
        alt=""
        loading="lazy"
        decoding="async"
        width="100%"
        height="100%"
        padding="2"
        objectFit="contain"
        objectPosition="center"
        opacity={{ groupHover: 0.8 }}
        transition="opacity 0.4s"
      />
      <Box
        as="span"
        aria-hidden
        position="absolute"
        right={10}
        bottom={10}
        padding="1 3"
        borderRadius={999}
        background={vars.color.accent}
        color={vars.color.white}
        fontSize={12}
        fontWeight={600}
        letterSpacing="0.06em"
        textTransform="uppercase"
        opacity={{ default: 0, groupHover: 1 }}
        transform={{ default: 'translateY(6px)', groupHover: 'none' }}
        transition={`opacity 0.3s, transform 0.4s ${vars.ease}`}
      >
        View
      </Box>
    </Box>
  );
}

const certificateMeta = (certificate: Certification) =>
  [certificate.issuer, certificate.year].filter(Boolean).join(', ');

const printInline = {
  display: { print: 'inline' },
  fontSize: { print: 'inherit' },
  fontWeight: { print: 400 },
} satisfies StyleProps;

export function Education({ documents }: { documents: DocumentImages }) {
  return (
    <Section id="education" index="04" title="Education">
      <Box display="grid" gap={{ default: '4', print: '0' }}>
        {education.map((school, i) => (
          <Box
            as="article"
            data-reveal
            key={`${school.school}-${school.start.iso}`}
            display={{ default: 'grid', print: 'block' }}
            gridTemplateColumns={{
              default: 'minmax(0, 1fr)',
              lg: `${PERIOD_WIDTH} minmax(0, 1fr) minmax(0, 220px)`,
            }}
            alignItems="start"
            gap={{ default: '3', lg: 'clamp(24px, 4vw, 56px)' }}
            padding={{ default: 'clamp(20px, 3vw, 36px) 0', print: '0 0 2' }}
            borderTop={{ default: `1px solid ${vars.color.line}`, print: 0 }}
            borderBottom={
              i === education.length - 1
                ? { default: `1px solid ${vars.color.line}`, print: 0 }
                : undefined
            }
            breakInside={{ print: 'avoid-page' }}
          >
            <Period start={school.start} end={school.end} location={school.location} />
            <div>
              <Text
                as="h3"
                display={{ print: 'inline' }}
                fontSize={{ default: 'clamp(19px, 2vw, 24px)', print: '10.5pt' }}
                fontWeight={600}
                lineHeight={1.3}
                color={vars.color.white}
              >
                {school.school}
              </Text>
              <Text
                display={{ print: 'inline' }}
                marginTop={{ default: '2', print: '0' }}
                color={vars.color.text}
              >
                <PrintOnly> — </PrintOnly>
                {school.degree}
              </Text>
              <Box
                as="ul"
                display={{ default: 'grid', print: 'none' }}
                gap="1"
                marginTop="3"
                fontSize={{ default: 15, print: 'inherit' }}
                color={vars.color.muted}
              >
                {school.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </Box>
            </div>
            <DocumentThumb
              image={documents[school.diploma]}
              caption={`${school.degree}. ${school.school}`}
              maxWidth={{ default: 320, lg: 'none' }}
            />
          </Box>
        ))}
      </Box>

      <Box as="section" id="certifications" aria-labelledby="certifications-title">
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
            <Card
              as="li"
              data-reveal
              key={certificate.title}
              display={{ default: 'flex', print: 'block' }}
              flexDirection="column"
              gap="4"
              padding={{ default: '4', print: '0' }}
              marginBottom={{ print: '1' }}
            >
              {certificate.image && (
                <DocumentThumb
                  image={documents[certificate.image]}
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
                <Text as="h3" variant="title" {...printInline}>
                  {certificate.title}
                  <PrintOnly>, </PrintOnly>
                </Text>
                <Text variant="meta" {...printInline}>
                  {certificate.issuer}
                  {certificate.year && (
                    <>
                      , <time dateTime={String(certificate.year)}>{certificate.year}</time>
                    </>
                  )}
                </Text>
                {certificate.url && (
                  <Box
                    as="a"
                    group
                    href={certificate.url}
                    target="_blank"
                    rel="noopener"
                    aria-describedby={NEW_TAB_HINT_ID}
                    display={{ default: 'flex', print: 'inline' }}
                    alignItems="center"
                    justifyContent="space-between"
                    gap="3"
                    width={{ default: '100%', print: 'auto' }}
                    minHeight={{ default: 44, print: 0 }}
                    marginTop={{ default: 'auto', print: '0' }}
                    paddingTop={{ default: '2', print: '0' }}
                    borderTop={{ default: `1px solid ${vars.color.line}`, print: 0 }}
                    fontSize={{ default: 14, print: 'inherit' }}
                    fontWeight={{ default: 500, print: 400 }}
                    color={{ default: vars.color.muted, hover: vars.color.white }}
                    transition="color 0.3s"
                  >
                    <ScreenOnly>
                      Verify credential
                      <span className={effects.srOnly}>: {certificate.title}</span>
                    </ScreenOnly>
                    <Box
                      as="span"
                      aria-hidden
                      display={{ print: 'none' }}
                      color={vars.color.accentText}
                      transform={{ default: 'none', groupHover: 'translate(2px, -2px)' }}
                      transition={`transform 0.4s ${vars.ease}`}
                    >
                      ↗
                    </Box>
                    <PrintOnly> ({certificate.url})</PrintOnly>
                  </Box>
                )}
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Section>
  );
}

function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card data-reveal marginBottom={{ print: '1' }}>
      <Text as="h2" variant="eyebrow" display={{ print: 'inline' }}>
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

export function AdditionalInformation() {
  return (
    <Section id="additional" index="05" title="Additional Information">
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
              {item.organization}: {item.role}, <time dateTime={item.start.iso}>{item.start.label}</time> to{' '}
              <time dateTime={item.end.iso}>{item.end.label}</time>. {item.note}
            </Box>
          ))}
        </InfoCard>
      </Box>
    </Section>
  );
}
