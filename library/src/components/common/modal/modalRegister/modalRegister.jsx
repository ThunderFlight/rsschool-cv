import classNames from "classnames";
import close from "../../../../../public/images/close_btn.svg";
import { useAppContext } from "../../../../contexts/useAppContext";
import { CustomButton } from "../../customButton/customButton";
import styles from "./modalRegister.module.scss";
import { uid } from "uid";
import {useForm} from "react-hook-form";
// import { ErrorMessage } from '@hookform/error-message';

export const ModalRegister = ({regWrapPos, regWrap, openRegState, openModalYouHaveAccount, closeModalRegister}) => {
  const {register, handleSubmit, watch, reset, formState:{errors}} = useForm({
    defaultValues:{
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cardNumber:uid(),
      userId:uid()
    }
  });
  const {key,setKey} = useAppContext();
  console.log(key.users);
  return (
    <div className={openRegState  ? classNames(styles[regWrapPos], styles[regWrap]) : styles.modalRegisterWrapClose}>
      <form className={styles.regandlogform} onSubmit={handleSubmit((data) => {
      setKey((prev) => ({ ...prev,users: [...prev.users, data]}));
      reset();
      closeModalRegister();})
      }>
        <h3 className={styles.regandlogform__title}>REGISTER</h3>
        <img src={close} onClick={() => closeModalRegister()} />
        <div className={styles.regandlogform__form}>
          <label >First name</label>
          <input label="First name" {...register("firstName", {required:true, pattern:/[A-z]+/gi})}/>
          <label >Last name</label>
          <input label="Last name" {...register("lastName", {required:true, pattern:/[A-z]+/gi})}/>
          <label>E-mail</label>
          <input label="E-mail" {...register("email", {required:true, pattern:/[A-z,0-9]+@[a-z]+\.[a-z]+/gi})}/>
          <label>Password</label>
          <input label="Password" {...register("password", {required:true, pattern:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}/gi})}/>
          <CustomButton type="submit" color="modalBtn">
            Sign Up
          </CustomButton>
          <p>
            Already have an account?
            <a onClick={() => openModalYouHaveAccount()}>
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};
// openModalLogIn()

{/* <form
      className={styles.regandlogform}
      onSubmit={(e) => {submitUser(e) }}>
      <h3 className={styles.regandlogform__title}>REGISTER</h3>
      <img src={close} onClick={() => closeModalRegister()} />
      <div className={styles.regandlogform__form}>
        <label htmlFor="fname">First name</label>
        <input
          type="text"
          id="fname"
          name="firstName"
          onChange={(e) => registerUserObj(e)}
          value={userForm.firstName}
          className={classNames(
            validForm.validFirstName
              ? styles.validFirstName
              : styles.invalidFirstName
          )}
          required
        />
        <label htmlFor="lname">Last name</label>
        <input
          type="text"
          id="lname"
          onChange={(e) => registerUserObj(e)}
          name="lastName"
          value={userForm.lastName}
          className={classNames(
            validForm.validLastName
              ? styles.validFirstName
              : styles.invalidFirstName
          )}
          required
        />
        <label htmlFor="emailReg">E-mail</label>
        <input
          type="email"
          id="emailReg"
          onChange={(e) => registerUserObj(e)}
          name="email"
          // pattern="[A-z,0-9]+@[a-z]+\.[a-z]+"
          value={userForm.email}
          className={classNames(
            validForm.validEmail
              ? styles.validFirstName
              : styles.invalidFirstName
          )}
          required
        />
        <label htmlFor="passwordReg">Password</label>
        <input
          type="text"
          id="passwordReg"
          name="password"
          onChange={(e) => registerUserObj(e)}
          value={userForm.password}
          className={classNames(
            validForm.validPassword
              ? styles.validFirstName
              : styles.invalidFirstName
          )}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}"
          maxLength="8"
          title={
            validForm.validPassword
              ? "Password needs min 1 Uppercase 1 lowercase 1 Number lenght 8-16"
              : "Put another Password"
          }
          required
        />
        <CustomButton type="submit" color="modalBtn">
          Sign Up
        </CustomButton>
        <p>
          Already have an account?{" "}
          <a onClick={() => openModalYouHaveAccount()}>
            Login
          </a>
        </p>
      </div>
    </form> */}