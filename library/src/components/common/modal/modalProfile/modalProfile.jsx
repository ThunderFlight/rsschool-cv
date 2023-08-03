import { useState } from "react";
import styles from "./modalProfile.module.scss";
import { useAppContext } from "../../../../contexts/useAppContext";
import classNames from "classnames";
import close from "../../../../../public/images/close_btn.svg";
export const ModalProfile = () => {
  // const [openProfileBool, setOpenProfileBool] = useState(false);
  const {key,closeProfile}=useAppContext()
  
  return (
    <div
      className={classNames(
        key.openProfileBool ? styles.myProfile : styles.myProfileClose
      )}>
      <div className={styles.myProfile__left}>
        <div className={styles.profileAvatar}>
          {key.loginUserProfile.firstName !== undefined
            ? key.loginUserProfile.firstName.slice(0, 1).toUpperCase()
            : "undefined"}
          {key.loginUserProfile.lastName !== undefined
            ? key.loginUserProfile.lastName.slice(0, 1).toUpperCase()
            : "undefined"}
        </div>
        <div className={styles.profileName}>
          {key.loginUserProfile !== undefined
            ? key.loginUserProfile.firstName
            : "undefined"}
          {key.loginUserProfile !== undefined
            ? key.loginUserProfile.lastName
            : "undefined"}
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
            {key.loginUserProfile !== undefined
              ? key.loginUserProfile.cardNumber
              : console.log(key.loginUserProfile)}
          </a>
        </p>
      </div>
      <img src={close} onClick={()=>closeProfile()} />
    </div>
  );
};
