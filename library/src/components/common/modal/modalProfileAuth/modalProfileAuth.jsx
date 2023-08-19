
import styles from "./modalProfileAuth.module.scss";
import classNames from "classnames";

export const ModalProfileAuth = ({isOpenAuth, openModalProfile, logOut}) => {
  return (
      <div
        className={classNames(
          isOpenAuth
            ? styles.modalChooseRegisterOpened
            : styles.modalChooseClosed
        )}>
        <h3>Profile</h3>
        <div></div>
        <p onClick={()=>openModalProfile()}>My Profile</p>
        <p onClick={()=>logOut()}>Log Out</p>
      </div>
  );
};
