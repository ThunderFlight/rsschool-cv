import { useState } from "react";
import styles from "./modalProfile.module.scss";
import { useAppContext } from "../../../../contexts/useAppContext";
import classNames from "classnames";
import close from "../../../../../public/images/close_btn.svg";
import { Portal } from "../../../../contexts/Portal";
export const ModalProfile = ({
  wrapProfile,
  openProfile,
  closeModalProfile,
}) => {
  const {currentUser } = useAppContext();

  return (
    <Portal htmlLink="nav">
      <div
        className={classNames(
          openProfile ? styles[wrapProfile] : styles.myProfileClose
        )}
      >
        <div className={styles.myProfile}>
          <div className={styles.myProfile__left}>
            <div className={styles.profileAvatar}>
              {currentUser !== null
                ? currentUser.firstName.slice(0, 1).toUpperCase()
                : ""}
              {currentUser !== null
                ? currentUser.lastName.slice(0, 1).toUpperCase()
                : ""}
            </div>
            <div className={styles.profileName}>
              {currentUser !== null ? currentUser.firstName : ""}
              {currentUser !== null ? currentUser.lastName : ""}
            </div>
          </div>
          <div className={styles.myProfile__right}>
            <h3>MY PROFILE</h3>
            <ul>
              <li></li>
            </ul>
            <h4>Rented books</h4>
            <p>
              Card number
              <a>{currentUser !== null ? currentUser.cardNumber : ""}</a>
            </p>
          </div>
          <img src={close} onClick={() => closeModalProfile()} />
        </div>
      </div>
    </Portal>
  );
};
