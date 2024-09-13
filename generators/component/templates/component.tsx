import React from 'react';

import styles from './<%= name %>.module.scss';

export type <%= componentName %>Props = {
  label?: string,
}


export function <%= componentName %>({label}: Readonly<<%= componentName %>Props>): React.ReactElement {
  return <div className={ styles._ }>{ label }</div>;
}

// https://reactjs.org/docs/typechecking-with-proptypes.html
<%= componentName %>.defaultProps = {
  label: 'My awesome <%= componentName %> component',
}