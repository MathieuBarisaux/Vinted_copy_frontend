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
          `https://lereacteur-vinted-api.herokuapp.com/offer/${offerId.id}`
        );
        setOffer(response.data);
        setOfferIsLoading(false);
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
          <img src={offer.product_image.secure_url} alt="Vêtement en vente" />
          <div className="ProductContainer">
            <p>{offer.product_price}</p>
            <ul>
              <li>MARQUE {offer.product_details[0].MARQUE}</li>
              <li>TAILLE {offer.product_details[1].TAILLE}</li>
              <li>ETAT {offer.product_details[2].ETAT}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;
