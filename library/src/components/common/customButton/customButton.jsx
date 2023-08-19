import classNames from "classnames";
import styles from "./customButton.module.scss";
export const CustomButton = ({ color, children, ...props}) => {
  return (
    <button className={classNames(styles.customBtn, styles[color])} {...props}>
      {children}
    </button>
  );
};
