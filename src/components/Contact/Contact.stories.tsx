import type { Meta, StoryObj } from '@storybook/react-vite';
import { pageParameters } from '../../stories/parameters';
import { profile } from '../../data/cv';
import { Contact } from './Contact';

const meta = {
  title: 'Components/Contact',
  component: Contact,
  parameters: pageParameters,
  args: { cvHref: profile.cvPdf },
} satisfies Meta<typeof Contact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
