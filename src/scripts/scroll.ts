import { gsap, ScrollTrigger } from '../lib/gsap';
import { ease } from '../lib/motion';
import { motionOk, reducedMotion } from '../ui/media';
import { createJumpGuard, initReveals } from './reveal';

function initScrollSpy(): void {
  const links = gsap.utils.toArray<HTMLAnchorElement>('[data-nav-link]');
  const setCurrent = (id: string | null) => {
    links.forEach((link) => {
      if (link.getAttribute('href') === `#${id}`) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };
  gsap.utils.toArray<HTMLElement>('[data-section]').forEach((section) => {
    const id = section.id === 'additional' ? 'education' : section.id;
    ScrollTrigger.create({
      trigger: section,
      start: 'top 45%',
      end: 'bottom 45%',
      onToggle: (self) => {
        if (self.isActive) setCurrent(id);
      },
      onLeaveBack: () => {
        if (section.id === 'about') setCurrent(null);
      },
    });
  });
}

const CARD = 'inset(0% 2.5% 0% 2.5% round 32px)';
const BLEED = 'inset(0% 0% 0% 0% round 0px)';

function initHeaderOnLight(): void {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  gsap.utils.toArray<HTMLElement>('[data-light]').forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: () => `top ${header.getBoundingClientRect().height}px`,
      end: () => `bottom ${header.getBoundingClientRect().height}px`,
      toggleClass: { targets: header, className: 'is-on-light' },
    });
  });
}

function initLightSections(): void {
  gsap.utils.toArray<HTMLElement>('[data-light]').forEach((section) => {
    const backdrop = section.querySelector('[data-light-backdrop]');
    if (!backdrop) return;
    gsap.fromTo(
      backdrop,
      { clipPath: CARD },
      {
        clipPath: BLEED,
        ease: ease.none,
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'top 20%', scrub: 0.5 },
      },
    );
    gsap.fromTo(
      backdrop,
      { clipPath: BLEED },
      {
        clipPath: CARD,
        ease: ease.none,
        immediateRender: false,
        scrollTrigger: { trigger: section, start: 'bottom 80%', end: 'bottom top', scrub: 0.5 },
      },
    );
  });
}

function initMarquee(): void {
  gsap.utils.toArray<HTMLElement>('[data-marquee-track]').forEach((track) => {
    const direction = Number(track.dataset.marqueeTrack);
    gsap.fromTo(
      track,
      { xPercent: direction < 0 ? 0 : -22 },
      {
        xPercent: direction < 0 ? -22 : 0,
        ease: ease.none,
        scrollTrigger: {
          trigger: '[data-marquee]',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      },
    );
  });
}

function initTimeline(): void {
  const timeline = document.querySelector('[data-timeline]');
  if (!timeline) return;
  gsap.from('[data-timeline-line]', {
    scaleY: 0,
    ease: ease.none,
    scrollTrigger: { trigger: timeline, start: 'top 70%', end: 'bottom 70%', scrub: 0.4 },
  });
}

export function initScroll({ animate }: { animate: boolean }): void {
  initScrollSpy();
  initHeaderOnLight();

  const mm = gsap.matchMedia();
  mm.add({ motion: motionOk, reduce: reducedMotion }, (ctx) => {
    gsap.to('[data-progress]', {
      scaleX: 1,
      ease: ease.none,
      scrollTrigger: { start: 0, end: 'max', scrub: ctx.conditions?.reduce ? true : 0.3 },
    });
  });

  if (!animate) return;

  ScrollTrigger.config({ ignoreMobileResize: true });
  const jump = createJumpGuard();

  mm.add({ motion: motionOk, coarse: '(pointer: coarse)' }, (ctx) => {
    const { motion, coarse } = ctx.conditions as { motion: boolean; coarse: boolean };
    if (!motion) return;
    return initReveals(jump, coarse ? { offset: 0.75, time: 0.8 } : { offset: 1, time: 1 });
  });

  mm.add(motionOk, () => {
    initLightSections();
    initMarquee();
    initTimeline();
  });
}
