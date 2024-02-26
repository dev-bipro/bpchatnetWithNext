export default function Heading(props) {
  const { className, title } = props;
  console.log(title);
  return <props.tag className={className}>{title}</props.tag>;
}
