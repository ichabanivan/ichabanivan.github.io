import type { CSSProperties } from 'react';
import { profile } from '../../data/cv';
import { Box } from '../../ui';
import { vars } from '../../styles/theme.css';
import { Strip } from './Strip';
import { ACCENT_STRIP, HERO_SIZES, STRIPS, STRIP_SKEW, stripStyle } from './strips';

export interface HeroPhoto {
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

interface HeroPortraitProps {
  photo: HeroPhoto;
}

export function HeroPortrait({ photo }: HeroPortraitProps) {
  return (
    <Box
      position="relative"
      gridColumn={{ default: '1', lg: '6 / 13' }}
      gridRow={1}
      justifySelf={{ default: 'center', lg: 'end' }}
      width={{ default: 'min(100%, 70svh)', md: 'min(100%, 56svh)', lg: 'min(100%, 94svh)' }}
      aspectRatio={1}
      display={{ print: 'none' }}
      style={{ '--k': STRIP_SKEW } as CSSProperties}
    >
      {STRIPS.map((strip, i) => (
        <Strip
          index={i}
          style={stripStyle(strip, i)}
          aria-hidden={i === 0 ? undefined : true}
          key={strip.left}
        >
          <Box
            as="img"
            src={photo.src}
            srcSet={photo.srcSet}
            sizes={HERO_SIZES}
            htmlWidth={photo.width}
            htmlHeight={photo.height}
            alt={i === 0 ? `Portrait of ${profile.name}` : ''}
            loading="eager"
            decoding="async"
            fetchPriority={i === 0 ? 'high' : undefined}
            width="100%"
            height="100%"
            objectFit="cover"
            objectPosition="50% 28%"
          />
        </Strip>
      ))}
      <Strip
        index={STRIPS.length}
        style={stripStyle(ACCENT_STRIP, STRIPS.length)}
        background={vars.color.accent}
        aria-hidden
      />
      <Box
        aria-hidden
        position="absolute"
        inset="70% 0 0 0"
        background={`linear-gradient(to bottom, transparent, ${vars.color.bg})`}
        pointerEvents="none"
      />
    </Box>
  );
}
