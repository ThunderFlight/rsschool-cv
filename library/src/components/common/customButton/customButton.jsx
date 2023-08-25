import classNames from "classnames";
import styles from "./customButton.module.scss";

const CustomButton = ({ className, children, ...props}) => {
  return (
    <button className={classNames(styles.customBtn, styles[className])} {...props}>
      {children}
    </button>
  );
};

export default CustomButton