import { connect } from "mongoose";
import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";
import otpGenerator from "otp-generator";
import { userModel } from "@/lib/model/user";
import { forgetInputsCheck } from "@/lib/helpers/auth/inputFieldsCheck";
import emailCheck from "@/lib/helpers/auth/emailCheck";
import nodemailer from "nodemailer";

export async function POST(req) {
  const reqData = await req.json();
  // const { email } = reqData;
  console.log(reqData);

  //   const alreadyAccount = await isAccount(email);
  const inputErrors = forgetInputsCheck(reqData);
  const validEmail = emailCheck(reqData);
  if (inputErrors) {
    return NextResponse.json({ message: inputErrors.email }, { status: 400 });
  } else {
    if (!validEmail) {
      return NextResponse.json(
        { message: "please type a valid email" },
        { status: 400 }
      );
    } else {
      try {
        await connect(dbConnect);
        const otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          specialChars: false,
        });
        let updateValue = await userModel.findOneAndUpdate(
          { email: reqData },
          { $set: { forgetOtp: otp } },
          { new: true }
        );

        if (!updateValue) {
          return NextResponse.json(
            { message: "you have no account" },
            { status: 401 }
          );
        } else {
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
            to: updateValue.email, // list of receivers
            subject: "Please Verify", // Subject line

            html: `your otp ${updateValue.forgetOtp}`, // html body
          });
          updateValue = updateValue.toObject();
          delete updateValue.forgetOtp;
          setTimeout(async () => {
            await userModel.findOneAndUpdate(
              { email: updateValue.email },
              { $unset: { forgetOtp: otp } }
            );
          }, 50000);
          
          return NextResponse.json(updateValue);
        }
      } catch (error) {
        console.error("Error updating document:", error);
        return NextResponse.json(
          { message: "An error occurred while updating the document" },
          { status: 500 }
        );
      }
    }
  }
}
