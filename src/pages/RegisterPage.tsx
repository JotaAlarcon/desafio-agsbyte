// @ts-ignore
import { appFirebase } from "../firebaseconfig.js";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import "../styles/formstyle.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const auth = getAuth();

  const errorPassEquals = () => toast.error("Las password no coinciden");

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    error: "",
  });

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setDataForm((initialValue) => ({
      ...initialValue,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (dataForm.password === dataForm.repeatPassword) {
      createUserWithEmailAndPassword(auth, dataForm.email, dataForm.password)
        .then((userCredential) => {
          const user = userCredential.user;
          const toastSuccess = `Registro exitoso ${user.email}, revise su bandeja de entrada`;
          sendEmailVerification(user);
          toast.success(toastSuccess);
        })
        .catch((error) => {
          const errorCode = error.code;

          if (errorCode == "auth/weak-password")
            toast.error("La password debe contener un mínimo de 6 caractertes");
          if (errorCode == "auth/email-already-in-use")
            toast.error("El usuario ya existe");
          if (errorCode == "auth/invalid-email")
            toast.error("Complete los campos para registrarse");
        });
    } else {
      errorPassEquals();
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <ToastContainer position="top-center" autoClose={7000} />
        {<h2>Registrarse</h2>}

        <form className="form" onSubmit={onSubmit}>
          <input
            className="custom-input"
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={dataForm.email}
            onChange={handleChangeInput}
          />
          <input
            className="custom-input"
            name="password"
            type="password"
            placeholder="Contraseña"
            value={dataForm.password}
            onChange={handleChangeInput}
          />
          <input
            className="custom-input"
            name="repeatPassword"
            type="password"
            placeholder="Repetir contraseña"
            value={dataForm.repeatPassword}
            onChange={handleChangeInput}
          />

          <button id="registrar">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
