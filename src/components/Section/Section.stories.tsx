import type { Meta, StoryObj } from '@storybook/react-vite';
import { pageParameters } from '../../stories/parameters';
import { Text } from '../../ui';
import { Section } from './Section';

const meta = {
  title: 'Components/Section',
  component: Section,
  parameters: pageParameters,
  args: {
    id: 'example',
    index: '01',
    title: 'Section title',
    children: <Text variant="lead">Section content goes here.</Text>,
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongTitle: Story = { args: { index: '02', title: 'Professional Experience' } };
