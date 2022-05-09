import "../Inputs.scss";

const InputText = (props) => {
  const { type, title, placeholder, valueToSet, setValue } = props;

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  return (
    <div className="Input Input__Text">
      <p>{title}</p>
      <input
        type={type ? type : "text"}
        onChange={handleChange}
        placeholder={placeholder}
        value={valueToSet}
      />
    </div>
  );
};

export default InputText;
