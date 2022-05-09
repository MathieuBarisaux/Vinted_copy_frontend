import "./App.scss";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

// ** Components **
import Header from "./components/Header/Header";

// ** Containers **
import Home from "./containers/Home/Home";
import Offer from "./containers/Offer/Offer";
import Signup from "./containers/Signup/Signup";
import Login from "./containers/Login/Login";
import PublishOffer from "./containers/PublishOffer/PublishOffer";

function App() {
  const [allOffers, setAllOffers] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [bearerToken, setBearerToken] = useState("");
  const [bearerPresent, setBearerPresent] = useState(false);

  const [userSearch, setUserSearch] = useState("");
  const [userRank, setUserRank] = useState("price-asc");

  useEffect(() => {
    const fetchAllOffers = async () => {
      try {
        const title = `title=${userSearch}`;
        const rank = `&sort=${userRank}`;

        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?${title}${rank}`
        );

        setAllOffers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchAllOffers();
  }, [userSearch, userRank]);

  return (
    <div className="App">
      <Router>
        <Header
          bearerPresent={bearerPresent}
          setBearerPresent={setBearerPresent}
          bearerToken={bearerToken}
          setBearerToken={setBearerToken}
          userSearch={userSearch}
          setUserSearch={setUserSearch}
          userRank={userRank}
          setUserRank={setUserRank}
        />
        <Routes>
          <Route
            path="/"
            element={<Home isLoading={isLoading} allOffers={allOffers} />}
          />
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/user/signup"
            element={
              <Signup
                bearerPresent={bearerPresent}
                setBearerPresent={setBearerPresent}
              />
            }
          />
          <Route
            path="/user/login"
            element={
              <Login
                bearerPresent={bearerPresent}
                setBearerPresent={setBearerPresent}
              />
            }
          />
          <Route
            path="/offer/publish"
            element={<PublishOffer bearerToken={bearerToken} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
