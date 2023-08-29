import { useState } from "react";
import { Title } from "../common/title/title";
import styles from "./favorites.module.scss";
import { useAppContext } from "../../hooks/useAppContext";
import ModalBuyCard from "../common/modals/modalBuyCard/modalBuyCard";
import { ModalRegister } from "../common/modals/modalRegister/modalRegister";
import ModalLogin from "../common/modals/modalLogIn/modalLogin";
import CardBook from "../common/cardBook/cardBook";
import useBoolean from "../../hooks/useBoolean";
import { FormInput } from "../common/formInput/formInput";

export const Favorites = ({ data }) => {
  const [check, setCheck] = useState("winter");
  const {
    value: isFavoritesLogin,
    setTrue: setFavoritesLoginTrue,
    setFalse: setFavoritesLoginFalse,
  } = useBoolean();
  const {
    value: isBuyCard,
    setTrue: setBuyCardTrue,
    setFalse: setBuyCardFalse,
  } = useBoolean();
  const {
    value: isFavoritesRegister,
    setTrue: setFavoritesRegisterTrue,
    setFalse: setFavoritesRegisterFalse,
  } = useBoolean();
  const {
    value: isAnimation,
    setTrue: setAnimationTrue,
    setFalse: setAnimationFalse,
  } = useBoolean();

  const {
    currentUser,
    setCurrentUser,
    setDataBook,
    dataBook,
    users,
    setUsers,
  } = useAppContext();

  const checkRadioBtn = (e) => {
    setAnimationTrue();
    setTimeout(() => {
      setAnimationFalse();
      setCheck(e.target.value);
    }, 1000);
  };
  
  const radioButtonPagination = [
    {
      type: "radio",
      id: "Winter",
      name: "seasons",
      value: "winter",
      checked: check,
      label:"Winter",
    },
    {
      type: "radio",
      id: "Spring",
      name: "seasons",
      value: "spring",
      checked: check,
      label:"Spring",
    },
    {
      type: "radio",
      id: "Summer",
      name: "seasons",
      value: "summer",
      checked: check,
      label:"Summer",
    },
    {
      type: "radio",
      id: "Autumn",
      name: "seasons",
      value: "autumn",
      checked: check,
      label:"Autumn",
    },
  ];
  const openLogIn = () => {
    setFavoritesLoginTrue();
    setFavoritesRegisterFalse();
  };

  const openRegister = () => {
    setFavoritesLoginFalse();
    setFavoritesRegisterTrue();
  };

  const findBook = (book) => {
    if (currentUser === null || currentUser.rentedBooks.length === 0) {
      return false;
    }
    return currentUser.rentedBooks.find((item) => item.book === book.name);
  };
  const buyCard = () => {
    const updatedCurrentUser = {
      ...currentUser,
      rentedBooks: [
        ...currentUser.rentedBooks,
        { book: dataBook.name, author: dataBook.author },
      ],
    };
    setCurrentUser(updatedCurrentUser);
    setUsers(users.filter((item) => item.email !== currentUser.email));
    setUsers((prev) => [...prev, updatedCurrentUser]);
  };
  return (
    <section className={styles.favorites} id="favorites">
      <Title>Favorites</Title>
      <div className={styles.seasonBooks}>
        <p className={styles.seasonBooks__title}>Pick favorites of season</p>
        <span className={styles.seasonBooks__pagination}>
          {radioButtonPagination.map((item,index) => {
            return <FormInput key={index + 1} label={item.label} id={item.id} checked={check} name={item.name} type={item.type} value={item.value} onChange={checkRadioBtn}/>
          })}
        </span>
        <div className={styles.seasonBooks__preViewBooks}>
          <CardBook
            data={data}
            openBuyCard={setBuyCardTrue}
            isAnimation={isAnimation}
            setDataBook={setDataBook}
            findBook={findBook}
            check={check}
            currentUser={currentUser}
            openLogIn={openLogIn}
          />
          <ModalBuyCard
            closeBuyCard={setBuyCardFalse}
            openCardState={isBuyCard}
            dataBook={dataBook}
            buyCard={buyCard}
          />
          <ModalLogin
            wrap="wrapDigit"
            wrapPos="modalLogInWrapCenter"
            openState={isFavoritesLogin}
            closeLogIn={setFavoritesLoginFalse}
            openModalYouDontHaveAccout={openRegister}
          />
          <ModalRegister
            regWrap="digitRegWrap"
            regWrapPos="modalLogInWrapCenter"
            openRegState={isFavoritesRegister}
            openLogIn={openLogIn}
            closeModalRegister={setFavoritesRegisterFalse}
          />
        </div>
      </div>
    </section>
  );
};
