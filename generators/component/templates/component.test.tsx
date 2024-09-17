import { render } from '@/test/test-utils';

import { <%= componentName %> } from '../<%= name %>';

describe('<%= componentName %> test render', () => {
  render({ui: <<%= componentName %> />});
})