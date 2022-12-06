import React from 'react';

import {<%= name %>} from '../<%= name %>';


export default {
  title: 'WowComponent/<%= name %>',
  component: <%= name %>,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = ({ ...props }) => <<%= name %>  />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  prop: 'Prop Value Primary',
};


export const Alternative = Template.bind({});
Alternative.args = {
    prop: 'Prop Value Alternative',
};


