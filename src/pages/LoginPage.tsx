//@ts-ignore
import { appFirebase } from "../firebaseconfig.js";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "../styles/formstyle.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const resetPassToast = () =>
    toast.success(
      "Se ha enviado un enlace de recuperacion a su email, si no lo encuentra verifique su bandeja de spam"
    );

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setDataForm((initialValue) => ({
      ...initialValue,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, dataForm.email, dataForm.password)
      .then((userCredential) => {
        navigate("/Dashboard", {
          replace: true,
          state: {
            logged: true,
            email: userCredential.user.email,
          },
        });
      })
      .catch((error) => {
        const errorCode = error.code;

        if (!dataForm.email)
          toast.error("Complete el campo de correo electronico");
        if (!dataForm.password) toast.error("Complete el campo de contraseña");

        if (errorCode == "auth/invalid-credential")
          toast.error("error al ingresar, credenciales inválidas");
      });
  };

  const resetPass = async () => {
    try {
      if (!dataForm.email)
        toast.error("Ingrese un email para reestablecer la contraseña");
      await sendPasswordResetEmail(auth, dataForm.email);
      resetPassToast();
    } catch (error) {}
  };

  return (
    <div className="container">
      <div className="form-container">
        <ToastContainer position="top-center" autoClose={7000} limit={2} />
        {<h2>Login</h2>}
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
            placeholder="contraseña"
            value={dataForm.password}
            onChange={handleChangeInput}
          />

          <span>
            <a className="ancord" href="#" onClick={resetPass}>
              Reestablecer contraseña
            </a>
          </span>

          <button id="ingresar">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
