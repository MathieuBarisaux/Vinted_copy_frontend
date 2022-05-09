import "../Inputs.scss";

const InputArea = (props) => {
  const { type, title, placeholder, valueToSet, setValue } = props;

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  return (
    <div className="Input Input__Text">
      <p>{title}</p>
      <textarea
        type={type}
        onChange={handleChange}
        placeholder={placeholder}
        rows={5}
      />
    </div>
  );
};

export default InputArea;
