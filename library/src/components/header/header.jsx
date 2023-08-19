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
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const [isOpenNoAuth,setIsOpenNoAuth] = useState(false);
  const [isOpenLogin,setOpenLogin]=useState(false);
  const [isOpenRegister,setIsOpenRegister]=useState(false);
  const [isOpenAuth, setIsOpenAuth] = useState(false)
  const [isOpenProfile,setIsOpenProfile]=useState(false)
  const {key, setKey} = useAppContext();

  const mechanismBurger = () => {
    setIsOpenBurger(!isOpenBurger);
    setIsOpenRegister(false);
    setIsOpenProfile(false);
    setIsOpenAuth(false);
    setIsOpenNoAuth(false);
    setOpenLogin(false);
  };
  
  const openModalNoAuth = () => {
    setIsOpenNoAuth(!isOpenNoAuth);
    setIsOpenBurger(false);
     setIsOpenBurger(false);
  }

  const openModalLogIn = () => {
    setOpenLogin(!isOpenLogin);
    setIsOpenNoAuth(false);
     setIsOpenBurger(false);
  }
  
  const openModalYouDontHaveAccout = () => {
    setOpenLogin(false);
    setIsOpenRegister(true);
     setIsOpenBurger(false);
  }

  const openModalYouHaveAccount = () => {
    setOpenLogin(true);
    setIsOpenRegister(false);
     setIsOpenBurger(false);
  }

  const openModalRegister = () => {
    setIsOpenRegister(true);
    setIsOpenNoAuth(false);
     setIsOpenBurger(false);
  }

  const closeModalRegister = () =>{
    setIsOpenRegister(false);
  }

  const closeLogIn = () => {
    setOpenLogin(false);
  }

  const openModalAuth = () => {
    setIsOpenAuth(!isOpenAuth);
     setIsOpenBurger(false);
  } 

  const openModalProfile = () => {
    setIsOpenProfile(true);
    setIsOpenAuth(false);
     setIsOpenBurger(false);
  };

  const closeModalProfile = () => {
    setIsOpenProfile(false)
  }

  const logOut = () => {
    setKey((pre) =>({...pre,profileReged:false}))
    setKey((pre) => ({ ...pre, userRegisetered: false }));
    setIsOpenAuth(false)
  }

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
                onClick={()=>openModalAuth() }
                className={styles.headerWrapper__avatar}>
                {key.userRegisetered ? (key.loginUserProfile.firstName !== undefined ? key.loginUserProfile.firstName.slice(0, 1).toUpperCase():'') : ''}
                {key.userRegisetered ? (key.loginUserProfile.lastName !== undefined ? key.loginUserProfile.lastName.slice(0, 1).toUpperCase():'') : ''}
              </div>
            ) : (
              <img
                src={profileIcon}
                onClick={() =>
                  openModalNoAuth()
                }
                className={styles.noAvatar}
              />
            )}
            {headerWith ? (
              <img
                src={isOpenBurger ? burgerCross : burger}
                className={styles.burgerImg}
                onClick={mechanismBurger}
              />
            ) : (
              <></>
            )}
            <div
              className={classNames(
                isOpenBurger ? styles.burgerMenuTrue : styles.burgerMenuFalse
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
            <ModalProfileNoAuth isOpenNoAuth={isOpenNoAuth} openModalLogIn={openModalLogIn} openModalRegister={openModalRegister}/>
            <ModalLogin wrap="wrapHeader" wrapPos="modalLogInWrap"  openState={isOpenLogin} openModalYouDontHaveAccout={openModalYouDontHaveAccout} closeLogIn={closeLogIn}/>
            <ModalRegister regWrap="headerRegWrap" regWrapPos="modalRegisterWrap" openRegState={isOpenRegister} openModalYouHaveAccount={openModalYouHaveAccount} closeModalRegister={closeModalRegister}/>
            <ModalProfileAuth isOpenAuth={isOpenAuth} openModalProfile={openModalProfile} logOut={logOut}/>
            <ModalProfile wrapProfile="wrapHeaderMyProfile" openProfile={isOpenProfile} closeModalProfile={closeModalProfile}/>
          </nav>
        </div>
      </header>
  );
};