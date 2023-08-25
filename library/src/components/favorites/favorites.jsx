import classNames from "classnames";
import { useEffect, useState } from "react";
import CustomButton from "../common/customButton/customButton";
import { H2Title } from "../common/h2Title/h2Title";
import styles from "./favorites.module.scss";
import { useAppContext } from "../../contexts/useAppContext";
import { ModalBuyCard } from "../common/modal/modalBuyCard/modalBuyCard";
import ModalLogin from "../common/modal/modalLogIn/modalLogin";

export const Favorites = ({ data }) => {
  const [check, setCheck] = useState("winter");
  const [isFavoritesLogin, setFavoritesLogin] = useState(false);
  const [isBuyCard, setBuyCard] = useState(false);
  const {
    currentUser,
    setCurrentUser,
    setDataBook,
    dataBook,
    users,
    setUsers,
  } = useAppContext();

  const checkRadioBtn = (e) => {
    setCheck(e.target.value);
  };

  const openLogIn = () => {
    setFavoritesLogin(true);
  };
  const closeLogIn = () => {
    setFavoritesLogin(false);
  };

  const openBuyCard = () => {
    setBuyCard(true);
  };

  const closeBuyCard = () => {
    setBuyCard(false);
  };

  const buyCard = () => {
    const updatedCurrentUser = {
      ...currentUser,
      rentedBooks: [...currentUser.rentedBooks, dataBook.name],
    };
    setCurrentUser(updatedCurrentUser);
    setUsers(users.filter((item) => item.email !== currentUser.email));
    setUsers((prev) => [...prev, updatedCurrentUser]);
  };
  console.log(currentUser.rentedBooks);
  return (
    <section className={styles.favorites} id="favorites">
      <H2Title>Favorites</H2Title>
      <div className={styles.seasonBooks}>
        <p>Pick favorites of season</p>
        <span className={styles.seasonBooks__pagination}>
          <input
            type="radio"
            id="Winter"
            name="seasons"
            value={"winter"}
            onChange={checkRadioBtn}
            checked={check === "winter" ? true : false}
          />
          <label htmlFor="Winter">Winter</label>
          <input
            type="radio"
            id="Spring"
            name="seasons"
            value={"spring"}
            onChange={checkRadioBtn}
            checked={check === "spring" ? true : false}
          />
          <label htmlFor="Spring">Spring</label>
          <input
            type="radio"
            id="Summer"
            name="seasons"
            value={"summer"}
            onChange={checkRadioBtn}
            checked={check === "summer" ? true : false}
          />
          <label htmlFor="Summer">Summer</label>
          <input
            type="radio"
            id="Autumn"
            name="seasons"
            value={"autumn"}
            onChange={checkRadioBtn}
            checked={check === "autumn" ? true : false}
          />
          <label htmlFor="Autumn">Autumn</label>
        </span>
        <div className={styles.seasonBooks__preViewBooks}>
          {data.map((item) => {
            for (let key in item) {
              if (check === key) {
                return item[key].map((book, id) => {
                  return (
                    <div key={id}>
                      <div className={styles.cover}>
                        <h3 className={styles.cover__from}>{book.from}</h3>
                        <div className={styles.cover__lineGold}></div>
                        <h4
                          className={classNames(
                            styles.nameAndAuthor,
                            styles.cover__name
                          )}
                        >
                          {book.name}
                        </h4>
                        <h4
                          className={classNames(
                            styles.nameAndAuthor,
                            styles.cover__author
                          )}
                        >
                          {book.author}
                        </h4>
                        <p className={styles.cover__description}>
                          {book.description}
                        </p>
                          {currentUser.rentedBooks.map((item) => {
                              return item === book.name ? (
                                <CustomButton
                                  className="ownCardButton"
                                  type="submit"
                                >
                                  Own
                                </CustomButton>
                              ) : (
                                <CustomButton
                                  className="bookBtn"
                                  onClick={() => {
                                    currentUser !== null
                                      ? (openBuyCard(), setDataBook(book))
                                      : openLogIn();
                                  }}
                                >
                                  Buy
                                </CustomButton>
                              );
                            })}
                        <img src={book.src} className={styles.cover__image} />
                      </div>
                    </div>
                  );
                });
              }
            }
          })}
          <ModalBuyCard
            closeBuyCard={closeBuyCard}
            openCardState={isBuyCard}
            dataBook={dataBook}
            buyCard={buyCard}
          />
          <ModalLogin
            wrap="wrapDigit"
            wrapPos="modalLogInWrapCenter"
            openState={isFavoritesLogin}
            closeLogIn={() => closeLogIn()}
          />
        </div>
      </div>
    </section>
  );
};
