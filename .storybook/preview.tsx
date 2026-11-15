import type { Decorator, Preview } from '@storybook/react-vite';
import '../src/styles/global.css';
import { NEW_TAB_HINT_ID } from '../src/styles/hints';
import { lightTheme, vars } from '../src/styles/theme.css';

const PADDING = 24;

const withTheme: Decorator = (Story, { globals, parameters }) => (
  <div
    className={globals.theme === 'light' ? lightTheme : undefined}
    style={{
      minHeight: '100vh',
      padding: parameters.padded === false ? 0 : PADDING,
      background: vars.color.bg,
      color: vars.color.text,
    }}
  >
    <span id={NEW_TAB_HINT_ID} hidden>
      Opens in a new tab
    </span>
    <Story />
  </div>
);

const viewport = (name: string, width: number, height: number) => ({
  name,
  styles: { width: `${width}px`, height: `${height}px` },
});

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Colour theme',
      toolbar: {
        title: 'Theme',
        icon: 'contrast',
        items: [
          { value: 'dark', title: 'Dark' },
          { value: 'light', title: 'Light' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'dark' },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      options: {
        mobile: viewport('Mobile 375', 375, 812),
        tablet: viewport('Tablet 768', 768, 1024),
        laptop: viewport('Laptop 992', 992, 800),
        desktop: viewport('Desktop 1440', 1440, 900),
      },
    },
    a11y: { test: 'todo' },
  },
};

export default preview;
