import React from 'react';

import styles from './<%= name %>.module.scss';

export type <%= componentName %>Props = {
  label?: string,
}


export function <%= componentName %>({label}: <%= componentName %>Props): React.ReactElement {
  return <div className='<%= className %>'>{ label }</div>;
}

// https://reactjs.org/docs/typechecking-with-proptypes.html
<%= componentName %>.defaultProps = {
  label: 'My awesome <%= componentName %> component',
}