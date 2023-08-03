
import styles from "./modalProfileAuth.module.scss";
import { useAppContext } from "../../../../contexts/useAppContext";
import classNames from "classnames";
export const ModalProfileAuth = () => {
  const {key,openProfile,logOut}=useAppContext()
 
  // const logOut = () => {
  //   setOpen(true);
  //   setProfileReged(false);
  //   setUserRegistered(false);
  // };
  return (
    
      <div
        className={classNames(
          key.profileReged
            ? styles.modalChooseRegisterOpened
            : styles.modalChooseClosed
        )}>
        <h3>Profile</h3>
        <div></div>
        <p onClick={()=>openProfile()}>My Profile</p>
        <p onClick={()=>logOut()}>Log Out</p>
      </div>
  );
};
