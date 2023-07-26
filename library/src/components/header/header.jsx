import classNames from "classnames";
import { useEffect, useState } from "react";
import { uid } from "uid";
import burger from "../../../public/images/burger.svg";
import burgerCross from "../../../public/images/burgerСross.svg";
import close from "../../../public/images/close_btn.svg";
import profileIcon from "../../../public/images/icon_profile.svg";
import { CustomButton } from "../common/h2Title/customButton/customButton";
import styles from "./header.module.scss";
export const Header = ({ headerWith }) => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [openLogIn, setopenLogIn] = useState(false);
  const [openRegister, setopenRegister] = useState(false);
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cardNumber: uid(),
  });
  const [validForm, setValidForm] = useState({
    validFirstName: false,
    validLastName: false,
    validEmail: false,
    validPassword: false,
  });
  const [emailLoginForm, setEmailLoginForm] = useState("");
  const [passwordLoginForm, setPasswordLoginForm] = useState("");
  const [userRegisetered, setUserRegistered] = useState(false);
  const [profileReged, setProfileReged] = useState(false);
  const [openProfileBool, setOpenProfileBool] = useState(false);
  const [loginUserProfile, setLoginUserProfile] = useState("");
  const [openBurger, setOpenBurger] = useState(false);
  const mechanismBurger = () => {
    setOpenBurger(!openBurger);
    setOpen(false);
    setProfileReged(false);
    setopenRegister(false);
    setopenLogIn(false);
  };
  const logOut = () => {
    setOpen(true);
    setProfileReged(false);

    setUserRegistered(false);
  };
  const openModalRegister = () => {
    setopenRegister(true);
    setopenLogIn(false);
    setOpen(false);
    setOpenBurger(false);
  };
  const openModalNoReg = () => {
    if (openLogIn === true || openRegister == true) {
      setOpen(false);
    } else {
      setOpen(!open);
    }
    setOpenBurger(false);
  };
  const openModalReg = () => {
    if (openProfileBool) {
      setProfileReged(false);
    } else {
      setProfileReged(!profileReged);
    }
    setOpen(false);
    setOpenBurger(false);
  };
  const openProfile = () => {
    setOpenProfileBool(true);
    setProfileReged(false);
  };
  const closeProfile = () => {
    setOpenProfileBool(false);
  };
  const openModalLogIn = () => {
    setopenLogIn(true);
    setOpen(false);
    setopenRegister(false);
    setOpenBurger(false);
  };
  const closeLogIn = () => {
    setopenLogIn(false);
  };
  const closeRegister = () => {
    setopenRegister(false);
  };
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
  const registerUserObj = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value, id: uid() });
    let NamesReg = /[0-9]+/gi;
    let emailReg = /[A-z,0-9]+@[a-z]+\.[a-z]+/gi;
    let passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}/gi;
    if (
      userForm.firstName !== "" &&
      NamesReg.test(userForm.firstName) === false
    ) {
      setValidForm((pre) => ({ ...pre, validFirstName: true }));
    } else {
      setValidForm((pre) => ({ ...pre, validFirstName: false }));
    }
    if (
      userForm.lastName !== "" &&
      NamesReg.test(userForm.lastName) === false
    ) {
      setValidForm((pre) => ({ ...pre, validLastName: true }));
    } else {
      setValidForm((pre) => ({ ...pre, validLastName: true }));
    }
    if (userForm.email !== "" && emailReg.test(userForm.email) === true) {
      setValidForm((pre) => ({ ...pre, validEmail: true }));
    } else {
      setValidForm((pre) => ({ ...pre, validEmail: true }));
    }
    if (
      userForm.password !== "" &&
      passwordReg.test(userForm.password) === false
    ) {
      // users.filter((item) => {
      //   console.log(item.password);
      //   console.log(userForm.password);
      //   if (item.password === userForm.password) {
      //     console.log("false");
      //     setPassword(false);
      //   } else {
      //     setPassword(true);
      //   }
      // });
      setValidForm((pre) => ({ ...pre, validPassword: true }));
    } else {
      setValidForm((pre) => ({ ...pre, validPassword: true }));
    }
  };
  const submitUser = (e) => {
    e.preventDefault();

    if (
      validForm.validPassword &&
      validForm.validEmail &&
      validForm.validFirstName &&
      validForm.validLastName
    ) {
      setUsers((prev) => [...prev, userForm]);

      setUserForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      setopenRegister(false);
      setUserRegistered(true);
    }
  };

  useEffect(() => {
    const profileText = JSON.parse(localStorage.getItem("loginUserProfile"));
    const profileRegedD = localStorage.getItem("profileReged");
    const bolleaon = localStorage.getItem("registered");
    const items = JSON.parse(localStorage.getItem("user"));
    if (items && bolleaon) {
      setProfileReged(JSON.parse(profileRegedD));
      setLoginUserProfile(profileText);

      setUsers(items);
      setUserRegistered(JSON.parse(bolleaon));
    }
  }, []);
  useEffect(() => {
    setProfileReged(false);
  }, []);
  useEffect(() => {
    localStorage.setItem("loginUserProfile", JSON.stringify(loginUserProfile));
    localStorage.setItem("profileReged", profileReged);
    localStorage.setItem("registered", userRegisetered);
    localStorage.setItem("user", JSON.stringify(users));
  }, [users, profileReged, userRegisetered, loginUserProfile]);

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
          {userRegisetered ? (
            <div
              onClick={userRegisetered ? openModalReg : openModalNoReg}
              className={styles.headerWrapper__avatar}>
              {loginUserProfile.firstName !== undefined
                ? loginUserProfile.firstName.slice(0, 1).toUpperCase()
                : "undefined"}
              {loginUserProfile.lastName !== undefined
                ? loginUserProfile.lastName.slice(0, 1).toUpperCase()
                : "undefined"}
            </div>
          ) : (
            <img
              src={profileIcon}
              onClick={userRegisetered ? openModalReg : openModalNoReg}
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
          <div
            className={classNames(
              open ? styles.modalChooseOpened : styles.modalChooseClosed
            )}>
            <h3>Profile</h3>
            <div></div>
            <p onClick={openModalLogIn}>Log In</p>
            <p onClick={openModalRegister}>Register</p>
          </div>

          <div
            className={classNames(
              profileReged
                ? styles.modalChooseRegisterOpened
                : styles.modalChooseClosed
            )}>
            <h3>Profile</h3>
            <div></div>
            <p onClick={openProfile}>My Profile</p>
            <p onClick={logOut}>Log Out</p>
          </div>

          <div
            className={classNames(
              openProfileBool ? styles.myProfile : styles.myProfileClose
            )}>
            <div className={styles.myProfile__left}>
              <div className={styles.profileAvatar}>
                {loginUserProfile.firstName !== undefined
                  ? loginUserProfile.firstName.slice(0, 1).toUpperCase()
                  : "undefined"}
                {loginUserProfile.lastName !== undefined
                  ? loginUserProfile.lastName.slice(0, 1).toUpperCase()
                  : "undefined"}
              </div>
              <div className={styles.profileName}>
                {loginUserProfile !== undefined
                  ? loginUserProfile.firstName
                  : "undefined"}
                {loginUserProfile !== undefined
                  ? loginUserProfile.lastName
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
                  {loginUserProfile !== undefined
                    ? loginUserProfile.cardNumber
                    : console.log(loginUserProfile)}
                </a>
              </p>
            </div>
            <img src={close} onClick={closeProfile} />
          </div>

          <form
            className={
              openLogIn
                ? classNames(styles.modalLogInWrap, styles.regandlogform)
                : styles.modalLogInWrapClose
            }
            onSubmit={loginForm}>
            <h3>LOGIN</h3>
            <img src={close} onClick={closeLogIn} />
            <div className={styles.regandlogform__form}>
              <label htmlFor="email">E-mail or readers card</label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmailLoginForm(e.target.value)}
                value={emailLoginForm}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPasswordLoginForm(e.target.value)}
                value={passwordLoginForm}
              />
              <CustomButton type="submit" color="modalBtn">
                Log In
              </CustomButton>
              <p>
                Don`t have an account?{" "}
                <a href="#" onClick={openModalRegister}>
                  Register
                </a>
              </p>
            </div>
          </form>
          <form
            className={
              openRegister
                ? classNames(styles.modalRegisterWrap, styles.regandlogform)
                : styles.modalRegisterWrapClose
            }
            onSubmit={submitUser}>
            <h3>REGISTER</h3>
            <img src={close} onClick={closeRegister} />
            <div className={styles.regandlogform__form}>
              <label htmlFor="fname">First name</label>
              <input
                type="text"
                id="fname"
                name="firstName"
                onChange={registerUserObj}
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
                onChange={registerUserObj}
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
                onChange={registerUserObj}
                name="email"
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
                onChange={registerUserObj}
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
                <a href="#" onClick={openModalLogIn}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </nav>
      </div>
    </header>
  );
};
