import { useEffect, useState, useMemo} from "react";
import { Context } from "./context";
export const Provider = function ({ children }) {
  const [key, setKey] = useState({
    userRegisetered: false,
    loginUserProfile:"",
    users: [],
    isDigitDataTrue:false,
    isOpenModalLogin:false,
    isOpenModalRegister:false,
    isOpenModalProfile:false,
    digitName:"",
    digitCard:'',
  });

  const openDigitProfile =()=>{
    setKey((pre)=>({...pre, isOpenModalProfile:true}))
  }
  const openDigitModalRegister = () => {
    setKey((pre) => ({...pre,isOpenModalRegister:true}))
  }
  const openDigitModalLogin = () => {
    setKey((pre) => ({ ...pre,isOpenModalLogin:true}))
  }



  
  const digitSubmit = (e) => {
    e.preventDefault();
    let a = key.digitName.split(' ');
    for (let k in key.users) {
      if (key.digitCard === key.users[k].cardNumber && a[0] === key.users[k].firstName && a[1] === key.users[k].lastName){
        setKey((pre) => ({...pre,isDigitDataTrue: true}))
      }
    }
    setTimeout(() => {
      setKey((pre) => ({...pre,isDigitDataTrue: false}))
    },10000)
  }


  useEffect(() => {
    const userData = localStorage.getItem("userData")
    const registered = localStorage.getItem("registered");
    const user = localStorage.getItem("user");
    if (user && registered && userData) {
      setKey((pre) => ({...pre, loginUserProfile:JSON.parse(userData)}))
      setKey((pre) => ({...pre, userRegisetered:JSON.parse(registered)}));
      setKey((pre) => ({...pre, users:JSON.parse(user)}));
    }
  }, []);

  console.log(key.userRegisetered);
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(key.loginUserProfile))
    localStorage.setItem("registered", JSON.stringify(key.userRegisetered));
    localStorage.setItem("user", JSON.stringify(key.users));
  }, [key.users, key.userRegisetered, key.loginUserProfile]);

  const valOfst = useMemo(()=>({
     key,
        setKey,
        digitSubmit,
        openDigitModalLogin,
        openDigitModalRegister,
        openDigitProfile
  }),[key,
    setKey,
    digitSubmit,
    openDigitModalLogin,
    openDigitModalRegister,
    openDigitProfile])
  return (
    <Context.Provider
      value={valOfst}>
      {children}
    </Context.Provider>
  );
};
