import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { BottomWarming } from "../components/BottomWarning";

import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const signInFunc = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          username,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);

      // Success response from backend
      setMessage(response.data.message); // Show success message
      navigate("/dashboard");
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
      <div className="bg-slate-400 h-screen flex justify-center items-center">
        <div className="flex fex-col justify-center ">
          <div className="rounded-lg bg-white w-100  text-center p-2 h-max px-4 ">
            <Heading label="Sign In"></Heading>
            <SubHeading label="Enter your credentials to access your account"></SubHeading>

            <Input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              label={"Email"}
            ></Input>
            <Input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label={"Password"}
            ></Input>

            {message && <div className="text-red-500 py-3">{message}</div>}

            <Button onClick={signInFunc} label={"Sign In"}></Button>
            <BottomWarming
              text={"Dont have an account? "}
              link={"SignUp"}
            ></BottomWarming>
          </div>
        </div>
      </div>
    </>
  );
};
