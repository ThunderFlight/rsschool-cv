import classNames from "classnames";
import { useContext, useState } from "react";
import close from "../../../../../public/images/close_btn.svg";
import { useAppContext } from "../../../../contexts/useAppContext";
import { CustomButton } from "../../customButton/customButton";
import styles from "./modalLogin.module.scss";
import {useForm} from "react-hook-form"
export const ModalLogin = ({wrap, wrapPos, openState, openModalYouDontHaveAccout, closeLogIn}) => {
  const { key, setKey } = useAppContext();
  const {register, watch, handleSubmit}=useForm({
    defaultValues:{
      email:"",
      password:""
    }
  })
  const loginForm = (data) => {
    for (let i in key.users) {
      if (
        key.users[i].email === data.email &&
        key.users[i].password === data.password
      ) {
        setKey((pre)=>({...pre, loginUserProfile:key.users[i]}));
        setKey((pre) => ({ ...pre, profileReged: true }));
        setKey((pre) => ({ ...pre, userRegisetered: true }));
        closeLogIn()
      }
    }
  }; 

  return (
  <div className={
          openState
          ? classNames(styles[wrapPos],styles[wrap])
          : styles.modalLogInWrapClose
        }>  
    <form 
      className={(styles.regandlogform)}
      onSubmit={handleSubmit((data) => loginForm(data))}>
      <h3 className={styles.regandlogform__title}>LOGIN</h3>
      <img src={close} onClick={() => closeLogIn()} />
      <div className={styles.regandlogform__form}>
        <label htmlFor="email">E-mail or readers card</label>
        <input {...register("email", {required:true, pattern:/[A-z,0-9]+@[a-z]+\.[a-z]+/gi})}/>
        <label htmlFor="password">Password</label>
        <input {...register("password", {required:true, pattern:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}/gi})}/>
        <CustomButton type="submit" color="modalBtn">
          Log In
        </CustomButton>
        <p>
          Don`t have an account?{" "}
          <a href="#" onClick={() => openModalYouDontHaveAccout()}>
            Register
          </a>
        </p>
      </div>
    </form>
  </div>
  );
};
// openModalRegister()