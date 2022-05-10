import "./Payment.scss";

import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

const Payment = (props) => {
  const { basket } = props;
  const totalPrice = Math.round((basket.product_price + 0.4 + 0.8) * 100) / 100;

  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const Redirection = () => {
    navigate("/");
  };

  const checkout = async (event) => {
    event.preventDefault();

    setPaymentInProgress(true);
    const userID = Cookies.get("userID");

    // Je récup les données CB du user
    const cardElement = elements.getElement(CardElement);
    // J'envoi les elements à stripe pour validation
    const stripeResponse = await stripe.createToken(cardElement, {
      name: userID,
    });

    const stripeToken = stripeResponse.token.id;
    const productID = basket._id;
    // J'envoi le token à mon server pour envoyer le paiement à Stripe
    const response = await axios.post(
      "https://vinteddeploy.herokuapp.com/pay",
      {
        stripeToken: stripeToken,
        userID: userID,
        productID: productID,
      }
    );

    if (response.data.status === "succeeded") {
      setPaymentCompleted(true);
      setTimeout(() => {
        Redirection();
      }, 2000);
    }
  };

  return (
    <div className="Payment">
      {paymentCompleted ? (
        <div className="PaymentContainer">
          <h1>
            Votre commande a été passé avec succès, vous allez être redirigez
            d'ici quelques secondes... <br />
            <i className="fas fa-spinner"></i>
          </h1>
        </div>
      ) : (
        <div className="PaymentContainer">
          <p>Résumé de la commande</p>
          <ul>
            <li>
              <span>Commande</span>
              <span>{basket.product_price} €</span>
            </li>
            <li>
              <span>Frais protection acheteurs</span>
              <span>0.40 €</span>
            </li>
            <li>
              <span>Frais de port</span>
              <span>0.80 €</span>
            </li>
          </ul>
          <p>
            <span>Total</span>
            <span>{totalPrice} €</span>
          </p>
          <p>
            Il ne vous reste plus qu'un étape pour vous offrir ce
            <strong> {basket.product_name}</strong>. Vous allez payer
            <strong> {totalPrice} €</strong> (frais de protection et frais de
            port inclus).
          </p>
          {/* STRIPE */}
          <CardElement />

          <button type="submit" onClick={checkout}>
            Pay
            {paymentInProgress && <i className="fas fa-spinner"></i>}
          </button>
        </div>
      )}
    </div>
  );
};

export default Payment;
