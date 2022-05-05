import "./Header.scss";

import { Link } from "react-router-dom";

import Cookies from "js-cookie";

import logo from "../../Vinted-logo.svg.png";
import { useEffect } from "react";

const Header = (props) => {
  const { bearerPresent, setBrearerPresent, bearerToken, setBearerToken } =
    props;

  useEffect(() => {
    const tokenUser = Cookies.get("bearerToken");
    setBearerToken(tokenUser);
  }, [bearerPresent]);

  return (
    <header className="container">
      <Link to={"/"}>
        <img src={logo} alt="" />
      </Link>

      <div className="Header__search">
        <i className="fas fa-search"></i>
        <input type="text" placeholder="Recherche des articles" />
      </div>

      {bearerToken ? (
        <div
          className="Header__btn Header__btn--disconnect"
          onClick={() => {
            setBearerToken("");
            Cookies.remove("bearerToken");
          }}
        >
          <p>Se déconnecter</p>
        </div>
      ) : (
        <div className="Header__userInteract">
          <Link to={"/user/signup"}>
            <div className="Header__btn">
              <p>S'inscrire</p>
            </div>
          </Link>

          <div className="Header__btn">
            <p>Se connecter</p>
          </div>
        </div>
      )}

      <div className="Header__btn">
        <p>Vends tes articles</p>
      </div>
    </header>
  );
};

export default Header;
