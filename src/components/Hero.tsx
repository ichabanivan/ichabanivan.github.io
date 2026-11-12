import { useRef, type CSSProperties } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { ease } from '../lib/motion';
import { profile } from '../data/cv';
import { motionOk } from '../ui/media';
import {
  Box,
  Button,
  effects,
  intro,
  NEW_TAB_HINT_ID,
  PrintOnly,
  Text,
  vars,
  type BoxProps,
} from '../ui';

gsap.registerPlugin(useGSAP);

export interface HeroPhoto {
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

interface Props {
  photo: HeroPhoto;
}

const STRIPS = [
  { l: 14.4, w: 10.6 },
  { l: 28, w: 18.9 },
  { l: 47.2, w: 12.9 },
  { l: 60.4, w: 18.9 },
  { l: 79.7, w: 6.1 },
];
const ACCENT_STRIP = { l: 89.5, w: 1 };

const WINDOWS: { top: (h: number) => number; bottom: (h: number) => number }[] = [
  { top: (h) => h / 3, bottom: (h) => 30 + h / 3 },
  { top: (h) => h / 7, bottom: (h) => 75 + h / 7 },
  { top: (h) => 10 + h / 10, bottom: (h) => 85 + h / 10 },
  { top: (h) => 10 + h / 15, bottom: (h) => 95 + h / 15 },
  { top: (h) => 20 + h / 8, bottom: (h) => 85 + h / 8 },
  { top: (h) => 12 + h / 2.5, bottom: (h) => 52 + h / 2.5 },
];

const HERO_SIZES =
  '(min-width: 992px) min(58vw, 94svh), (min-width: 768px) min(100vw, 56svh), min(100vw, 70svh)';

const FINE_POINTER = '(hover: hover) and (pointer: fine)';
const REST = { fine: 50, coarse: 30 };

const clamp = gsap.utils.clamp(0, 100);
const round = (n: number) => Math.round(n * 100) / 100;

const at = (i: number, h: number) => ({
  t: round(WINDOWS[i].top(h)),
  b: round(Math.min(100, WINDOWS[i].bottom(h))),
});

const stripStyle = (s: typeof ACCENT_STRIP, i: number) => {
  const fine = at(i, REST.fine);
  const coarse = at(i, REST.coarse);
  return {
    '--l': s.l,
    '--w': s.w,
    '--i': i,
    '--t0': fine.t,
    '--b0': fine.b,
    '--t1': coarse.t,
    '--b1': coarse.b,
  } as CSSProperties;
};

export default function Hero({ photo }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const hero = root.current;
      if (!hero) return;
      const strips = gsap.utils.toArray<HTMLElement>('[data-strip]', hero);

      const mm = gsap.matchMedia();
      mm.add({ motion: motionOk, fine: FINE_POINTER }, (ctx) => {
        const { motion, fine } = ctx.conditions as { motion: boolean; fine: boolean };
        if (!motion) return;

        const rest = fine ? REST.fine : REST.coarse;
        const state = { h: rest };
        let pointerH = rest;
        let progress = 0;

        const render = () =>
          strips.forEach((strip, i) => {
            const { t, b } = at(i, state.h);
            strip.style.setProperty('--t', String(t));
            strip.style.setProperty('--b', String(b));
          });

        const moveTo = gsap.quickTo(state, 'h', {
          duration: 0.9,
          ease: ease.soft,
          onUpdate: render,
        });
        const update = () => moveTo(clamp(pointerH + progress * 60));

        const onPointerMove = (event: PointerEvent) => {
          pointerH = (event.clientY / window.innerHeight) * 100;
          update();
        };
        if (fine) window.addEventListener('pointermove', onPointerMove, { passive: true });

        ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          onUpdate: (self) => {
            progress = self.progress;
            update();
          },
        });

        return () => {
          window.removeEventListener('pointermove', onPointerMove);
          strips.forEach((strip) => {
            strip.style.removeProperty('--t');
            strip.style.removeProperty('--b');
          });
        };
      });
    },
    { scope: root },
  );

  const gutter = vars.space.gutter;

  return (
    <Box
      as="section"
      id="top"
      ref={root}
      position="relative"
      display={{ default: 'grid', print: 'block' }}
      gridTemplateColumns={{ default: 'minmax(0, 1fr)', lg: 'repeat(12, minmax(0, 1fr))' }}
      alignItems={{ default: 'start', lg: 'center' }}
      minHeight={{ default: 0, lg: '100svh', print: 0 }}
      padding={{
        default: `${vars.space.headerH} 0 6`,
        lg: `${vars.space.headerH} 0 0`,
        print: '0',
      }}
      overflow="hidden"
    >
      <Box
        position="relative"
        zIndex={2}
        gridColumn={{ default: '1', lg: '1 / 9' }}
        gridRow={{ default: 2, lg: 1 }}
        marginTop={{ default: '-19vw', lg: '0', print: '0' }}
        padding={{ default: `0 ${gutter}`, lg: `8 0 8 ${gutter}`, print: '0' }}
      >
        <Box
          as="h1"
          fontFamily={vars.font.display}
          fontSize={{
            default: 'clamp(72px, 26vw, 190px)',
            lg: 'clamp(96px, 15.5vw, 236px)',
            print: '26pt',
          }}
          fontWeight={700}
          lineHeight={{ default: 0.8, print: 1 }}
          letterSpacing="0.04em"
          textTransform="uppercase"
          color={vars.color.accent}
        >
          <NameLine line={0}>{profile.firstName}</NameLine>{' '}
          <NameLine line={1} paddingLeft={{ default: '0.5em', lg: '0.85em', print: '0' }}>
            {profile.lastName}
          </NameLine>
        </Box>
        <Text
          className={intro.item[0]}
          marginTop={{ default: 'clamp(20px, 3vw, 40px)', print: '1' }}
          fontSize={{ default: 'clamp(18px, 2.2vw, 30px)', print: '11pt' }}
          fontWeight={300}
          letterSpacing={{ default: '0.16em', lg: '0.22em', print: '0.05em' }}
          textTransform="uppercase"
          color={vars.color.white}
        >
          {profile.title}
        </Text>
        <Box
          as="address"
          className={intro.item[1]}
          display="flex"
          flexWrap="wrap"
          gap={{ default: '1 5', print: '0 3' }}
          marginTop={{ default: '4', print: '1' }}
          fontSize={{ default: 15, print: 'inherit' }}
          color={vars.color.muted}
        >
          <span>{profile.location}</span>{' '}
          <ContactLink href={`mailto:${profile.email}`}>{profile.email}</ContactLink>{' '}
          {profile.phone && (
            <>
              <ContactLink href={`tel:${profile.phone.replace(/\s/g, '')}`}>
                {profile.phone}
              </ContactLink>{' '}
            </>
          )}
          <ContactLink href={profile.linkedin} target="_blank" rel="me noopener noreferrer">
            LinkedIn
            <PrintOnly> ({profile.linkedin})</PrintOnly>
          </ContactLink>{' '}
          <ContactLink href={profile.telegram} target="_blank" rel="me noopener noreferrer">
            Telegram
            <PrintOnly> ({profile.telegram})</PrintOnly>
          </ContactLink>{' '}
          <Box as="span" display={{ default: 'none', print: 'inline' }}>
            GitHub ({profile.github})
          </Box>
        </Box>
        <Box
          className={intro.item[2]}
          display={{ default: 'flex', print: 'none' }}
          flexWrap="wrap"
          gap="3"
          marginTop="clamp(28px, 4vw, 48px)"
        >
          <Button variant="primary" href="#experience">
            View experience
          </Button>{' '}
          <Button href="#contact">Get in touch</Button>
        </Box>
      </Box>

      <Box
        position="relative"
        gridColumn={{ default: '1', lg: '6 / 13' }}
        gridRow={1}
        justifySelf={{ default: 'center', lg: 'end' }}
        width={{ default: 'min(100%, 70svh)', md: 'min(100%, 56svh)', lg: 'min(100%, 94svh)' }}
        aspectRatio={1}
        display={{ print: 'none' }}
        style={{ '--k': 32.5 } as CSSProperties}
      >
        {STRIPS.map((strip, i) => (
          <Strip
            index={i}
            style={stripStyle(strip, i)}
            aria-hidden={i === 0 ? undefined : true}
            key={strip.l}
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
    </Box>
  );
}

function NameLine({ line, children, ...props }: BoxProps<'span'> & { line: 0 | 1 }) {
  return (
    <Box
      as="span"
      display={{ default: 'block', print: 'inline' }}
      paddingTop={{ default: '0.06em', print: '0' }}
      overflow="hidden"
      {...props}
    >
      <Box
        as="span"
        className={intro.nameInner[line]}
        display={{ default: 'block', print: 'inline' }}
      >
        {children}
      </Box>
    </Box>
  );
}

function ContactLink(props: BoxProps<'a'>) {
  const describedBy =
    props.target === '_blank' && !props['aria-describedby'] ? NEW_TAB_HINT_ID : undefined;
  return (
    <Box
      as="a"
      className={effects.hitArea}
      color={{ hover: vars.color.white }}
      aria-describedby={describedBy}
      {...props}
    />
  );
}

function Strip({ index, className, ...props }: BoxProps<'div'> & { index: number }) {
  return (
    <Box
      data-strip
      position="absolute"
      inset={0}
      overflow="hidden"
      className={[intro.strip, index % 2 ? intro.stripDown : intro.stripUp, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}
