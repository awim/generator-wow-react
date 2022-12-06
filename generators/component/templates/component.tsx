import React from 'react';

import './<%= name %>.scss';

export interface <%= name %>Props {
  label?: string,
}


export function <%= name %>({label}: <%= name %>Props): React.ReactElement {
  return <div className='<%= className %>'>{ label }</div>;
}

// https://reactjs.org/docs/typechecking-with-proptypes.html
<%= name %>.defaultProps = {
  label: 'My awesome <%= name %> component',
}