import React, { createElement } from "react";
import styles from "./title.module.scss";

export const Title = ({children, variant = 'h2', variantUnderLine='div', className='title',classNameUnderLine='undreLine'}) => {
  return React.createElement(
    variant,
    {className:styles[className]},
    children,
    createElement(variantUnderLine,{className:styles[classNameUnderLine]})
  );
};

{/* <div className={styles.title}>
      <h2>{children}</h2>
      <div></div>
    </div> */}