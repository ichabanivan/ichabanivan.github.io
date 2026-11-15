export function createJumpGuard() {
  let active = true;
  let timer: number | undefined;
  const settle = (ms = 200) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => (active = false), ms);
  };
  const start = () => {
    active = true;
    settle(400);
  };
  const onScroll = () => {
    if (active) settle();
  };
  const onClick = (event: MouseEvent) => {
    if ((event.target as Element | null)?.closest?.('a[href^="#"]')) start();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('hashchange', start);
  document.addEventListener('click', onClick);
  if (document.readyState === 'complete') settle(300);
  else window.addEventListener('load', () => settle(300), { once: true });

  return { isActive: () => active };
}

export type JumpGuard = ReturnType<typeof createJumpGuard>;
