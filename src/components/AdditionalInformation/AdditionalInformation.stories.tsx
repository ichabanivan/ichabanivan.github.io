import type { Meta, StoryObj } from '@storybook/react-vite';
import { pageParameters } from '../../stories/parameters';
import { AdditionalInformation } from './AdditionalInformation';

const meta = {
  title: 'Components/AdditionalInformation',
  component: AdditionalInformation,
  parameters: pageParameters,
} satisfies Meta<typeof AdditionalInformation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
