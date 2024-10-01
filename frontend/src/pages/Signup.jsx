import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { BottomWarming } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";

export const Signup = () => {
  //declaring useState variable to get the values of the from inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Message state for feedback

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          username,
          firstName,
          lastName,
          password,
        }

      );
      localStorage.setItem("token" , response.data.token);

      // Success response from backend
      setMessage(response.data.message); // Show success message
    } catch (error) {
      // Error handling: Check if the response has a message
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message); // Show backend error message
      } else {
        setMessage("Something went wrong!"); // Fallback message
      }
    }
  };

  return (
    <>
      <div className="bg-slate-400 h-full flex justify-center">
        <div className="flex flex-col justify-center   w-3/4 md:w-2/4">
          <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
            <Heading label="Sign up"></Heading>
            <SubHeading label="Enter your information to create an account"></SubHeading>

            <Input
              label={"First Name"}
              placeholder={"John"}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            ></Input>
            <Input
              label={"Last Name"}
              placeholder={"Doe"}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            ></Input>
            <Input
              label={"Email"}
              placeholder={"John@gmail.com"}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            ></Input>
            <Input
              label={"Password"}
              placeholder={"******"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Input>
            <Button
              label={"Sign up"}
              onClick={handleSignup} // Call handleSignup on click
            ></Button>

            {/* Display message (success or error) */}
            {message && <div className="text-red-500 py-3">{message}</div>}

            <BottomWarming
              text={"Already have a User? "}
              link={"SignIn"}
            ></BottomWarming>
          </div>
        </div>
      </div>
    </>
  );
};
