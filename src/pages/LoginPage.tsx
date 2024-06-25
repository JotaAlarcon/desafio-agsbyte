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

  const errorLoginToast = () =>
    toast.error("Error al ingresar, verifique sus credenciales.");
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

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        dataForm.email,
        dataForm.password
      );

      navigate("/Dashboard", {
        replace: true,
        state: {
          logged: true,
          email: userCredential.user.email,
        },
      });
    } catch (error) {
      errorLoginToast();
    }
  };

  const resetPass = async () => {
    try {
      if (!dataForm.email) alert("ingrese un email para reestablecer password");
      await sendPasswordResetEmail(auth, dataForm.email);
      resetPassToast();
    } catch (error) {}
  };

  return (
    <div className="container">
      <div className="form-container">
        <ToastContainer position="top-center" autoClose={7000} />
        {<h2>Login</h2>}
        <form className="form" onSubmit={onSubmit}>
          <input
            className="custom-input"
            name="email"
            type="email"
            placeholder="Email"
            value={dataForm.email}
            onChange={handleChangeInput}
            required
          />
          <input
            className="custom-input"
            name="password"
            type="password"
            placeholder="Password"
            value={dataForm.password}
            onChange={handleChangeInput}
            required
          />

          <span>
            <a className="ancord" href="#" onClick={resetPass}>
              Reestablecer password
            </a>
          </span>

          <button id="ingresar">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
