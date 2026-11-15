import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../Text';
import { Card } from './Card';

const meta: Meta = {
  title: 'UI/Card',
  component: Card,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Card maxWidth={360}>
      <Text variant="eyebrow">Languages</Text>
      <Text marginTop="3">English (B2, Upper Intermediate)</Text>
    </Card>
  ),
};

export const AsListItem: Story = {
  render: () => (
    <ul>
      <Card as="li" maxWidth={360}>
        <Text variant="title">React.JS Developer</Text>
        <Text variant="meta">One Roadmap, 2026</Text>
      </Card>
    </ul>
  ),
};
