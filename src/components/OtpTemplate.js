import Heading from "./Heading";
import Paragraph from "./Paragraph";

function OtpTemplate({ name, otp }) {
  return (
    <>
      <Heading tag="h2" title={`Hi ${name}`} />
      {/* <h2>{`Hi ${name}`}</h2>
      <p>{`your otp is ${otp}`}</p> */}
      <Paragraph title={`your otp is ${otp}`} />
    </>
  );
}

export default OtpTemplate;
