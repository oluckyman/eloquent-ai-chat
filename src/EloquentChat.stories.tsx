import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { EloquentChat } from "./EloquentChat";

const meta: Meta<typeof EloquentChat> = {
  title: "EloquentChat",
  component: EloquentChat,
  args: {},
  decorators: [
    (Story) => (
      <div className="eqt-shell">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof EloquentChat>;

export const Default: Story = {
  render: (args) => <EloquentChat {...args} />,
};

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

export const Themed: Story = {
  render: (args) => (
    <EloquentChat
      {...args}
      theme={{
        font: "Monaco",
        primary: "red",
        primaryHover: "yellow",
        bg: "plum",
        text: "purple",
        radius: "1px",
      }}
    />
  ),
};
