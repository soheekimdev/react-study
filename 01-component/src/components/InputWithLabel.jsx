// eslint-disable-next-line react/prop-types
function InputWithLabel({ label, placeholder }) {
  return (
    <div>
      <label>{label}</label>
      <input type="text" placeholder={placeholder} />
    </div>
  );
}

export default InputWithLabel;
