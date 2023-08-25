import classNames from "classnames";
import React, { memo, useState } from "react";
import burger from "../../../public/images/burger.svg";
import burgerCross from "../../../public/images/burgerСross.svg";
import profileIcon from "../../../public/images/icon_profile.svg";
import { useAppContext } from "../../contexts/useAppContext";
import  ModalLogin  from "../common/modal/modalLogIn/modalLogin";
import { ModalProfileNoAuth } from "../common/modal/modalProfileNoAuth/modalProfileNoAuth";
import { ModalRegister } from "../common/modal/modalRegister/modalRegister";
import styles from "./header.module.scss";
import { ModalProfile } from "../common/modal/modalProfile/modalProfile";

export const Header = memo(({ headerWith }) => {
  const [isOpenBurger, setOpenBurger] = useState(false);
  const [isOpenNoAuth, setOpenNoAuth] = useState(false);
  const [isOpenLogin, setOpenLogin] = useState(false);
  const [isOpenRegister, setOpenRegister] = useState(false);
  const [isOpenAuth, setOpenAuth] = useState(false);
  const [isOpenProfile, setOpenProfile] = useState(false);
  const { currentUser, logOut } = useAppContext();

  const openModalBurger = () => {
    setOpenBurger((prev) => !prev);
    setOpenRegister(false);
    setOpenProfile(false);
    setOpenAuth(false);
    setOpenNoAuth(false);
    setOpenLogin(false);
  };

  const openModalNoAuth = () => {
    setOpenNoAuth((prev) => !prev);
    setOpenBurger(false);
    setOpenBurger(false);
  };

  const openModalLogIn = () => {
    setOpenLogin((prev) => !prev);
    setOpenNoAuth(false);
    setOpenBurger(false);
  };

  const openModalYouDontHaveAccout = () => {
    setOpenLogin(false);
    setOpenRegister(true);
    setOpenBurger(false);
  };

  const openModalYouHaveAccount = () => {
    setOpenLogin(true);
    setOpenRegister(false);
    setOpenBurger(false);
  };

  const openModalRegister = () => {
    setOpenRegister(true);
    setOpenNoAuth(false);
    setOpenBurger(false);
  };

  const closeModalRegister = () => {
    setOpenRegister(false);
  };

  const closeLogIn = () => {
    setOpenLogin(false);
  };

  const openModalAuth = () => {
    setOpenAuth((prev) => !prev);
    setOpenBurger(false);
  };
  const closeModalAuth = () => {
    setOpenAuth(false);
  };
  const openModalProfile = () => {
    setOpenProfile(true);
    setOpenAuth(false);
    setOpenBurger(false);
  };

  const closeModalProfile = () => {
    setOpenProfile(false);
  };

  const handleLogOut = () => {
    logOut();
    closeModalAuth();
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <h1 className={styles.headerWrapper__headerTitle}>
          Brooklyn Public Library
        </h1>
        <nav className={styles.headerWrapper__nav}>
          <ul
            className={classNames(
              headerWith
                ? isOpenBurger
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
          {headerWith && (
            <img
              src={isOpenBurger ? burgerCross : burger}
              className={styles.burgerImg}
              onClick={openModalBurger}
            />
          )}
          <ModalProfileNoAuth isOpenNoAuth={!currentUser ? isOpenNoAuth : isOpenAuth}>
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
            openState={isOpenLogin}
            openModalYouDontHaveAccout={openModalYouDontHaveAccout}
            closeLogIn={closeLogIn}
          />
          <ModalRegister
            regWrap="headerRegWrap"
            regWrapPos="modalRegisterWrap"
            openRegState={isOpenRegister}
            openModalYouHaveAccount={openModalYouHaveAccount}
            closeModalRegister={closeModalRegister}
          />

          <ModalProfile
            wrapProfile="wrapHeaderMyProfile"
            openProfile={isOpenProfile}
            closeModalProfile={closeModalProfile}
          />
        </nav>
      </div>
    </header>
  );
});
