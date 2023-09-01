import classNames from "classnames";
import close from "../../../../../public/images/close_btn.svg";
import { useAppContext } from "../../../../hooks/useAppContext";
import CustomButton from "../../customButton/customButton";
import { uid } from "uid";
import { useForm } from "react-hook-form";
import { FormInput } from "../../formInput/formInput";
import { Portal } from "../../../../contexts/Portal";
import * as yup from "yup";
import { useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./modalRegister.module.scss";

const registerSchema = yup.object().shape({
  lastName: yup.string().required("lastName is required").matches(/[A-z]+/, 'LastName can containt only letters'),
  firstName: yup.string().required("firstName is required").matches(/[A-z]+/, 'FirstName can containt only letters'),
  email: yup.string().required("email is required").matches(/[A-z,0-9]+@[a-z]+.[a-z]+/, 'Email can containt only numbers or letters @ domain'),
  password: yup.string().required("password is required").min(8, 'Password is too short - should be 8 chars.')
  .matches(/(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8}/, 'Password must have Minimum one LowerCase, one UpperCase letter and one number.'),
});



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
const inputPropsList = [
  {
    type: "text",
    label: "First Name",
    name: "firstName",
    pattern: "[A-z]+",
  },
  {
    type: "text",
    label: "Last Name",
    name: "lastName",
    pattern: "[A-z]+",
  },
  {
    type: "text",
    label: "E-mail",
    name: "email",
    pattern: "[A-z,0-9]+@[a-z]+.[a-z]+",
  },
  {
    type: "text",
    label: "Password",
    name: "password",
    pattern: "(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8}",
  },
];
  const { createUser } = useAppContext();

  const ref=useRef()

  const checkIfClickedOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      closeModalRegister()
    }
  }

  return (
    <Portal htmlLink="nav">
      <div
        className={
          openRegState
            ? classNames(styles[regWrapPos], styles[regWrap])
            : styles.modalRegisterWrapClose
        }
        onClick={checkIfClickedOutside}
      >
        <div className={styles.backgroundModal}>
          <form
            className={styles.regandlogform}
            onSubmit={handleSubmit((data) => {
              createUser(reset, closeModalRegister, data);
            })}
            ref={ref}
          >
            <h3 className={styles.regandlogform__title}>REGISTER</h3>
            <img src={close} onClick={closeModalRegister} />
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
                      styles={styles}
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
