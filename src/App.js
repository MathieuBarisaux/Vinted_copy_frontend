import "./App.scss";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

// ** Components **
import Header from "./components/Header/Header";

// ** Containers **
import Home from "./containers/Home/Home";
import Offer from "./containers/Offer/Offer";
import Signup from "./containers/Signup/Signup";

function App() {
  const [allOffers, setAllOffers] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [bearerToken, setBearerToken] = useState("");
  const [bearerPresent, setBearerPresent] = useState(false);

  useEffect(() => {
    const fetchAllOffers = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );

        setAllOffers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchAllOffers();
  }, []);

  return (
    <div className="App">
      <Router>
        <Header
          bearerPresent={bearerPresent}
          setBearerPresent={setBearerPresent}
          bearerToken={bearerToken}
          setBearerToken={setBearerToken}
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
