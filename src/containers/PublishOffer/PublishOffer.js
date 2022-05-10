import "./PublishOffer.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

// ** Components **
import InputText from "../../components/Inputs/InputText/InputText";
import InputArea from "../../components/Inputs/InputArea/TextArea";
import InputPicture from "../../components/Inputs/InputPicture/InputPicture";

const PublishOffer = (props) => {
  const { bearerToken } = props;

  const navigate = useNavigate();

  const [product_picture, setProduct_picture] = useState(null);
  const [product_name, setProduct_name] = useState("");
  const [product_description, setProduct_description] = useState("");
  const [product_brand, setProduct_brand] = useState("");
  const [product_size, setProduct_size] = useState("");
  const [product_color, setProduct_color] = useState("");
  const [product_state, setProduct_state] = useState("");
  const [product_city, setProduct_city] = useState("");
  const [product_price, setProduct_price] = useState("");

  const submitOffer = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("picture", product_picture);
    formData.append("title", product_name);
    formData.append("description", product_description);
    formData.append("price", product_price);
    formData.append("brand", product_brand);
    formData.append("city", product_city);
    formData.append("color", product_color);
    formData.append("size", product_size);
    formData.append("state", product_state);

    const response = await axios.post(
      "https://vinteddeploy.herokuapp.com/offer/publish",
      formData,
      {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      }
    );

    if (response.status === 200) {
      navigate("/");
    } else {
    }
  };

  return (
    <div className="PublishOffer">
      <form className="PublishForm container" onSubmit={submitOffer}>
        <h2>Vends ton article</h2>

        <div className="PublishForm__insert">
          <InputPicture
            product_picture={product_picture}
            setProduct_picture={setProduct_picture}
          />
        </div>

        <div className="PublishForm__insert">
          <InputText
            title={"Titre"}
            placeholder={"ex: Chemise Sézanne verte"}
            valueToSet={product_name}
            setValue={setProduct_name}
          />

          <InputArea
            title={"Décris ton article"}
            placeholder={"ex: Chemise Sézanne verte"}
            valueToSet={product_description}
            setValue={setProduct_description}
          />
        </div>

        <div className="PublishForm__insert">
          <InputText
            title={"Marque"}
            placeholder={"ex: Zara"}
            valueToSet={product_brand}
            setValue={setProduct_brand}
          />

          <InputText
            title={"Taille"}
            placeholder={"ex: L / 40 / 12"}
            valueToSet={product_size}
            setValue={setProduct_size}
          />

          <InputText
            title={"Couleur"}
            placeholder={"ex: Fushia"}
            valueToSet={product_color}
            setValue={setProduct_color}
          />

          <InputText
            title={"Etat"}
            placeholder={"ex: Neuf avec étiquette"}
            valueToSet={product_state}
            setValue={setProduct_state}
          />

          <InputText
            title={"Lieu"}
            placeholder={"ex: Paris"}
            valueToSet={product_city}
            setValue={setProduct_city}
          />
        </div>

        <div className="PublishForm__insert">
          <InputText
            type={"number"}
            title={"Prix"}
            placeholder={"ex: 10€"}
            valueToSet={product_price}
            setValue={setProduct_price}
          />
        </div>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default PublishOffer;
