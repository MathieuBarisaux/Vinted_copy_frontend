import "./Offer.scss";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Offer = () => {
  const offerId = useParams();
  const [offer, setOffer] = useState("");
  const [offerIsLoading, setOfferIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/offer/${offerId.id}`
        );
        setOffer(response.data);
        setOfferIsLoading(false);
        console.log(offer);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchOffer();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="Offer">
      {offerIsLoading === false && (
        <div className="ProductContainer">
          <img src={offer.product_image} alt="Vêtement en vente" />
          <div className="ProductContainer__infos">
            <p>{offer.product_price} €</p>
            <ul>
              {offer.product_details.map((item, index) => {
                const object = Object.keys(item);
                return (
                  <li key={index}>
                    <span>{object}</span>
                    <span>{item[object]}</span>
                  </li>
                );
              })}
            </ul>
            <p>{offer.product_name}</p>
            <p>{offer.product_description}</p>
            <div className="ProductContainer__user">
              {offer.owner.account.avatar && (
                <img src={offer.owner.account.avatar} alt="User profil" />
              )}
              <p>{offer.owner.account.username}</p>
            </div>
            <button>Acheter</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;
