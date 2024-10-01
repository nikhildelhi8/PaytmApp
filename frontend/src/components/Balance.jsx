import { useState, useEffect } from "react";
import axios from "axios";

export const Balance = () => {
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState("");

  // Fetch balance when component mounts
  useEffect(() => {
    balanceFunc();
  }, []);

  const balanceFunc = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/balance",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response);

      // Assuming the balance is in response.data.balance
      setBalance(response.data.balance.toFixed(2)); // Update balance state with the correct field
      setMessage(response.data.message); // Handle any success message from the response
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
    <div className="flex my-8 mx-20">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold ml-4 text-lg">Rs {balance}</div>
      {message && <div className="text-red-500 ml-4">{message}</div>}{" "}
      {/* Display any message */}
    </div>
  );
};
