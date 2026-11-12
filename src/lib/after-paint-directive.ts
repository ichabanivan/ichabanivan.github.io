import type { ClientDirective } from 'astro';
import { afterPaint } from './after-paint';

declare global {
  namespace Astro {
    interface ClientDirectives {
      'client:afterpaint'?: boolean;
    }
  }
}

const afterPaintDirective: ClientDirective = (load) => {
  const hydrate = async () => {
    const run = await load();
    await run();
  };
  afterPaint(() => {
    if ('requestIdleCallback' in window) window.requestIdleCallback(hydrate);
    else setTimeout(hydrate, 200);
  });
};

export default afterPaintDirective;
