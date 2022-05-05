import "./Home.scss";

import { Link } from "react-router-dom";

import bannerPicture from "../../banner-wide-9b45d0aa9a311c4ff6013e9cf3bc2b6646468be3d2f553192c63598685fcc177.jpeg";

const Home = ({ allOffers, isLoading }) => {
  return (
    <main>
      <div className="Banner">
        <div className="Banner__img">
          <img src={bannerPicture} alt="Banner" />
        </div>

        <div className="Banner__CallToAction container">
          <div>
            <p>
              Prêt à faire du tri <br /> dans vos placards ?
            </p>
            <button>Commencer à vendre</button>
            <p>Découvrir comment ça marche</p>
          </div>
        </div>
      </div>

      <div className="AllOffersContainer container">
        {isLoading !== true &&
          allOffers.offers.map((item) => {
            const avatar = item.owner.account.avatar;
            const offerPicture = item.product_image.secure_url;
            const tall = item.product_details[1].TAILLE;
            const origin = item.product_details[0].MARQUE;

            return (
              <Link to={`offer/${item._id}`} key={item._id}>
                <div className="OfferContainer">
                  <div className="OfferContainer__saler">
                    {avatar && <img src={avatar.secure_url} alt="" />}
                    <p>{item.owner.account.username}</p>
                  </div>
                  <img
                    src={offerPicture && offerPicture}
                    alt="Vêtement de l'annonce"
                  />
                  <div className="OfferContainer__infos">
                    <p>{item.product_price} €</p>
                    <p>{tall && tall}</p>
                    <p>{origin && origin}</p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </main>
  );
};

export default Home;
