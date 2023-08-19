import { useState } from "react";
import { CustomButton } from "../common/customButton/customButton";
import { H2Title } from "../common/h2Title/h2Title";
import styles from "./digitalLibraryCards.module.scss";
import { useAppContext } from "../../contexts/useAppContext";
import classNames from "classnames";
import { ModalLogin } from "../common/modal/modalLogIn/modalLogin";
import { ModalRegister } from "../common/modal/modalRegister/modalRegister";
import { ModalProfile } from "../common/modal/modalProfile/modalProfile";
export const DigitalLibraryCards = () => {
  const {key,setKey,digitSubmit,openDigitModalLogin,openDigitModalRegister,openDigitProfile}=useAppContext();
  return (
    <section className={styles.digitalLibraryCards} id="digitalLibraryCards">
      <H2Title>Digital Library Cards</H2Title>
      <div className={styles.digitalLibraryCards__wrapp}>
        <div className={styles.leftFind}>
          <p className={styles.leftFind__titleCard}>Find your Library card</p>
          <form className={styles.leftFind__borderCard} onSubmit={(e) => digitSubmit(e)}>
            <div className={styles.innerBlock}>
              <p>Brooklyn Public Library</p>
              <input
                type="text"
                placeholder="Reader's name"
                onChange={(e) => {
                  setKey((pre)=>({...pre,digitName:e.target.value}))
                }}
                value={key.digitName}
              />
              <input
                type="text"
                placeholder="Card number"
                className={classNames(key.isDigitDataTrue ? "colorYellow" : "colorBlack")}
                onChange={(e) => {
                  let a = /\s+/g;
                  if (a.test(e.target.value) === false) {
                    setKey((pre)=>({...pre,digitCard:e.target.value}))
                  } else {
                    setKey((pre)=>({...pre,digitCard:""}))
                  }
                }}
                value={key.digitCard}
              />
            </div>
            {key.isDigitDataTrue ? "lol" : <CustomButton type="submit">Check the card</CustomButton>}
          </form>
        </div>
        <div className={styles.rightSide}>
          <h3>Get a reader card</h3>
          <p>
            You will be able to see a reader card after logging into account or
            you can register a new account
          </p>
          <span>
            {key.userRegisetered ?(<CustomButton color="regBtn" onClick={()=>openDigitProfile()}>Profile</CustomButton>) :(<CustomButton color="regBtn" onClick={()=> openDigitModalRegister()}>sign Up</CustomButton>)}
             {!key.userRegisetered ? (<CustomButton color="regBtn" onClick={() => openDigitModalLogin()}>Log in</CustomButton>):""}
          </span>
        </div>
      </div>
      <ModalRegister regWrap="digitRegWrap" regWrapPos="modalLogInWrapCenter" openRegState={key.isOpenModalRegister} openLogIn={()=>openDigitModalLogin()}></ModalRegister>
      <ModalLogin wrap="wrapDigit" wrapPos="modalLogInWrapCenter" openState={key.isOpenModalLogin} openSignUp={()=>openDigitModalRegister()} ></ModalLogin>
      <ModalProfile wrapProfile="wrapDigitalMyProfile" openProfile={key.isOpenModalProfile}></ModalProfile>
    </section>
  );
};
