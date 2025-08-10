import type { Meta, StoryObj } from "@storybook/react";
import { EloquentChat } from "./EloquentChat";

const meta: Meta<typeof EloquentChat> = {
  title: "EloquentChat",
  component: EloquentChat,
  args: { title: "Eloquent Chat" },
};
export default meta;

type Story = StoryObj<typeof EloquentChat>;

export const Default: Story = {
  render: (args) => <EloquentChat {...args} />,
};

export const Closed: Story = {
  render: (args) => <EloquentChat {...args} defaultOpen={false} />,
};
