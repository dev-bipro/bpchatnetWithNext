function Input({ onChange, className, type, placeholder, name, id, value }) {
  return (
    <input
      onChange={onChange}
      className={className}
      type={type}
      placeholder={placeholder}
      name={name}
      id={id}
      value={value}
    />
  );
}

export default Input;
