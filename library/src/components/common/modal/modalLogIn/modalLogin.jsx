import classNames from "classnames";
import { useState } from "react";
import close from "../../../../../public/images/close_btn.svg";
import { useAppContext } from "../../../../contexts/useAppContext";
import { CustomButton } from "../../customButton/customButton";
import styles from "./modalLogin.module.scss";

export const ModalLogin = () => {
  const [loginUserProfile, setLoginUserProfile] = useState("");
  const { key, setKey, openModalRegister, closeLogIn } = useAppContext();


  const loginForm = (e) => {
    e.preventDefault();

    for (let i in users) {
      if (
        users[i].email === emailLoginForm &&
        users[i].password === passwordLoginForm
      ) {
        setLoginUserProfile(users[i]);
        setopenLogIn(false);
        setProfileReged(true);
        setUserRegistered(true);
      }
    }
  };

  return (
    <form
      className={
        key.openLogIn
          ? classNames(styles.modalLogInWrap, styles.regandlogform)
          : styles.modalLogInWrapClose
      }
      onSubmit={loginForm}>
      <h3>LOGIN</h3>
      <img src={close} onClick={() => closeLogIn()} />
      <div className={styles.regandlogform__form}>
        <label htmlFor="email">E-mail or readers card</label>
        <input
          type="email"
          id="email"
          onChange={(e) =>
            setKey((pre) => ({ ...pre, emailLoginForm: e.target.value }))
          }
          value={key.emailLoginForm}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) =>
            setKey((pre) => ({ ...pre, passwordLoginForm: e.target.value }))
          }
          value={key.passwordLoginForm}
        />
        <CustomButton type="submit" color="modalBtn">
          Log In
        </CustomButton>
        <p>
          Don`t have an account?{" "}
          <a href="#" onClick={() => openModalRegister()}>
            Register
          </a>
        </p>
      </div>
    </form>
  );
};
