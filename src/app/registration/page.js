import Image from "next/image";
import myLogo from "@/images/myLogo.svg";
import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import From from "@/components/registration/From";

export default function Registration() {
  return (
    <main className="mt-40 flex flex-col items-center">
      <Image className="w-[122px] mb-5" src={myLogo} alt="BP ChatNet" />
      <Heading
        tag="h1"
        className="font-semibold text-common-text-color text-2xl capitalize mb-1"
        title="register"
      />
      <Paragraph
        className="font-semibold text-common-text-color text-base opacity-70 capitalize mb-4"
        title="Get your BP ChatNet account now."
      />
      <div className="mb-6 p-4 bg-background-light rounded-base">
        {/* <Paragraph
          className="bg-background-light-green capitalize font-medium text-base text-background-dark-green py-1 px-2 mb-4"
          title="registration sucsess"
        /> */}
        <From />
      </div>
    </main>
  );
}
