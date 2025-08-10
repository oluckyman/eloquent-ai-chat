import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { EloquentChat } from "./EloquentChat";

const meta: Meta<typeof EloquentChat> = {
  component: EloquentChat,
  args: {},
};
export default meta;

type Story = StoryObj<typeof EloquentChat>;

export const Default: Story = {};

export const UncontrolledClosed: Story = {
  args: {
    defaultOpen: false,
  },
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
  args: {
    theme: {
      font: "Monaco",
      primary: "red",
      primaryHover: "yellow",
      bg: "plum",
      text: "purple",
      radius: "1px",
    },
  },
};

export const Mobile: Story = {
  globals: {
    viewport: { value: "mobile1" },
  },
};
