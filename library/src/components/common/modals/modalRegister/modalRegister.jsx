import classNames from "classnames";
import close from "../../../../../public/images/close_btn.svg";
import { useAppContext } from "../../../../hooks/useAppContext";
import CustomButton from "../../customButton/customButton";
import styles from "./modalRegister.module.scss";
import { uid } from "uid";
import { useForm } from "react-hook-form";
import { FormInput } from "../../formInput/formInput";
import { Portal } from "../../../../contexts/Portal";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const registerSchema = yup.object().shape({
  lastName: yup.string().required("lastName is required"),
  firstName: yup.string().required("firstName is required"),
  email: yup.string().required("email is required"),
  password: yup.string().required("password is required"),
});

const inputPropsList = [
  {
    type: "text",
    label: "First Name",
    name: "firstName",
    pattern: /[A-z]+/gi,
  },
  {
    type: "text",
    label: "Last Name",
    name: "lastName",
    pattern: /[A-z]+/gi,
  },
  {
    type: "text",
    label: "E-mail",
    name: "email",
    pattern: /[A-z,0-9]+@[a-z]+\.[a-z]+/gi,
  },
  {
    type: "text",
    label: "Password",
    name: "password",
    pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}/gi,
  },
];

export const ModalRegister = ({
  regWrapPos,
  regWrap,
  openRegState,
  openModalYouHaveAccount,
  closeModalRegister,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cardNumber: uid(),
      userId: uid(),
      rentedBooks: [],
      visits: 0,
    },
    resolver: yupResolver(registerSchema),
  });

  const { createUser } = useAppContext();
  return (
    <Portal htmlLink="nav">
      <div
        className={
          openRegState
            ? classNames(styles[regWrapPos], styles[regWrap])
            : styles.modalRegisterWrapClose
        }
      >
        <div className={styles.backgroundModal}>
          <form
            className={styles.regandlogform}
            onSubmit={handleSubmit((data) => {
              createUser(reset, closeModalRegister, data);
            })}
          >
            <h3 className={styles.regandlogform__title}>REGISTER</h3>
            <img src={close} onClick={() => closeModalRegister()} />
            <div className={styles.regandlogform__form}>
              {inputPropsList.map((item, id) => {
                return (
                  <FormInput
                    errors={errors}
                    name={item.name}
                    pattern={item.pattern}
                    register={register}
                    key={id}
                    id={uid()}
                    label={item.label}
                    type={item.type}
                  />
                );
              })}
              <CustomButton type="submit" className="modalBtn">
                Sign Up
              </CustomButton>
              <p>
                Already have an account?
                <button onClick={openModalYouHaveAccount}>Login</button>
              </p> 
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
};
