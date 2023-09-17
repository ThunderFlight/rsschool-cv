import classNames from "classnames";
import close from "../../../../../public/images/close_btn.svg";
import { useAppContext } from "../../../../hooks/useAppContext";
import CustomButton from "../../customButton/customButton";
import { useForm } from "react-hook-form";
import { FormInput } from "../../formInput/formInput";
import { Portal } from "../../../../contexts/Portal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import * as yup from "yup";
import styles from "./modalLogin.module.scss";

const loginSchema = yup.object().shape({
  email: yup.string().required("email is required").matches(/[A-z,0-9]+@[a-z]+.[a-z]+/, 'Email can containt only numbers or letters @ domain'),
  password: yup.string().required("password is required").min(8, 'Password is too short - should be 8 chars.')
  .matches(/(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8}/, 'Password must have Minimum one LowerCase, one UpperCase letter and one number.'),
});

const inputPropsList = [
  {
    type:"text",
    label: "E-mail",
    name: "email",
    pattern: "[A-z,0-9]+@[a-z]+\.[a-z]+",
    id: 1,
  },
  {
    type:"text",
    label: "Password",
    name: "password",
    pattern: "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}",
    id: 2,
  },
];

const ModalLogin = ({
  wrap,
  wrapPos,
  openState,
  openModalYouDontHaveAccout,
  closeLogIn,
}) => {
  const {setUsers, users, setCurrentUser } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const loginForm = (data) => {
    users.map((item)=>{
      if (
        item.email === data.email &&
        item.password === data.password
      ) {
        setUsers([...users,item.visits += 1])
        setUsers(users.filter((item)=>item instanceof Object))
        setCurrentUser(item);
        closeLogIn();
      }
    })
  };

  const ref=useRef()

  const checkIfClickedOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      closeLogIn()
    }
  }
  
  return (
    <Portal htmlLink="nav">
      <div
        className={
          openState
            ? classNames(styles[wrapPos], styles[wrap])
            : styles.modalLogInWrapClose
        }
        onClick={checkIfClickedOutside}
      >
        <form
          className={styles.regandlogform}
          onSubmit={handleSubmit(loginForm)}
          ref={ref}
        >
          <h3 className={styles.regandlogform__title}>LOGIN</h3>
          <img src={close} onClick={closeLogIn} />
          <div className={styles.regandlogform__form}>
            {inputPropsList.map((item) => {
              return (
                <FormInput
                  name={item.name}
                  pattern={item.pattern}
                  register={register}
                  key={item.id}
                  label={item.label}
                  errors={errors}
                  type={item.type}
                  styles={styles}
                />
              );
            })}
            <CustomButton type="submit" className="modalBtn">
              Log In
            </CustomButton>
            <p>
              Don`t have an account?
              <button onClick={openModalYouDontHaveAccout}>Register</button>
            </p>
          </div>
        </form>
      </div>
    </Portal>
  );
};

export default ModalLogin;
