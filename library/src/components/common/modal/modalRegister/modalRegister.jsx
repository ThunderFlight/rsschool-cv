import classNames from "classnames";
import close from "../../../../../public/images/close_btn.svg";
import { useAppContext } from "../../../../contexts/useAppContext";
import { CustomButton } from "../../customButton/customButton";
import styles from "./modalRegister.module.scss";
export const ModalRegister = () => {
  const {
    key,
    setKey,
    closeRegister,
    openModalLogIn,
    submitUser,
    registerUserObj,
  } = useAppContext();

  // useEffect(() => {
  //   const profileText = JSON.parse(localStorage.getItem("loginUserProfile"));
  //   const profileRegedD = localStorage.getItem("profileReged");
  //   const bolleaon = localStorage.getItem("registered");
  //   const items = JSON.parse(localStorage.getItem("user"));
  //   if (items && bolleaon) {
  //     setProfileReged(JSON.parse(profileRegedD));
  //     setLoginUserProfile(profileText);

  //     setUsers(items);
  //     setUserRegistered(JSON.parse(bolleaon));
  //   }
  // }, []);

  // useEffect(() => {
  //   setProfileReged(false);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("loginUserProfile", JSON.stringify(loginUserProfile));
  //   localStorage.setItem("profileReged", profileReged);
  //   localStorage.setItem("registered", userRegisetered);
  //   localStorage.setItem("user", JSON.stringify(users));
  // }, [users, profileReged, userRegisetered, loginUserProfile]);
  console.log(key.userForm);
  return (
    <form
      className={
        key.openRegister
          ? classNames(styles.modalRegisterWrap, styles.regandlogform)
          : styles.modalRegisterWrapClose
      }
      onSubmit={(e) => submitUser(e)}>
      <h3>REGISTER</h3>
      <img src={close} onClick={() => closeRegister()} />
      <div className={styles.regandlogform__form}>
        <label htmlFor="fname">First name</label>
        <input
          type="text"
          id="fname"
          name="firstName"
          onChange={(e) => registerUserObj(e)}
          value={key.userForm.firstName}
          className={classNames(
            key.validForm.validFirstName
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
          value={key.userForm.lastName}
          className={classNames(
            key.validForm.validLastName
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
          pattern="[A-z,0-9]+@[a-z]+\.[a-z]+"
          value={key.userForm.email}
          className={classNames(
            key.validForm.validEmail
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
          value={key.userForm.password}
          className={classNames(
            key.validForm.validPassword
              ? styles.validFirstName
              : styles.invalidFirstName
          )}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}"
          maxLength="8"
          title={
            key.validForm.validPassword
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
          <a href="#" onClick={() => openModalLogIn()}>
            Login
          </a>
        </p>
      </div>
    </form>
  );
};
