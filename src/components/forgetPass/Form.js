"use client";

import { useState } from "react";
import Button from "../Button";
import Flex from "../Flex";
import Input from "../Input";
import Label from "../Label";
import { IoMail } from "react-icons/io5";
import Paragraph from "../Paragraph";

function From() {
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("ok", e, formData);
    try {
      const response = await fetch(
        "http://localhost:3000/api/authication/forgetpass",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          // redirect: "follow", // manual, *follow, error
          // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(email), // body data type must match "Content-Type" header
        }
      );
      // console.log(response.json());
      let result = await response.json(); // parses JSON response into native JavaScript objects
      console.log(response.status);
      if (response.status == 200) {
        setAlertMessage(result.message + " " + result.result.name);
      } else {
        setAlertMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {
        alertMessage && (
          // return (

          <Paragraph
            className="bg-background-light-green capitalize font-medium text-base text-background-dark-green py-1 px-2 mb-4"
            title={alertMessage}
          />
        )
        // )
      }
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <Label
            forLabel="email"
            className="capitalize text-common-text-color font-semibold text-base"
            title="email"
          />
          <Flex className="flex items-center mt-2">
            <span className="text-white placeholder:font-semibold text-base p-2 bg-background-dark">
              <IoMail />
            </span>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="py-1 px-2  placeholder:capitalize font-normal text-base w-80 bg-transparent text-common-text-color"
              type="email"
              placeholder="enter your email"
              value={email}
            />
          </Flex>
        </div>

        <div>
          <Button
            className="py-2 px-6 capitalize bg-background-light-green hover:bg-background-dark-green text-background-dark-green hover:text-background-light-green duration-300"
            type="submit"
            title="login"
          />
        </div>
      </form>
    </>
  );
}

export default From;
