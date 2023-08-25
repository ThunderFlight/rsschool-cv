import styles from "./modalBuyCard.module.scss";
import  CustomButton  from "../../customButton/customButton";
import classNames from "classnames";
import { Portal } from "../../../../contexts/Portal";
import crossItem from "../../../../../public/images/close_btn_white.svg";
import { useForm } from "react-hook-form";
import { FormInput } from "../../formInput/formInput";
import { uid } from "uid";
import { useAppContext } from "../../../../contexts/useAppContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const buyCardSchema = yup.object().shape({
  bankCard: yup.string().required("bank card is required"),
  expirationDay: yup.number().required("expiration day is required"),
  expirationMonth: yup.number().required("expiration month is required"),
  cvc: yup.number().required("expiration cvc is required"),
  cardholderName: yup
    .string()
    .required("expiration card holder name is required"),
  postalCode: yup.number().required("expiration postal code is required"),
  cityTown: yup.string().required("expiration city / town is required"),
});

const formLibraryCard = [
  {
    label: "CVC",
    name: "cvc",
    pattern: /[3]{3}/gi,
    width: "45px",
  },
  {
    label: "Cardholder name",
    name: "cardholderName",
    pattern: /[A-z]+/gi,
    width: "200px",
  },
  {
    label: "Postal code",
    name: "postalCode",
    pattern: /\d{5}([ \-]\d{4})?/gi,
    width: "200px",
  },
  {
    label: "City / Town",
    name: "cityTown",
    pattern: /[A-Z]+/gi,
    width: "200px",
  },
];

export const ModalBuyCard = ({ openCardState, closeBuyCard, buyCard }) => {
  const {dataBook, currentUser} = useAppContext()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    bankCard: "",
    expirationDay: "",
    expirationMonth: "",
    cvc: "",
    cardholderName: "",
    postalCode: "",
    cityTown: "",
    resolver: yupResolver(buyCardSchema),
  });
  const onSubmit = () =>{
    closeBuyCard();
    buyCard()
  }
  return (
    <Portal htmlLink={'#favorites'}>
      <div
        className={classNames(
          openCardState ? styles.grayLayer : styles.closeGrayLayer
        )}
      >
        <div className={styles.wrapperBuyCard}>
          <div className={styles.wrapperBuyCard__title}>
            <h3 className={styles.titleCard}>BUY A LIBRARY CARD</h3>
            <img
              src={crossItem}
              className={styles.crossTitle}
              onClick={() => closeBuyCard()}
            />
          </div>

          <div className={styles.wrapperBuyCard__formBuyWrapper}>
            <form
              className={styles.formBuy}
              onSubmit={handleSubmit(() => {onSubmit()})}
            >
              <label htmlFor="bankCard">Bank Card Number</label>
              <input
                {...register("bankCard", {
                  pattern: /\b[3-6]\d{3}[ \-_.]?(\d{4}[ \-_.]?){2}\d{4}\b/gi,
                })}
              />
              {errors.bankCard && <p>{errors.bankCard.message}</p>}
              <label htmlFor="Expiration Code">Bank Card Number</label>
              <div className={styles.expiration}>
                <input
                  className={styles.expiration__values}
                  {...register("expirationDay", {
                    pattern: /(0[1-9]|1[0-2])/gi,
                  })}
                />

                <input
                  className={styles.expiration__values}
                  {...register("expirationMonth", {
                    pattern: /([0-9]{4}|[0-9]{2})/gi,
                  })}
                />
              </div>
              {errors.expirationDay && <p>{errors.expirationDay.message}</p>}
              {errors.expirationMonth && (
                <p>{errors.expirationMonth.message}</p>
              )}
              {formLibraryCard.map((index, id) => {
                return (
                  <FormInput
                    width={index.width}
                    pattern={index.pattern}
                    name={index.name}
                    id={uid()}
                    key={id}
                    register={register}
                    label={index.label}
                    errors={errors}
                  />
                );
              })}
              <div className={styles.buyBook}>
                <CustomButton className="buyCardButton" type="submit">
                  Buy
                </CustomButton>
                <h3 className={styles.buyBook__priceBook}>{dataBook.price}</h3>
              </div>
            </form>
            <div className={styles.privacy}>
              <p className={styles.privacy__text}>
                If you are live, work, attend school, or pay property taxes in
                New York State, you can get a $25 digital library card right now
                using this online form. Visitors to New York State can also use
                this form to apply for a temporary card.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};
// {
//   label: "Bank Card Number",
//   name: "bankCard",
//   pattern: /\b[3-6]\d{3}[ \-_.]?(\d{4}[ \-_.]?){2}\d{4}\b/gi,
//   width: "200px",
// },
// {
//   label: "Expiration Code",
//   name: "expirationDay",
//   pattern: /(0[1-9]|1[0-2])/gi,
//   width: "45px",
// },
// {
//   label: "",
//   name: "expirationMonth",
//   pattern: /([0-9]{4}|[0-9]{2})/gi,
//   width: "45px",
// },
