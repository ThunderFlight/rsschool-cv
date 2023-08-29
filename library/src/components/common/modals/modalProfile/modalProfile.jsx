import styles from "./modalProfile.module.scss";
import { useAppContext } from "../../../../hooks/useAppContext";
import classNames from "classnames";
import close from "../../../../../public/images/close_btn.svg";
import { Portal } from "../../../../contexts/Portal";
import Check from "../../Check/check";
import {color} from "@primer/primitives"

export const ModalProfile = ({
  wrapProfile,
  openProfile,
  closeModalProfile,
  copyCardNumber,
  isCopied
}) => {
  const { currentUser } = useAppContext();

  return (
    <Portal htmlLink="nav">
      <div
        className={classNames(
          openProfile ? styles[wrapProfile] : styles.myProfileClose
        )}
      >
        <div className={styles.myProfile}>
          <div className={styles.myProfile__left}>
            <div className={styles.profileAvatar}>
              <p className={styles.profileAvatar__firstLetter}>
                {currentUser !== null &&
                  currentUser.firstName.slice(0, 1).toUpperCase()}
                {currentUser !== null &&
                  currentUser.lastName.slice(0, 1).toUpperCase()}
              </p>
            </div>
            <div className={styles.profileName}>
              <p className={styles.profileName__fullName}>
                {currentUser !== null &&
                  currentUser.firstName.slice(0, 1).toUpperCase() +
                    currentUser.firstName.slice(
                      1,
                      currentUser.firstName.length
                    )}
                &nbsp;
                {currentUser !== null &&
                  currentUser.lastName.slice(0, 1).toUpperCase() +
                    currentUser.lastName.slice(1, currentUser.lastName.length)}
              </p>
            </div>
          </div>
          <div className={styles.myProfile__right}>
            <h2>MY PROFILE</h2>
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
                  {currentUser !== null && currentUser.visits}
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
                  {currentUser !== null && currentUser.rentedBooks.length}
                </p>
              </li>
            </ul>
            <h4 className={styles.rentedBook}>Rented books</h4>

            <ul className={styles.rentedBooks}>
              {currentUser !== null &&
                currentUser.rentedBooks.map((item, index) => {
                  return (
                    <li key={index} className={styles.rentedBooks__book}>
                      {item.book} , {item.author}
                    </li>
                  );
                })}
            </ul>
            <p className={styles.cardNumber}>
              Card number&nbsp;
              <a className={styles.cardNumber__id}>
                {currentUser !== null && currentUser.cardNumber}&nbsp;
                <button className={styles.cardNumber__copyId} onClick={copyCardNumber}>
                  {isCopied ?
                  (<Check 
                    css={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      strokeDasharray: 50,
                      strokeDashoffset: -50,
                      transition: "all 300ms ease-in-out"
                    }}/>):(
                  <svg
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="2.46826"
                      y="0.25"
                      width="10.5917"
                      height="9.5"
                      rx="0.75"
                      stroke="black"
                      strokeWidth="0.5"
                    />
                    <rect
                      x="0.25"
                      y="2.25"
                      width="10.5917"
                      height="9.5"
                      rx="0.75"
                      fill="white"
                      stroke="black"
                      strokeWidth="0.5"
                    />
                  </svg>)}
                </button>
              </a>
            </p>
          </div>
          <img src={close} onClick={() => closeModalProfile()} />
        </div>
      </div>
    </Portal>
  );
};
