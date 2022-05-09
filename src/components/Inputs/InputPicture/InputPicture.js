import { useState } from "react";

const InputPicture = (props) => {
  const { product_picture, setProduct_picture } = props;

  const [pictureIsUpload, setPictureIsUpload] = useState(false);

  const upPicture = (event) => {
    setPictureIsUpload(true);
    setProduct_picture(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  return (
    <div className="Input InputPicture">
      <label htmlFor="file">
        <i className="fas fa-plus"></i>
        <p>Ajoute une photo</p>
      </label>
      <input type="file" id="file" onChange={upPicture} />

      {pictureIsUpload && <p>Vous avez choisi : {product_picture.name} 🙂</p>}
    </div>
  );
};

export default InputPicture;
