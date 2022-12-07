import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {<%= name %>, <%= name %>Props} from '../<%= name %>';


const <%= name %>Story = {
  title: '<%= project %>/<%= name %>',
  component: <%= name %>,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof <%= name %>> = ({...args}: <%= name %>Props ) => <<%= name %> {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  label: 'Primary',
};

export const Alternative = Template.bind({});
Alternative.args = {
  label: 'Alternative',
};

export default <%= name %>Story;