// @ts-ignore
import { appFirebase } from "../firebaseconfig.js";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
    repeatPassword: "",
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
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          dataForm.email,
          dataForm.password
        );
        if (!userCredential) throw new Error("Error al crear el usuario");
        await sendEmailVerification(userCredential.user);
      } catch (error) {
        alert(error);
      }

      navigate("/Dashboard", {
        replace: true,
        state: {
          logged: true,
          email: dataForm.email,
        },
      });
    } else {
      alert("Las password no coinciden");
    }
  };

  return (
    <div className="form-container">
      {<h2>Registrarse</h2>}

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
        <input
          className="custom-input"
          name="repeatPassword"
          type="password"
          placeholder="Repetir password"
          value={dataForm.repeatPassword}
          onChange={handleChangeInput}
          required
        />

        <button id="registrar">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterPage;
