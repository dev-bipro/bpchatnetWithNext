import Image from "next/image";
import myLogo from "@/images/myLogo.svg";
import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import Form from "@/components/login/Form";
import Link from "next/link";
// import From from "@/components/registration/From";

export default function Login() {
  return (
    <main className="mt-40 flex flex-col items-center">
      <Image className="w-[122px] mb-5" src={myLogo} alt="BP ChatNet" />
      <Heading
        tag="h1"
        className="font-semibold text-common-text-color text-2xl capitalize mb-1"
        title="login"
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
        <Form />
        <Paragraph
          className="capitalize font-medium text-base text-common-text-color py-1 px-2 mt-4"
          title="Already have an account ?"
        >
          <Link
            className="ml-2 text-background-light-green"
            href="/registration"
          >
            register
          </Link>
        </Paragraph>
      </div>
    </main>
  );
}
