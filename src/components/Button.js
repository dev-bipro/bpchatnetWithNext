function Button({ onClick, className, type, title }) {
  return (
    <button onClick={onClick} className={className} type={type}>
      {title}
    </button>
  );
}

export default Button;
