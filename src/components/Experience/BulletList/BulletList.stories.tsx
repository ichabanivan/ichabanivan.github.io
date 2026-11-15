import type { Meta, StoryObj } from '@storybook/react-vite';
import { Strong } from '../Strong';
import { BulletList } from './BulletList';

const meta = {
  title: 'Components/Experience/BulletList',
  component: BulletList,
  args: {
    items: [
      { key: 'pnpm', content: 'Migrated the main React monorepo to pnpm.' },
      { key: 'ab', content: 'Run rollout releases and A/B tests.' },
    ],
  },
} satisfies Meta<typeof BulletList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {};

export const RichContent: Story = {
  args: {
    items: [
      {
        key: 'profile',
        content: (
          <>
            <Strong>Buyer Profile</Strong>: standalone React application with a BFF API.
          </>
        ),
      },
    ],
  },
};
