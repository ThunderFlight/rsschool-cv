import classNames from "classnames";
import styles from "./customButton.module.scss";

const CustomButton = ({ className, children, isDisabled=false, ...props}) => {
  return (
    <button disabled={isDisabled} className={classNames(styles.customBtn, styles[className])} {...props}>
      {children}
    </button>
  );
};

export default CustomButton