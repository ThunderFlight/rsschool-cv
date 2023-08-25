import classNames from "classnames";
import close from "../../../../../public/images/close_btn.svg";
import { useAppContext } from "../../../../contexts/useAppContext";
import  CustomButton  from "../../customButton/customButton";
import styles from "./modalLogin.module.scss";
import {useForm} from "react-hook-form"
import { FormInput } from "../../formInput/formInput";
import { Portal } from "../../../../contexts/Portal";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

const loginSchema = yup.object().shape({
  email: yup.string().required("email is required"),
  password: yup.string().required("password is required"),
});

const inputPropsList = [
  { 
    label:"E-mail",
    name:"email",
    pattern:/[A-z,0-9]+@[a-z]+\.[a-z]+/gi,
    id:1,
  },  
  {
    label:"Password",
    name:"password",
    pattern:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}/gi,
    id:2,
  }
]

const ModalLogin = ({wrap, wrapPos, openState, openModalYouDontHaveAccout, closeLogIn}) => {
  const {users, setCurrentUser} = useAppContext();
  const {register, handleSubmit, formState: {errors}}=useForm({
    defaultValues:{
      email:"",
      password:""
    },
    resolver: yupResolver(loginSchema)
  })
  const loginForm = (data) => {
    for (let i in users) {
      if (
        users[i].email === data.email &&
        users[i].password === data.password
      ) {
        setCurrentUser(users[i])
        closeLogIn()
      }
    }
  };
  return (
  <Portal htmlLink='nav'>
    <div className={
            openState
            ? classNames(styles[wrapPos],styles[wrap])
            : styles.modalLogInWrapClose
          }>  
      <form 
        className={(styles.regandlogform)}
        onSubmit={handleSubmit((data) => loginForm(data))}>
        <h3 className={styles.regandlogform__title}>LOGIN</h3>
        <img src={close} onClick={() => closeLogIn()} />
        <div className={styles.regandlogform__form}>
          {inputPropsList.map((item)=>{
                  return (
                    <FormInput name={item.name} pattern={item.pattern} register={register} key={item.id}  label={item.label} errors={errors}/>
                  )
          })}
          <CustomButton type="submit" className="modalBtn">
            Log In
          </CustomButton>
          <p>
            Don`t have an account?{" "}
            <button onClick={() => openModalYouDontHaveAccout()}>
              Register
            </button>
          </p>
        </div>
      </form>
    </div>
  </Portal>
  );
};

export default ModalLogin