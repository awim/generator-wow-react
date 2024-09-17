import React from 'react';
import { Meta, StoryObj } from "@storybook/react";

import { <%= componentName %> } from '<%= relativePath %>';


const meta: Meta<typeof <%= componentName %>> = {
  component: <%= componentName %>,
  title: '<%= project %>/<%= componentName %>',
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "Displays an image that represents a component of <%= componentName %>", // <-- change this subtitle with your documentation
  },
  argTypes: {},
  
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '<%= componentName %>',
  }
};