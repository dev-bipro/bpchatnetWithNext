import { connect } from "mongoose";
import { dbConnect } from "@/lib/db";
import emailCheck from "@/lib/helpers/auth/emailCheck";
// import inputFieldsCheck from "@/lib/helpers/auth/inputFieldsCheck";
import {
  loginInputsCheck,
  regInputsCheck,
} from "@/lib/helpers/auth/inputFieldsCheck";
import { userModel } from "@/lib/model/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import isAccount from "@/lib/helpers/auth/isAccount";
import nodemailer from "nodemailer";
// import otpTemplate from "@/lib/helpers/auth/otpTemplate";
// import OtpTemplate from "@/components/otpTemplate";
// import { data, data } from "autoprefixer";

export async function POST(req) {
  const reqdata = await req.json();
  console.log(req);
  const { name, email, password } = reqdata;
  //   console.log(emailCheck(reqdata.email));
  // console.log(Boolean(inputFieldsCheck(name, email, password)));
  const inputsErrors = regInputsCheck(name, email, password);
  if (inputsErrors) {
    return NextResponse.json({ message: inputsErrors }, { status: 400 });
  } else {
    if (!emailCheck(email)) {
      return NextResponse.json({ message: "inputsErrors" }, { status: 400 });
    } else {
      try {
        await connect(dbConnect);
        const isAnAccount = await isAccount(email);
        //   console.log(Boolean(isAnAccount));
        if (isAnAccount) {
          return NextResponse.json(
            { message: "you have already account" },
            { status: 400 }
          );
        } else {
          //   try {
          const hash = bcrypt.hashSync(password, 10);
          const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
          });
          // console.log(otp);
          //   // bcrypt.hash(password, 10, async function (err, r) {
          //   // result == true
          // console.log(hash);
          //   // console.log(err);

          let data = new userModel({
            name,
            email,
            password: hash,
            otpForVerify: otp,
          });
          data = await data.save();

          data = data.toObject();
          delete data.password;

          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              user: "roh17ra@gmail.com",
              pass: "iehg ujwq ewyv hthb",
            },
          });
          const info = await transporter.sendMail({
            from: "roh17ra@gmail.com", // sender address
            to: data.email, // list of receivers
            subject: "Please Verify", // Subject line
            //   html: otpTemplate(data.name, data.otpForVerify), // html body
            //   html: <OtpTemplate name={data.name} otp={data.otpForVerify} />, // html body
            html: `your otp ${data.otpForVerify}`, // html body
            // text: "ami",
          });

          delete data.otpForVerify;
          console.log(data);
          setTimeout(async () => {
            await userModel.findOneAndUpdate(
              { email: data.email },
              {
                $unset: { otpForVerify: "" },
              }
            );
          }, 50000);
          return NextResponse.json(
            { result: data, message: "Registration Successfully" },
            { status: 200 }
          );
          //   });
          //   } catch (error) {
          //     return NextResponse.json(
          //       { message: "Internal Server Error" },
          //       { status: 500 }
          //     );
          //   }
        }
      } catch (error) {
        return NextResponse.json(
          { message: "Internal Server Error" },
          { status: 500 }
        );
      }
    }
  }
}
export async function PUT(req) {
  const reqdata = await req.json();
  // console.log(req);
  const { email, password } = reqdata;
  //   console.log(emailCheck(reqdata.email));
  // console.log(Boolean(inputFieldsCheck(name, email, password)));
  const inputsErrors = loginInputsCheck(email, password);
  if (inputsErrors) {
    return NextResponse.json({ message: inputsErrors }, { status: 400 });
  } else {
    if (!emailCheck(email)) {
      return NextResponse.json({ message: "inputsErrors" }, { status: 400 });
    } else {
      try {
        await connect(dbConnect);
        let data = await userModel.findOne({ email: email });
        console.log(data);
        if (!data) {
          return NextResponse.json(
            { message: "unauthorized error" },
            { status: 401 }
          );
        } else {
          const matchPass = await bcrypt.compare(password, data.password);
          data = data.toObject();
          delete data.password;
          // result == true
          console.log(matchPass);
          if (!matchPass) {
            return NextResponse.json(
              { message: "invalid password" },
              { status: 400 }
            );
          } else {
            return NextResponse.json(
              { result: data, message: "Login Successfully" },
              { status: 200 }
            );
          }
          // });
        }

        // return NextResponse.json({ result: data }, { status: 200 });
      } catch (error) {
        return NextResponse.json(
          { message: "Internal Server Error" },
          { status: 500 }
        );
      }
    }
  }
}
