import React from 'react';

import styles from './<%= name %>.module.scss';

export type <%= componentName %>Props = {
  /** replace this comment with prop's description for documentation */
  label?: string,
}

/** 
  * put description of <%= componentName %> component
  * to allow react-docgen autogenerate the documentation
*/
export const <%= componentName %> = ({ label }: <%= componentName %>Props) => {
  return <div className={ styles._ }>{ label }</div>;
}

// https://reactjs.org/docs/typechecking-with-proptypes.html
<%= componentName %>.defaultProps = {
  label: 'My awesome <%= componentName %> component',
} as <%= componentName %>Props;