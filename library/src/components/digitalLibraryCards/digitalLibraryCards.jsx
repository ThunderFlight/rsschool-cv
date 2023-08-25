import  CustomButton  from "../common/customButton/customButton";
import { H2Title } from "../common/h2Title/h2Title";
import styles from "./digitalLibraryCards.module.scss";
import { useAppContext } from "../../contexts/useAppContext";
import  ModalLogin  from "../common/modal/modalLogIn/modalLogin";
import { ModalRegister } from "../common/modal/modalRegister/modalRegister";
import { ModalProfile } from "../common/modal/modalProfile/modalProfile";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const DigitalLibraryCards = () => {

  const [isDigitalProfile, setDigitalProfile]=useState(false);
  const [isDigitalRegister, setDigitalRegister]=useState(false);
  const [isDigitalLogin, setDigitalLogin]=useState(false);
  const [isDigitDataTrue, setDigitDataTrue]=useState(false);

  const {
    users,
    currentUser
  } = useAppContext();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      cardNumber: "",
    },
  });

  const digitSubmit = (data) => {
    let a = data.name.split(" ");
    for (let k in users) {
      if (
        data.cardNumber === users[k].cardNumber &&
        a[0] === users[k].firstName &&
        a[1] === users[k].lastName
      ) {
        setDigitDataTrue(true)
      }
    }
    setTimeout(() => {
      setDigitDataTrue(false)
    }, 10000);
  };

  const openDigitProfile = () => {
    setDigitalProfile(true);
  };
  const closeDigitProfile = () => {
    setDigitalProfile(false);
  };
  const openDigitModalRegister = () => {
    setDigitalRegister(true)
  };
  const closeDigitModalRegister = () => {
    setDigitalRegister(false)
  };
  const openDigitModalLogin = () => {
    setDigitalLogin(true)
  };
  const closeDigitModalLogin = () => {
    setDigitalLogin(false)
  };

  return (
    <section className={styles.digitalLibraryCards} id="digitalLibraryCards">
      <H2Title>Digital Library Cards</H2Title>
      <div className={styles.digitalLibraryCards__wrapp}>
        <div className={styles.leftFind}>
          <p className={styles.leftFind__titleCard}>Find your Library card</p>
          <form
            className={styles.leftFind__borderCard}
            onSubmit={handleSubmit((data) => digitSubmit(data))}
          >
            <div className={styles.innerBlock}>
              <p>Brooklyn Public Library</p>
              <input
                {...register("name", { 
                  required: true, 
                  pattern: /[A-z]+/gi 
                })}
                placeholder="Reader's name"
              />
              <input
                {...register("cardNumber", {
                  required: true,
                  pattern: /[A-z,0-9]+/gi,
                })}
                placeholder="Card number"
              />
            </div>
            {!isDigitDataTrue ? (
              <CustomButton type="submit">Check the card</CustomButton>
            ) : (
              ""
            )}
          </form>
        </div>
        <div className={styles.rightSide}>
          <h3>Get a reader card</h3>
          <p>
            You will be able to see a reader card after logging into account or
            you can register a new account
          </p>
          <span>
            {currentUser !== null ? (
              <CustomButton className="regBtn" onClick={() => openDigitProfile()}>
                Profile
              </CustomButton>
            ) : (
              <CustomButton
                className="regBtn"
                onClick={() => openDigitModalRegister()}
              >
                sign Up
              </CustomButton>
            )}
            {currentUser === null ? (
              <CustomButton
                className="regBtn"
                onClick={() => openDigitModalLogin()}
              >
                Log in
              </CustomButton>
            ) : (
              ""
            )}
          </span>
        </div>
      </div>
      <ModalRegister
        regWrap="digitRegWrap"
        regWrapPos="modalLogInWrapCenter"
        openRegState={isDigitalRegister}
        openLogIn={ openDigitModalLogin}
        closeModalRegister={closeDigitModalRegister}
      />
      <ModalLogin
        wrap="wrapDigit"
        wrapPos="modalLogInWrapCenter"
        openState={isDigitalLogin}
        openSignUp={openDigitModalRegister}
        closeLogIn={closeDigitModalLogin}
      />
      <ModalProfile
        wrapProfile="wrapDigitalMyProfile"
        openProfile={ isDigitalProfile}
        closeModalProfile={closeDigitProfile}
      />
    </section>
  );
};
