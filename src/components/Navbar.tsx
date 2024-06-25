import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const auth = getAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);

  const onLogout = async () => {
    try {
      await signOut(auth);
      console.log("Desconectado");

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <header>
        <h1>
          <Link className="logo" to={"/"}>
            Logo
          </Link>
        </h1>

        {state?.logged ? (
          <div>
            <span className="mail">Bienvenido: {state?.email}</span>
            <button onClick={onLogout}>Cerrar sesion</button>
          </div>
        ) : (
          <nav>
            <Link className="link" to={"/login"}>
              Iniciar sesión
            </Link>
            <Link className="link" to={"/Register"}>
              Registrarse
            </Link>
          </nav>
        )}
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;
