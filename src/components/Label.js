function Label({ forLabel, className, title }) {
  return (
    <label for={forLabel} className={className}>
      {title}
    </label>
  );
}

export default Label;
