import type { Meta, StoryObj } from '@storybook/react-vite';
import { Period } from './Period';

const meta = {
  title: 'Components/Period',
  component: Period,
  args: {
    start: { label: 'July 2023', iso: '2023-07' },
    end: { label: 'Present' },
    location: 'Israel, Remote',
  },
} satisfies Meta<typeof Period>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDuration: Story = { args: { showDuration: true } };

export const Finished: Story = {
  args: {
    start: { label: 'September 2020', iso: '2020-09' },
    end: { label: 'December 2021', iso: '2021-12' },
    location: 'Kharkiv, Ukraine',
    showDuration: true,
  },
};
