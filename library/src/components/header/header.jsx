import classNames from "classnames";
import React, { memo, useState } from "react";
import burger from "../../../public/images/burger.svg";
import burgerCross from "../../../public/images/burgerСross.svg";
import profileIcon from "../../../public/images/icon_profile.svg";
import { useAppContext } from "../../hooks/useAppContext";
import ModalLogin from "../common/modals/modalLogIn/modalLogin";
import { ModalProfileNoAuth } from "../common/modals/modalProfileNoAuth/modalProfileNoAuth";
import { ModalRegister } from "../common/modals/modalRegister/modalRegister";
import styles from "./header.module.scss";
import { ModalProfile } from "../common/modals/modalProfile/modalProfile";
import useBoolean from "../../hooks/useBoolean";

export const Header = memo(({ headerWidth }) => {
  const { currentUser, logOut } = useAppContext();

  const {value: isBurger, setFalse: setBurgerFalse, setValue: setBurgerPrev}=useBoolean()
  const burgerPrev = () => setBurgerPrev((prev)=>!prev)
  
  const {value: isDropMenuNoAuth, setFalse: setDropMenuNoAuthFalse, setValue: setDropMenuNoAuthPrev}=useBoolean()
  const dropMenuNoAuthPrev = () => setDropMenuNoAuthPrev((prev)=>!prev)
  
  const {value: isDropMenuAuth, setFalse: setDropMenuAuthFalse, setValue: setDropMenuAuthPrev}=useBoolean()
  const dropMenuAuthPrev = () => setDropMenuAuthPrev((prev)=>!prev)

  const {value: isLogin, setFalse: setLoginFalse, setTrue: setLoginTrue, setValue: setLoginPrev}=useBoolean()
  const loginPrev = () => setLoginPrev((prev)=>!prev)
  
  const {value: isRegister, setFalse: setRegisterFalse, setTrue: setRegisterTrue }=useBoolean()

  const {value: isProfile, setFalse: setProfileFalse, setTrue: setProfileTrue }=useBoolean()

  const {value: isCopied, setFalse: setCopiedFalse, setTrue: setCopiedTrue }=useBoolean()

  const openModalBurger = () => {
    burgerPrev()
    setRegisterFalse()
    setProfileFalse()
    setDropMenuAuthFalse()
    setDropMenuNoAuthFalse()
    setLoginFalse()
  };

  const openModalNoAuth = () => {
    dropMenuNoAuthPrev()
    setBurgerFalse()
    setBurgerFalse();
  };

  const openModalLogIn = () => {
    loginPrev()
    setDropMenuNoAuthFalse()
    setBurgerFalse();
  };

  const openModalYouDontHaveAccout = () => {
    setLoginFalse()
    setRegisterTrue()
    setBurgerFalse();
  };

  const openModalYouHaveAccount = () => {
    setLoginTrue();
    setRegisterFalse()
    setBurgerFalse();
  };

  const openModalRegister = () => {
    setRegisterTrue()
    setDropMenuNoAuthFalse()
    setBurgerFalse();
  };

  const openModalAuth = () => {
    dropMenuAuthPrev()
    setBurgerFalse();
  };

  const openModalProfile = () => {
    setProfileTrue()
    setDropMenuAuthFalse()
    setBurgerFalse();
  };

  const handleLogOut = () => {
    logOut();
    setDropMenuAuthFalse()
  };
  
  const copyCardNumber = () => {
    setCopiedTrue();
    navigator.clipboard.writeText(currentUser.cardNumber);
    setTimeout(()=>{
      setCopiedFalse();
    },1000)
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <h1 className={styles.headerWrapper__headerTitle}>
          Brooklyn Public Library
        </h1>
        <nav className={styles.headerWrapper__nav}>
          <ul
            className={classNames(
              headerWidth
                ? isBurger
                  ? styles.list
                  : styles.closeList
                : styles.list
            )}
          >
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
          {currentUser ? (
            <div
              onClick={() => openModalAuth()}
              className={styles.headerWrapper__avatar}
            >
              {currentUser.firstName.slice(0, 1).toUpperCase()}
              {currentUser.lastName.slice(0, 1).toUpperCase()}
            </div>
          ) : (
            <img
              src={profileIcon}
              onClick={() => openModalNoAuth()}
              className={styles.noAvatar}
            />
          )}
          {headerWidth && (
            <img
              src={isBurger ? burgerCross : burger}
              className={styles.burgerImg}
              onClick={openModalBurger}
            />
          )}
          <ModalProfileNoAuth isOpenNoAuth={!currentUser ? isDropMenuNoAuth : isDropMenuAuth}>
            {!currentUser ? (
              <>
                <button onClick={openModalLogIn}>Log In</button>
                <button onClick={openModalRegister}>Register</button>
              </>
            ) : (
              <>
                <button onClick={openModalProfile}>My Profile</button>
                <button onClick={handleLogOut}>Log Out</button>
              </>
            )}
          </ModalProfileNoAuth>
          <ModalLogin
            wrap="wrapHeader"
            wrapPos="modalLogInWrap"
            openState={isLogin}
            openModalYouDontHaveAccout={openModalYouDontHaveAccout}
            closeLogIn={setLoginFalse}
          />
          <ModalRegister
            regWrap="headerRegWrap"
            regWrapPos="modalRegisterWrap"
            openRegState={isRegister}
            openModalYouHaveAccount={openModalYouHaveAccount}
            closeModalRegister={setRegisterFalse}
          />

          <ModalProfile
            wrapProfile="wrapHeaderMyProfile"
            openProfile={isProfile}
            closeModalProfile={setProfileFalse}
            copyCardNumber={copyCardNumber}
            isCopied={isCopied}
          />
        </nav>
      </div>
    </header>
  );
});
