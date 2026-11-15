import type { Position } from '../../../data/cv';
import type { Logos } from '../../../lib/documents';
import { tenure } from '../../../lib/tenure';
import { Box, Text } from '../../../ui';
import { vars } from '../../../styles/theme.css';
import { DateRange } from '../../Period';
import { BulletList } from '../BulletList';
import { ListHeading } from '../ListHeading';
import { LogoImage } from '../LogoImage';
import { Strong } from '../Strong';
import { PRINT_FULL_ROW } from '../layout';

const CLIENT_LOGO_HEIGHT = 18;

export interface PositionBlockProps {
  position: Position;
  logos: Logos;
  isGrouped: boolean;
  isFirst: boolean;
}

export function PositionBlock({ position, logos, isGrouped, isFirst }: PositionBlockProps) {
  const clientLogo = position.client?.logo ? logos[position.client.logo] : null;
  return (
    <Box
      gridColumn={PRINT_FULL_ROW}
      marginTop={{ default: isFirst ? '2' : '8', print: isFirst ? '0' : '2' }}
      paddingTop={{ default: isFirst ? '0' : '8', print: '0' }}
      borderTop={{ default: isFirst ? 0 : `1px solid ${vars.color.line}`, print: 0 }}
      breakInside={{ print: 'avoid-page' }}
    >
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
        gap="2 6"
      >
        <Text
          as="h4"
          fontSize={{ default: 18, print: '10pt' }}
          fontWeight={600}
          color={vars.color.text}
        >
          {position.title}
        </Text>
        {clientLogo && <LogoImage logo={clientLogo} height={CLIENT_LOGO_HEIGHT} />}
      </Box>
      {isGrouped && (
        <Text variant="meta" marginTop={{ default: '1', print: '0' }}>
          {position.client && (
            <>
              Client: <Strong>{position.client.name}</Strong>
              {' · '}
            </>
          )}
          <DateRange start={position.start} end={position.end} />
          {' · '}
          <span data-tenure-start={position.start.iso} data-tenure-end={position.end.iso}>
            {tenure(position.start.iso, position.end.iso)}
          </span>
        </Text>
      )}
      <Text display={{ print: 'none' }} marginTop="4" color={vars.color.muted}>
        {position.summary}
      </Text>
      <ListHeading>Highlights</ListHeading>
      <BulletList items={position.highlights.map((text) => ({ key: text, content: text }))} />
      {position.projects && (
        <>
          <ListHeading>Projects</ListHeading>
          <BulletList
            items={position.projects.map((project) => ({
              key: project.name,
              content: (
                <>
                  <Strong>{project.name}</Strong>: {project.description}
                </>
              ),
            }))}
          />
        </>
      )}
      <Text
        marginTop={{ default: '5', print: '1' }}
        padding={{ default: '4', print: '0' }}
        borderLeft={{ default: `2px solid ${vars.color.accent}`, print: 0 }}
        borderRadius="0 10px 10px 0"
        background={{ default: vars.color.surface, print: 'none' }}
        fontSize={{ default: 14, print: 'inherit' }}
        color={vars.color.muted}
      >
        <Strong>Technologies:</Strong> {position.tech.join(', ')}
      </Text>
    </Box>
  );
}
