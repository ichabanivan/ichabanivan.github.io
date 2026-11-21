const UNMOVED_TOLERANCE = 2;

function fragmentTarget(): HTMLElement | null {
  const id = decodeURIComponent(location.hash.slice(1));
  return id ? document.getElementById(id) : null;
}

export function keepFragmentTargetInView(): () => void {
  const target = fragmentTarget();
  if (!target) return () => {};

  const jump = () => {
    target.scrollIntoView({ behavior: 'instant', block: 'start' });
    return window.scrollY;
  };
  const settledAt = jump();

  return () => {
    if (Math.abs(window.scrollY - settledAt) <= UNMOVED_TOLERANCE) jump();
  };
}
