import styles from "./modalBuyCard.module.scss";
import CustomButton from "../../customButton/customButton";
import classNames from "classnames";
import { Portal } from "../../../../contexts/Portal";
import crossItem from "../../../../../public/images/close_btn_white.svg";
import { useForm } from "react-hook-form";
import { FormInput } from "../../formInput/formInput";
import { uid } from "uid";
import { useAppContext } from "../../../../hooks/useAppContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef } from "react";

const buyCardSchema = yup.object().shape({
  bankCard: yup
    .string()
    .required("bank card is required")
    .matches(
      /^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$/gi,
      "Card Number contain only numbers example: 5223322323322333"
    ),
  expirationDay: yup
    .string()
    .required("expiration day is required")
    .matches(/(0[1-9]|1[0-2])/gi, "Expiration Day contain only 2 numbers"),
  expirationMonth: yup
    .string()
    .required("expiration month is required")
    .matches(
      /([0-9]{4}|[0-9]{2})/gi,
      "Expiration Month contain only 2 numbers"
    ),
  cvc: yup
    .string()
    .required("expiration cvc is required")
    .matches(/^[0-9]{3}$/, "CVC contain only three numbers"),
  cardholderName: yup
    .string()
    .required("expiration card holder name is required")
    .matches(/[A-z]+/gi, "Card Holder contain only letters"),
  postalCode: yup
    .string()
    .required("expiration postal code is required")
    .matches(/[0-9]{5}/gi, "Postal Code contain only 5 numbers"),
  cityTown: yup
    .string()
    .required("expiration city / town is required")
    .matches(/[A-z]+/gi, "City / Town contain only letters"),
});

const formLibraryCard = [
  {
    type: "text",
    label: "CVC",
    name: "cvc",
    pattern: "^[0-9]{3}$",
    width: "45px",
    maxLength: "3",
  },
  {
    type: "text",
    label: "Cardholder name",
    name: "cardholderName",
    pattern: "[A-z]+",
    width: "200px",
  },
  {
    type: "text",
    label: "Postal code",
    name: "postalCode",
    pattern: "[0-9]{5}",
    width: "200px",
  },
  {
    type: "text",
    label: "City / Town",
    name: "cityTown",
    pattern: "[A-z]+",
    width: "200px",
  },
];

const patterns = {
  bankCard:
    "^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$",
  expirationDay: "(0[1-9]|1[0-2])",
  expirationMonth: "([0-9]{4}|[0-9]{2})",
};

const ModalBuyCard = ({ openCardState, closeBuyCard, buyCard }) => {
  
  const { dataBook } = useAppContext();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    bankCard: "",
    expirationDay: "",
    expirationMonth: "",
    cvc: 0,
    cardholderName: "",
    postalCode: "",
    cityTown: "",
    resolver: yupResolver(buyCardSchema),
  });

  

  const onSubmit = () => {
    closeBuyCard();
    buyCard();
  };
  
  const ref=useRef()

  const checkIfClickedOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      closeBuyCard()
    }
  }

  return (
    <Portal htmlLink={"#favorites"}>
        <div
          className={classNames(
            openCardState ? styles.grayLayer : styles.closeGrayLayer
          )}
          onClick={(e)=>checkIfClickedOutside(e)}
        >
          <div className={styles.wrapperBuyCard} ref={ref} >
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
                onSubmit={handleSubmit(() => {
                  onSubmit();
                })}
              >
                <label htmlFor="bankCard">Bank Card Number</label>
                <input pattern={patterns.bankCard} {...register("bankCard")} />
                {errors.bankCard && (
                  <p className={styles.required}>{errors.bankCard.message}</p>
                )}
                <label htmlFor="Expiration Code">Bank Card Number</label>
                <div className={styles.expiration}>
                  <input
                    pattern={patterns.expirationDay}
                    className={styles.expiration__values}
                    maxLength={2}
                    {...register("expirationDay")}
                  />

                  <input
                    className={styles.expiration__values}
                    pattern={patterns.expirationMonth}
                    maxLength={2}
                    {...register("expirationMonth")}
                  />
                </div>
                {errors.expirationDay && (
                  <p className={styles.required}>
                    {errors.expirationDay.message}
                  </p>
                )}
                {errors.expirationMonth && (
                  <p className={styles.required}>
                    {errors.expirationMonth.message}
                  </p>
                )}
                {formLibraryCard.map((item, id) => {
                  return (
                    <FormInput
                      width={item.width}
                      pattern={item.pattern}
                      name={item.name}
                      id={uid()}
                      key={id}
                      register={register}
                      label={item.label}
                      errors={errors}
                      type={item.type}
                      styles={styles}
                      maxLength={item.maxLength}
                    />
                  );
                })}
                <div className={styles.buyBook}>
                  <CustomButton className="buyCardButton" type="submit">
                    Buy
                  </CustomButton>
                  <h3 className={styles.buyBook__priceBook}>
                    {dataBook.price}
                  </h3>
                </div>
              </form>
              <div className={styles.privacy}>
                <p className={styles.privacy__text}>
                  If you are live, work, attend school, or pay property taxes in
                  New York State, you can get a $25 digital library card right
                  now using this online form. Visitors to New York State can
                  also use this form to apply for a temporary card.
                </p>
              </div>
            </div>
          </div>
        </div>
    </Portal>
  );
};
export default ModalBuyCard;
