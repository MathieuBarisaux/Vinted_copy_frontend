import axios from "axios";
import { useState } from "react";

import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");

  const { bearerPresent, setBearerPresent } = props;

  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    try {
      const newUser = {
        email: emailUser,
        password: passwordUser,
      };

      const response = await axios.post(
        "https://vinteddeploy.herokuapp.com/user/login",
        newUser
      );

      const token = await response.data.token;
      const userID = await response.data.id;

      Cookies.set("bearerToken", token, { expires: 360 });
      Cookies.set("userID", userID, { expires: 360 });

      setBearerPresent(!bearerPresent);
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="Signup">
      <h1>Se connecter</h1>
      <form>
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

        <button type="submit" onClick={submit}>
          Se connecter
        </button>
      </form>
      <p>Tu as déjà un compte ? Connecte-toi !</p>
    </div>
  );
};

export default Login;
