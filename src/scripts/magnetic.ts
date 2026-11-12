import { gsap } from '../lib/gsap';
import { finePointer, motionOk } from '../ui/media';

const SHELL = 7;
const LABEL = 3;
const PRESS = 0.97;

function attach(shell: HTMLElement): () => void {
  const label = shell.querySelector<HTMLElement>('[data-magnetic-label]');
  if (!label) return () => {};

  const tween = { duration: 0.5, ease: 'power3.out' };
  const shellX = gsap.quickTo(shell, 'x', tween);
  const shellY = gsap.quickTo(shell, 'y', tween);
  const labelX = gsap.quickTo(label, 'x', tween);
  const labelY = gsap.quickTo(label, 'y', tween);
  const scale = (value: number) =>
    gsap.to(shell, { scale: value, duration: 0.2, ease: 'power3.out', overwrite: 'auto' });

  let box = { left: 0, top: 0, width: 1, height: 1 };
  const measure = () => {
    const rect = shell.getBoundingClientRect();
    const x = Number(gsap.getProperty(shell, 'x')) || 0;
    const y = Number(gsap.getProperty(shell, 'y')) || 0;
    box = { left: rect.left - x, top: rect.top - y, width: rect.width, height: rect.height };
  };

  const onEnter = (event: PointerEvent) => {
    if (event.pointerType === 'mouse') measure();
  };
  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    shell.style.setProperty('--mx', `${x}px`);
    shell.style.setProperty('--my', `${y}px`);
    const dx = gsap.utils.clamp(-1, 1, x / box.width - 0.5) * 2;
    const dy = gsap.utils.clamp(-1, 1, y / box.height - 0.5) * 2;
    shellX(dx * SHELL);
    shellY(dy * SHELL);
    labelX(dx * LABEL);
    labelY(dy * LABEL);
  };
  const release = () => scale(1);
  const onLeave = () => {
    shellX(0);
    shellY(0);
    labelX(0);
    labelY(0);
    release();
  };
  const onDown = (event: PointerEvent) => {
    if (event.pointerType === 'mouse' && event.button === 0) scale(PRESS);
  };

  shell.dataset.tracked = '';
  shell.addEventListener('pointerenter', onEnter);
  shell.addEventListener('pointermove', onMove);
  shell.addEventListener('pointerleave', onLeave);
  shell.addEventListener('pointerdown', onDown);
  shell.addEventListener('pointerup', release);

  return () => {
    shell.removeEventListener('pointerenter', onEnter);
    shell.removeEventListener('pointermove', onMove);
    shell.removeEventListener('pointerleave', onLeave);
    shell.removeEventListener('pointerdown', onDown);
    shell.removeEventListener('pointerup', release);
    delete shell.dataset.tracked;
    shell.style.removeProperty('--mx');
    shell.style.removeProperty('--my');
    gsap.killTweensOf([shell, label]);
    gsap.set([shell, label], { clearProps: 'transform,translate,rotate,scale' });
  };
}

export function initMagnetic(): void {
  const buttons = gsap.utils.toArray<HTMLElement>('[data-magnetic]');
  if (!buttons.length) return;
  gsap.matchMedia().add(`${finePointer} and ${motionOk}`, () => {
    const detach = buttons.map(attach);
    return () => detach.forEach((fn) => fn());
  });
}
