import type { Meta, StoryObj } from '@storybook/react-vite';
import { profile } from '../../data/cv';
import { initHeader } from '../../scripts/header';
import { mobileViewport, pageParameters } from '../../stories/parameters';
import { withScript } from '../../stories/withScript';
import { Header } from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  decorators: [withScript(initHeader)],
  parameters: {
    ...pageParameters,
    docs: {
      ...pageParameters.docs,
      description: {
        component:
          'Fixed site header. Below the lg breakpoint the navigation collapses behind the menu button.',
      },
    },
  },
  args: { cvHref: profile.cvPdf },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};

export const Mobile: Story = { globals: mobileViewport };
