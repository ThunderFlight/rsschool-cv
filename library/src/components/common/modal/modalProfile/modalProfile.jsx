import { useState } from "react";
import styles from "./modalProfile.module.scss";
import { useAppContext } from "../../../../contexts/useAppContext";
import classNames from "classnames";
import close from "../../../../../public/images/close_btn.svg";
export const ModalProfile = () => {
  const {key,closeProfile}=useAppContext()
  
  return (
    <div
      className={classNames(
        key.openProfileBool ? styles.myProfile : styles.myProfileClose
      )}>
      <div className={styles.myProfile__left}>
        <div className={styles.profileAvatar}>
          {/* {key.profileLofinReg
            ? (key.loginUserProfile.firstName.slice(0, 1).toUpperCase() !==undefined ? key.loginUserProfile.firstName.slice(0, 1).toUpperCase():"undefined" )
            : key.registerUserProfile.firstName !== undefined 
            ? key.registerUserProfile.firstName.slice(0, 1).toUpperCase() 
            :"undefine"}
          {key.profileLofinReg
            ? (key.loginUserProfile.lastName.slice(0, 1).toUpperCase() !==undefined ? key.loginUserProfile.lastName.slice(0, 1).toUpperCase():"undefined" )
            : key.registerUserProfile.lastName !== undefined 
            ? key.registerUserProfile.lastName.slice(0, 1).toUpperCase() 
            :"undefine"} */}
        </div>
        <div className={styles.profileName}>
        {key.profileLofinReg
            ? key.loginUserProfile.firstName
            : key.registerUserProfile !== undefined 
            ? key.registerUserProfile.firstName
            :"undefine"}
           {key.profileLofinReg
            ? key.loginUserProfile.lastName
            : key.registerUserProfile !== undefined 
            ? key.registerUserProfile.lastName 
            :"undefine"}
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
          {key.profileLofinReg
            ? key.loginUserProfile.cardNumber
            : key.registerUserProfile !== undefined 
            ? key.registerUserProfile.cardNumber 
            :"undefine"}
          </a>
        </p>
      </div>
      <img src={close} onClick={()=>closeProfile()} />
    </div>
  );
};
