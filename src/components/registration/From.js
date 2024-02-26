"use client";

import { useState } from "react";
import Button from "../Button";
import Flex from "../Flex";
import Input from "../Input";
import Label from "../Label";
import { FaUserEdit } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import Paragraph from "../Paragraph";

function From() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("ok", e, formData);
    try {
      const response = await fetch("http://localhost:3000/api/authication", {
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
        body: JSON.stringify(formData), // body data type must match "Content-Type" header
      });
      // console.log(response.json());
      let result = await response.json(); // parses JSON response into native JavaScript objects
      console.log(response.status);
      if (response.status == 200) {
        setAlertMessage(result.message + " " + result.result.name);
      } else {
        setAlertMessage("");
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(alertMessage);
  return (
    <>
      {/* <div> */}
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
      {/* </div> */}
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <Label
            forLabel="name"
            className="capitalize text-common-text-color font-semibold text-base"
            title="full name"
          />
          <Flex className="flex items-center mt-1">
            <span className="text-white placeholder:font-semibold text-base p-2 bg-background-dark">
              <FaUserEdit />
            </span>
            <Input
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              id="name"
              className="py-1 px-2  placeholder:capitalize font-normal text-base w-80 bg-transparent text-common-text-color"
              type="text"
              placeholder="enter your name"
              value={formData.name}
            />
          </Flex>
        </div>
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
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              id="email"
              className="py-1 px-2  placeholder:capitalize font-normal text-base w-80 bg-transparent text-common-text-color"
              type="email"
              placeholder="enter your email"
              value={formData.email}
            />
          </Flex>
        </div>
        <div className="mb-4">
          <Label
            forLabel="password"
            className="capitalize text-common-text-color font-semibold text-base"
            title="password"
          />
          <Flex className="flex items-center mt-2">
            <span className="text-white placeholder:font-semibold text-base p-2 bg-background-dark">
              <RiLockPasswordFill />
            </span>
            <Input
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              id="password"
              className="py-1 px-2  placeholder:capitalize font-normal text-base w-80 bg-transparent text-common-text-color"
              type="password"
              placeholder="enter your password"
              value={formData.password}
            />
          </Flex>
        </div>
        <div>
          {/* <Button type="submit" title="register" /> */}
          <div>
            <Button
              className="py-2 px-6 capitalize bg-background-light-green hover:bg-background-dark-green text-background-dark-green hover:text-background-light-green duration-300"
              type="submit"
              title="register"
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default From;
