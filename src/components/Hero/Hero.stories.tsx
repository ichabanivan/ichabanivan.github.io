import type { Meta, StoryObj } from '@storybook/react-vite';
import { initHeroStrips } from '../../scripts/hero-strips';
import { photo } from '../../stories/fixtures';
import { mobileViewport, pageParameters } from '../../stories/parameters';
import { withScript } from '../../stories/withScript';
import { Hero } from './Hero';

const meta = {
  title: 'Components/Hero',
  component: Hero,
  decorators: [withScript(initHeroStrips)],
  parameters: {
    ...pageParameters,
    docs: {
      ...pageParameters.docs,
      description: {
        component:
          'The photo strips follow the pointer and shift on scroll when motion is allowed and the pointer is fine.',
      },
    },
  },
  args: { photo },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = { globals: mobileViewport };
