import "./Header.scss";

import { Link, useLocation } from "react-router-dom";

import Cookies from "js-cookie";

import logo from "../../Vinted-logo.svg.png";
import { useEffect } from "react";

const Header = (props) => {
  const {
    bearerPresent,
    bearerToken,
    setBearerToken,
    userSearch,
    setUserSearch,
    userRank,
    setUserRank,
  } = props;

  const { pathname } = useLocation();

  useEffect(() => {
    const tokenUser = Cookies.get("bearerToken");
    setBearerToken(tokenUser);
    // eslint-disable-next-line
  }, [bearerPresent]);

  // ** Form **
  const catchUserSearch = (event) => {
    const newValue = event.target.value;
    setUserSearch(newValue);
  };

  return (
    <header className="container">
      <div className="Header__logo">
        <Link to={"/"}>
          <img src={logo} alt="" />
        </Link>
        <i class="fas fa-bars"></i>
      </div>

      <div className="Header__setSearch">
        <div className="Header__search">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Recherche des articles"
            value={userSearch}
            onChange={catchUserSearch}
          />
        </div>

        <div className={pathname === "/" ? "setSearch" : "setSearch--hidden"}>
          <p>Trier par prix :</p>
          <div
            onClick={() => {
              if (userRank === "price-asc") {
                setUserRank("price-desc");
              } else {
                setUserRank("price-asc");
              }
            }}
          >
            <div
              className={
                userRank === "price-asc"
                  ? "setSearch__priceVar"
                  : "setSearch__priceVar setSearch__priceVar--right"
              }
            >
              <i
                className={
                  userRank === "price-asc"
                    ? "fas fa-arrow-down"
                    : "fas fa-arrow-up"
                }
              ></i>
            </div>
          </div>
        </div>
      </div>

      {bearerToken ? (
        <div
          className="Header__btn Header__btn--disconnect"
          onClick={() => {
            setBearerToken("");
            Cookies.remove("bearerToken");
            Cookies.remove("userID");
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

          <Link to={"/user/login"}>
            <div className="Header__btn">
              <p>Se connecter</p>
            </div>
          </Link>
        </div>
      )}

      <Link to={bearerToken ? "/offer/publish" : "/user/login"}>
        <div className="Header__btn Header__btn--blueBack">
          <p>Vends tes articles</p>
        </div>
      </Link>
    </header>
  );
};

export default Header;
