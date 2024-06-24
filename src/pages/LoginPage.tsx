//@ts-ignore
import { appFirebase } from "../firebaseconfig.js";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const auth = getAuth();
  const navigate = useNavigate();

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
      console.log("Error al ingresar: ", error);
    }
  };

  const resetPass = async () => {
    try {
      if (!dataForm.email) alert("ingrese un email para reestablecer password");
      await sendPasswordResetEmail(auth, dataForm.email);
      alert(
        "Revise la bandeja de su correo para reestablecer la password, si no lo puede ver, revise la bandeja de spam"
      );
    } catch (error) {}
  };

  return (
    <div className="form-container">
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
          <a href="#" onClick={resetPass}>
            Reestablecer password
          </a>
        </span>

        <button id="ingresar">Ingresar</button>
      </form>
    </div>
  );
};

export default LoginPage;
