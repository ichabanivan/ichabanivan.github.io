import type { Meta, StoryObj } from '@storybook/react-vite';
import { VerifyLink } from './VerifyLink';

const meta = {
  title: 'UI/VerifyLink',
  component: VerifyLink,
  args: { href: 'https://cert.efset.org/cbSU9g' },
} satisfies Meta<typeof VerifyLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCredentialName: Story = {
  args: { credentialName: 'EF SET English Certificate' },
};
