import "./Signup.scss";

import axios from "axios";
import Cookies from "js-cookie";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [emailUser, setEmailUser] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [newsletter, setNewsLetter] = useState(false);

  const { setBearerPresent } = props;

  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    try {
      const newUser = {
        email: emailUser,
        username: nameUser,
        password: passwordUser,
        newsletter: newsletter,
      };

      const response = await axios.post(
        "https://vinteddeploy.herokuapp.com/user/signup",
        newUser
      );

      const token = await response.data.token;

      Cookies.set("bearerToken", token, { expires: 360 });

      setBearerPresent(true);
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="Signup">
      <h1>S'inscrire</h1>
      <form>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={nameUser}
          onChange={(event) => {
            const value = event.target.value;
            setNameUser(value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => {
            const value = event.target.value;
            setEmailUser(value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            const value = event.target.value;
            setPasswordUser(value);
          }}
        />

        <div className="Signup__checkbox">
          <input
            type="checkbox"
            name="newsletter"
            onChange={() => {
              setNewsLetter(!newsletter);
            }}
          />
          <label htmlFor="newsletter">S'inscrire à la newsletter</label>
        </div>

        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>

        <button type="submit" onClick={submit}>
          S'inscrire
        </button>
      </form>
      <p>Tu as déjà un compte ? Connecte-toi !</p>
    </div>
  );
};

export default Signup;
