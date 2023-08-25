import { useState, useMemo } from "react";
import { Context } from "./context";
import { useLocalStorage } from "./useLocalStorage";

export const Provider = function ({ children }) {

  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null);
  const [users, setUsers] = useLocalStorage("userList", []);
  const [checkCardData, setCheckCardData] = useState("");
  const [dataBook, setDataBook] = useState("");
 
  const logOut = () => {
    setCurrentUser(null);
  };

  const createUser = (reset, closeModalRegister, data) =>{
    setUsers((prev) => ([...prev,data]))
    reset();
    closeModalRegister();
  }
  const valOfst = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      users,
      setUsers,
      logOut,
      checkCardData,
      setCheckCardData,
      createUser,
      dataBook,
      setDataBook,
    }),
    [
      currentUser,
      setCurrentUser,
      users,
      setUsers,
      logOut,
      checkCardData,
      setCheckCardData,
      createUser,
      dataBook,
      setDataBook,
    ]
  );
  return <Context.Provider value={valOfst}>{children}</Context.Provider>;
};
