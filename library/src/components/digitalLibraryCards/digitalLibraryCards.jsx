import  CustomButton  from "../common/customButton/customButton";
import { Title } from "../common/title/title";
import styles from "./digitalLibraryCards.module.scss";
import { useAppContext } from "../../hooks/useAppContext";
import  ModalLogin  from "../common/modals/modalLogIn/modalLogin";
import { ModalRegister } from "../common/modals/modalRegister/modalRegister";
import { ModalProfile } from "../common/modals/modalProfile/modalProfile";
import { useForm } from "react-hook-form";
import useBoolean from "../../hooks/useBoolean";
import { useEffect, useState } from "react";

export const DigitalLibraryCards = () => {
  const [checkCardData, setCheckCardData]= useState([])
  const {value:isDigitalProfile, setTrue:setDigitalProfileTrue, setFalse:setDigitalProfileFalse}=useBoolean()
  const {value:isDigitalRegister, setTrue:setDigitalRegisterTrue, setFalse:setDigitalRegisterFalse}=useBoolean()
  const {value:isDigitalLogin, setTrue:setDigitalLoginTrue, setFalse:setDigitalLoginFalse}=useBoolean()
  const {value:isDigitValues, setTrue:setDigitValuesTrue, setFalse:setDigitValuesFalse}=useBoolean()
  const {value:isCopied, setTrue:setCopiedTrue, setFalse:setCopiedFalse}=useBoolean()

  const {
    users,
    currentUser
  } = useAppContext();
  useEffect(()=>{
    currentUser ? setDigitValuesTrue(): setDigitValuesFalse()
  },[currentUser])
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      cardNumber: "",
    },
  });
  
  const digitSubmit = (cardData) => {
    const sliceFullName = cardData.name.split(" ");
    users.map((item)=>{
      console.log(item.cardNumber);
      if (
        cardData.cardNumber === item.cardNumber &&
        sliceFullName[0] === item.firstName &&
        sliceFullName[1] === item.lastName
      ) {
        setDigitValuesTrue()
        setCheckCardData([item.visits,item.rentedBooks.length])
      }
    })
    setTimeout(() => {
      setDigitValuesFalse()
    }, 10000);
  };

  const copyCardNumber = () => {
    setCopiedTrue();
    navigator.clipboard.writeText(currentUser.cardNumber);
    setTimeout(()=>{
      setCopiedFalse();
    },1000)
  }

  return (
    <section className={styles.digitalLibraryCards} id="digitalLibraryCards">
      <Title>Digital Library Cards</Title>
      <div className={styles.digitalLibraryCards__wrapp}>
        <div className={styles.leftFind}>
          <p className={styles.leftFind__titleCard}>Find your Library card</p>
          <form
            className={styles.leftFind__borderCard}
            onSubmit={handleSubmit((cardData)=>digitSubmit(cardData))}
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
            {!isDigitValues ? (
              <CustomButton type="submit">Check the card</CustomButton>
            ) : (
              <ul className={styles.profileStats}>
              <li className={styles.profileStats__elements}>
                <h3 className={styles.elementTitle}>Visits</h3>
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.5 10C13.2614 10 15.5 7.76143 15.5 5C15.5 2.23857 13.2614 0 10.5 0C7.73857 0 5.5 2.23857 5.5 5C5.5 7.76143 7.73857 10 10.5 10ZM17.5711 13.9289C19.4464 15.8043 20.5 18.3478 20.5 21H10.5H0.5C0.5 18.3478 1.55357 15.8043 3.42894 13.9289C5.30429 12.0536 7.84784 11 10.5 11C13.1522 11 15.6957 12.0536 17.5711 13.9289Z"
                    fill="#BB945F"
                  />
                </svg>{" "}
                <p className={styles.elementStatNumber}>
                  {currentUser ? currentUser.visits : checkCardData[0]}
                </p>
              </li>
              <li className={styles.profileStats__elements}>
                <h3 className={styles.elementTitle}>Bonuses</h3>
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0L12.2249 3.31001L15.8779 2.00532L15.8249 6.05634L19.5106 7.25532L17.2 10.5L19.5106 13.7447L15.8249 14.9437L15.8779 18.9947L12.2249 17.69L10 21L7.77508 17.69L4.12215 18.9947L4.17508 14.9437L0.489435 13.7447L2.8 10.5L0.489435 7.25532L4.17508 6.05634L4.12215 2.00532L7.77508 3.31001L10 0Z"
                    fill="#BB945F"
                  />
                </svg>
                <p className={styles.elementStatNumber}>1350</p>
              </li>
              <li className={styles.profileStats__elements}>
                <h3 className={styles.elementTitle}>Books</h3>
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="21" fill="#BB945F" />
                  <rect x="2" width="1" height="19" fill="#826844" />
                  <rect x="1" width="1" height="21" fill="white" />
                </svg>
                <p className={styles.elementStatNumber}>
                  {currentUser ? currentUser.rentedBooks.length : checkCardData[1]}
                </p>
              </li>
            </ul>
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
              <CustomButton className="regBtn" onClick={setDigitalProfileTrue}>
                Profile
              </CustomButton>
            ) : (
              <CustomButton
                className="regBtn"
                onClick={setDigitalRegisterTrue}
              >
                sign Up
              </CustomButton>
            )}
            {currentUser === null && (
              <CustomButton
                className="regBtn"
                onClick={setDigitalLoginTrue}
              >
                Log in
              </CustomButton>
            )}
          </span>
        </div>
      </div>
      <ModalRegister
        regWrap="digitRegWrap"
        regWrapPos="modalLogInWrapCenter"
        openRegState={isDigitalRegister}
        openLogIn={setDigitalLoginTrue}
        closeModalRegister={setDigitalRegisterFalse}
      />
      <ModalLogin
        wrap="wrapDigit"
        wrapPos="modalLogInWrapCenter"
        openState={isDigitalLogin}
        openSignUp={setDigitalRegisterTrue}
        closeLogIn={setDigitalLoginFalse}
        
      />
      <ModalProfile
        wrapProfile="wrapDigitalMyProfile"
        openProfile={ isDigitalProfile}
        closeModalProfile={setDigitalProfileFalse}
        copyCardNumber={copyCardNumber}
        isCopied={isCopied}
      />
    </section>
  );
};
