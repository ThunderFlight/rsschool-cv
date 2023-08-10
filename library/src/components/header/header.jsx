import classNames from "classnames";
import React, { useState } from "react";
import burger from "../../../public/images/burger.svg";
import burgerCross from "../../../public/images/burgerСross.svg";
import profileIcon from "../../../public/images/icon_profile.svg";
import { useAppContext } from "../../contexts/useAppContext";
import { ModalLogin } from "../common/modal/modalLogIn/modalLogin";
import { ModalProfileNoAuth } from "../common/modal/modalProfileNoAuth/modalProfileNoAuth";
import { ModalRegister } from "../common/modal/modalRegister/modalRegister";
import styles from "./header.module.scss";
import { ModalProfileAuth } from "../common/modal/modalProfileAuth/modalProfileAuth";
import { ModalProfile } from "../common/modal/modalProfile/modalProfile";

export const Header = ({ headerWith }) => {
  const [openBurger, setOpenBurger] = useState(false);

  const { key, openModalNoReg, openModalReg } = useAppContext();

  const mechanismBurger = () => {
    setOpenBurger(!openBurger);
    setOpen(false);
    setProfileReged(false);
    setopenRegister(false);
    setopenLogIn(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <h1 className={styles.headerWrapper__headerTitle}>
          Brooklyn Public Library
        </h1>
        <nav className={styles.headerWrapper__nav}>
          <ul className={styles.list}>
            <li>
              <a href="#carousel">About</a>
            </li>
            <li>
              <a href="#favorites">Favorites</a>
            </li>
            <li>
              <a href="#coffeeShop">Coffee shop</a>
            </li>
            <li>
              <a href="#ourContacts">Contacts</a>
            </li>
            <li>
              <a href="#digitalLibraryCards">Library Card</a>
            </li>
            <div className={styles.dot}></div>
          </ul>
          {key.userRegisetered ? (
            <div
              onClick={()=>openModalReg() }
              className={styles.headerWrapper__avatar}>
         {key.profileLofinReg
            ? (key.loginUserProfile.firstName.slice(0, 1).toUpperCase() !==undefined ? key.loginUserProfile.firstName.slice(0, 1).toUpperCase():"undefined" )
            : key.registerUserProfile.firstName !== undefined 
            ? key.registerUserProfile.firstName.slice(0, 1).toUpperCase() 
            :"undefine"}
          {key.profileLofinReg
            ? (key.loginUserProfile.firstName.slice(0, 1).toUpperCase() !==undefined ? key.loginUserProfile.lastName.slice(0, 1).toUpperCase():"undefined" )
            : key.registerUserProfile.lastName !== undefined 
            ? key.registerUserProfile.lastName.slice(0, 1).toUpperCase() 
            :"undefine"}
            </div>
          ) : (
            <img
              src={profileIcon}
              onClick={() =>
                openModalNoReg()
              }
              className={styles.noAvatar}
            />
          )}
          {headerWith ? (
            <img
              src={openBurger ? burgerCross : burger}
              className={styles.burgerImg}
              onClick={mechanismBurger}
            />
          ) : (
            <></>
          )}
          <div
            className={classNames(
              openBurger ? styles.burgerMenuTrue : styles.burgerMenuFalse
            )}>
            <ul className={styles.burgerList}>
              <li>
                <a href="#carousel" onClick={mechanismBurger}>
                  About
                </a>
              </li>
              <li>
                <a href="#favorites" onClick={mechanismBurger}>
                  Favorites
                </a>
              </li>
              <li>
                <a href="#coffeeShop" onClick={mechanismBurger}>
                  Coffee shop
                </a>
              </li>
              <li>
                <a href="#ourContacts" onClick={mechanismBurger}>
                  Contacts
                </a>
              </li>
              <li>
                <a href="#digitalLibraryCards" onClick={mechanismBurger}>
                  Library Card
                </a>
              </li>
            </ul>
          </div>
          <ModalProfileNoAuth />
          <ModalLogin />
          <ModalRegister />
          <ModalProfileAuth/>
          <ModalProfile/>
        </nav>
      </div>
    </header>
  );
};
