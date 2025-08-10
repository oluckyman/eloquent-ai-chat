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
      font: "PT Sans",
      primary: "red",
      primaryHover: "yellow",
      bg: "plum",
      text: "purple",
      textSecondary: "darkblue",
      radius: "0px",
    },
  },
};

export const Mobile: Story = {
  globals: {
    viewport: { value: "mobile1" },
  },
};

export const WithHistory: Story = {
  args: {
    initialMessages: [
      { id: "m1", role: "user", text: "Hello! Can you help me with my project?" },
      {
        id: "m2",
        role: "assistant",
        text: "Of course! I'd be happy to help you with your project. What do you need assistance with?",
      },
      { id: "m3", role: "user", text: "I'm trying to understand how React components work" },
      {
        id: "m4",
        role: "assistant",
        text: "React components are the building blocks of React applications. They're JavaScript functions or classes that return JSX to describe what should appear on the screen. Would you like me to explain functional components or class components first?",
      },
      { id: "m5", role: "user", text: "Functional components please" },
      {
        id: "m6",
        role: "assistant",
        text: "Great choice! Functional components are simpler and more modern. They're just JavaScript functions that take props as arguments and return JSX. Here's a basic example:\n\n```jsx\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}!</h1>;\n}\n```\n\nWith hooks like useState and useEffect, functional components can handle state and lifecycle methods too.",
      },
    ],
  },
};

export const Offline: Story = {
  args: {
    status: "offline",
  },
};

export const Maintenence: Story = {
  args: {
    maintenance: true,
    maintenanceMessage: "Scheduled maintenance until 10:00 AM",
  },
};

export const OpenAI: Story = {
  args: {
    agentUrl: "http://localhost:8787/api/agent",
  },
};
