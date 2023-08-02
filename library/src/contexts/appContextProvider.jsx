import { useState } from "react";
import { uid } from "uid";
import { Context } from "./context";
export const Provider = function ({ children }) {
  const [key, setKey] = useState({
    open: false,
    openLogIn: false,
    openRegister: false,
    userRegisetered: false,
    profileReged: false,
    emailLoginForm: "",
    passwordLoginForm: "",
    users: [],
    userForm: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cardNumber: uid(),
    },
    validForm: {
      validFirstName: false,
      validLastName: false,
      validEmail: false,
      validPassword: false,
    },
  });
  console.log(key.userForm);
  const openModalRegister = () => {
    setKey((pre) => ({ ...pre, openRegister: true }));
    setKey((pre) => ({ ...pre, openLogIn: false }));
    setKey((pre) => ({ ...pre, open: false }));

    // setOpenBurger(false);
  };

  const closeRegister = () => {
    setKey((pre) => ({ ...pre, openRegister: false }));
  };

  const submitUser = (e) => {
    e.preventDefault();

    if (
      key.validForm.validPassword &&
      key.validForm.validEmail &&
      key.validForm.validFirstName &&
      key.validForm.validLastName
    ) {
      // setKey((prev) => ({ users: [...prev, key.userForm] }));

      // setKey((pre) => ({
      //   userForm: {
      //     ...pre.userForm,
      //     firstName: "",
      //     lastName: "",
      //     email: "",
      //     password: "",
      //   },
      // }));
      setKey((pre) => ({ ...pre, openRegister: false }));
      setKey((pre) => ({ ...pre, userRegisetered: true }));
    }
  };

  const registerUserObj = (e) => {
    const { name, value } = e.target;
    // console.log(name, " lol ", value);
    setKey((pre) => ({...pre,
      userForm:(prev)=>( {...prev.userForm, [name]: value, id: uid() }),
    }));
    let NamesReg = /[0-9]+/gi;
    let emailReg = /[A-z,0-9]+@[a-z]+\.[a-z]+/gi;
    let passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}/gi;
    if (
      key.userForm.firstName !== "" &&
      NamesReg.test(key.userForm.firstName) === false
    ) {
      setKey((prev) => ({...prev,
        validForm: (pre)=>({...pre.validFirstName,validFirstName: true }),
      }));
    } else {
      setKey((prev) => ({
        validForm: { ...prev.validForm, validFirstName: false },
      }));
    }
    // if (
    //   key.userForm.lastName !== "" &&
    //   NamesReg.test(key.userForm.lastName) === false
    // ) {
    //   setKey((prev) => ({
    //     validForm: { ...prev.validForm, validLastName: true },
    //   }));
    // } else {
    //   setKey((prev) => ({
    //     validForm: { ...prev.validForm, validLastName: false },
    //   }));
    // }
    // if (
    //   key.userForm.email !== "" &&
    //   emailReg.test(key.userForm.email) === true
    // ) {
    //   setKey((prev) => ({
    //     validForm: { ...prev.validForm, validEmail: true },
    //   }));
    // } else {
    //   setKey((prev) => ({
    //     validForm: { ...prev.validForm, validEmail: false },
    //   }));
    // }
    // if (
    //   key.userForm.password !== "" &&
    //   passwordReg.test(key.userForm.password) === false
    // ) {
    //   // users.filter((item) => {
    //   //   console.log(item.password);
    //   //   console.log(userForm.password);
    //   //   if (item.password === userForm.password) {
    //   //     console.log("false");
    //   //     setPassword(false);
    //   //   } else {
    //   //     setPassword(true);
    //   //   }
    //   // });
    //   setKey((prev) => ({
    //     validForm: { ...prev.validForm, validPassword: true },
    //   }));
    // } else {
    //   setKey((prev) => ({
    //     validForm: { ...prev.validForm, validPassword: false },
    //   }));
    // }
  };

  const openModalLogIn = () => {
    setKey((pre) => ({ ...pre, openLogIn: true }));
    setKey((pre) => ({ ...pre, open: false }));
    // setKey({ openModalRegister: false });
    // setOpenBurger(false);
  };

  const closeLogIn = () => {
    setKey((pre) => ({ ...pre, openLogIn: false }));
  };

  const openModalReg = () => {
    // if (openProfileBool) {
    //   setProfileReged(false);
    // } else {
    setKey((pre) => ({ ...pre, profileReged: true }));
    // }
    setKey((pre) => ({ ...pre, open: false }));
    // setOpenBurger(false);
  };

  const openModalNoReg = () => {
    if (key.openLogIn === true || key.openRegister === true) {
      setKey((pre) => ({ ...pre, open: false }));
    } else {
      setKey((pre) => ({ ...pre, open: !key.open }));
    }
    // setOpenBurger(false);
  };

  return (
    <Context.Provider
      value={{
        key,
        setKey,
        openModalRegister,
        openModalLogIn,
        openModalNoReg,
        openModalReg,
        closeLogIn,
        registerUserObj,
        closeRegister,
        submitUser,
      }}>
      {children}
    </Context.Provider>
  );
};
