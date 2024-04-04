import React from 'react';
import { Meta, StoryObj } from "@storybook/react";

import {<%= name %>, <%= name %>Props} from '../<%= name %>';


const meta: Meta<typeof <%= name %>> = {
  component: <%= name %>,
  title: '/<%= name %>',
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "Displays an image that represents a component of <%= name %>",
  },
  argTypes: {},
  
};
export default meta;


export const Primary = Story = (args) => (
  <<%= name %> {...args} />
)
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  label: 'Primary',
};

export const Alternative = Story = (args) => (
  <<%= name %> {...args} />
)
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Alternative.args = {
  label: 'Alternative',
};
