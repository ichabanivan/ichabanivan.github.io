const FALLBACK_MS = 3000;

export function afterPaint(callback: () => void): void {
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    callback();
  };

  const supported =
    typeof PerformanceObserver !== 'undefined' &&
    PerformanceObserver.supportedEntryTypes?.includes('paint');
  if (!supported || document.visibilityState === 'hidden') {
    run();
    return;
  }

  const observer = new PerformanceObserver((list) => {
    if (!list.getEntriesByName('first-contentful-paint').length) return;
    observer.disconnect();
    run();
  });
  observer.observe({ type: 'paint', buffered: true });
  setTimeout(() => {
    observer.disconnect();
    run();
  }, FALLBACK_MS);
}
