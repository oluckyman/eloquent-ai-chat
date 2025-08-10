import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { EloquentChat } from "./EloquentChat";

const meta: Meta<typeof EloquentChat> = {
  title: "EloquentChat",
  component: EloquentChat,
  args: { title: "Eloquent Chat" },
};
export default meta;

type Story = StoryObj<typeof EloquentChat>;

export const UncontrolledClosed: Story = {
  render: (args) => <EloquentChat {...args} defaultOpen={false} />,
};

export const ControlledClosed: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleToggle = () => {
      setIsOpen((open) => !open);
    };

    return <EloquentChat {...args} open={isOpen} onToggle={handleToggle} />;
  },
};
