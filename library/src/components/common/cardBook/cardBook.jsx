import styles from "./cardBook.module.scss"
import classNames from "classnames";
import CustomButton from "../customButton/customButton";

const CardBook = ({data, openBuyCard, isAnimation, setDataBook, findBook, check, currentUser, openLogIn }) => {
    return (
        data.map((item) => {
            for (let key in item) {
              if (check === key) {
                return item[key].map((book, id) => {
                  return (
                    <div key={id}>
                      <div
                        className={
                          isAnimation ? styles.coverHide : styles.cover
                        }
                      >
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
                        {findBook(book) ? (
                          <CustomButton isDisabled={true} className="ownCardButton">
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
                        )}
                        <img src={book.src} className={styles.cover__image} />
                      </div>
                    </div>
                  );
                });
              }
            }
          })
    )
}
export default CardBook