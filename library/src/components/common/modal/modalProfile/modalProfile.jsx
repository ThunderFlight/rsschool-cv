import { useState } from "react";
import styles from "./modalProfile.module.scss";
import { useAppContext } from "../../../../contexts/useAppContext";
import classNames from "classnames";
import close from "../../../../../public/images/close_btn.svg";
export const ModalProfile = ({wrapProfile, openProfile, closeModalProfile}) => {
  const {key}=useAppContext()
  
  return (
  <div className={classNames(
        openProfile ? styles[wrapProfile] : styles.myProfileClose
      )}>
    <div className={styles.myProfile}>
      <div className={styles.myProfile__left}>
        <div className={styles.profileAvatar}>
            {key.userRegisetered ? (key.loginUserProfile.firstName !== undefined ? key.loginUserProfile.firstName.slice(0, 1).toUpperCase():"LOL") : ''}
            {key.userRegisetered ? (key.loginUserProfile.lastName !== undefined ? key.loginUserProfile.lastName.slice(0, 1).toUpperCase():"LOL") : ''}
        </div>
        <div className={styles.profileName}>
          {key.userRegisetered ? (key.loginUserProfile.firstName !== undefined ? key.loginUserProfile.firstName: "LOL" ) : ''}
          {key.userRegisetered ? (key.loginUserProfile.lastName !== undefined ? key.loginUserProfile.lastName: "LOL" ) : ''}
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
          <a>
          {key.userRegisetered ? (key.loginUserProfile.cardNumber !== undefined ? key.loginUserProfile.cardNumber :"LOL"):"undefine"}
          </a>
        </p>
      </div>
      <img src={close} onClick={()=>closeModalProfile()} />
    </div>
    </div>
  );
};
