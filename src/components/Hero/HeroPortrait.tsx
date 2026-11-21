import { Fragment, type CSSProperties } from 'react';
import { profile } from '../../data/cv';
import { Box } from '../../ui';
import { vars } from '../../styles/theme.css';
import { Strip } from './Strip';
import {
  ACCENT_STRIP,
  DENSE_SCREEN,
  HERO_SIZES,
  HERO_SIZES_DENSE,
  STRIPS,
  STRIP_SKEW,
  stripStyle,
} from './strips';

export interface HeroPhotoSource {
  type: string;
  srcSet: string;
}

export interface HeroPhoto {
  src: string;
  width: number;
  height: number;
  sources: HeroPhotoSource[];
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
          <Box as="picture" display="contents">
            {photo.sources.map((source) => (
              <Fragment key={source.type}>
                <source
                  type={source.type}
                  media={DENSE_SCREEN}
                  srcSet={source.srcSet}
                  sizes={HERO_SIZES_DENSE}
                />
                <source type={source.type} srcSet={source.srcSet} sizes={HERO_SIZES} />
              </Fragment>
            ))}
            <Box
              as="img"
              src={photo.src}
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
          </Box>
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
