import classNames from "classnames";
import styles from "./modalProfileNoAuth.module.scss";
import { Portal } from "../../../../contexts/Portal";

export const ModalProfileNoAuth = ({ isOpenNoAuth, isOpenAuth, children }) => {
  return (
    <Portal htmlLink='nav'>
      <div
        className={classNames(
          isOpenNoAuth || isOpenAuth
            ? styles.modalChooseOpened
            : styles.modalChooseClosed
        )}
      >
        <h3>Profile</h3>
        <div></div>
        {children}
      </div>
    </Portal>
  );
};
