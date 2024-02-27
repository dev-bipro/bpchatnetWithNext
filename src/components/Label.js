function Label({ forLabel, className, title }) {
  return (
    <label htmlFor={forLabel} className={className}>
      {title}
    </label>
  );
}

export default Label;
