import classNames from "classnames";
import { useAppContext } from "../../../../contexts/useAppContext";
import styles from "./modalProfileNoAuth.module.scss";
export const ModalProfileNoAuth = ({isOpenNoAuth, openModalRegister, openModalLogIn}) => {
  return (
    <div
      className={classNames(
        isOpenNoAuth ? styles.modalChooseOpened : styles.modalChooseClosed
      )}>
      <h3 className={styles.modalChooseOpened__title}>Profile</h3>
      <div className={styles.modalChooseOpened__titleLine}></div>
      <button className={styles.modalChooseOpened__buttonAutirize} onClick={() => openModalLogIn()}>Log In</button>
      <button className={styles.modalChooseOpened__buttonAutirize} onClick={() => openModalRegister()}>Register</button>
    </div>
  );
};
