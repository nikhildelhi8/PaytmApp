import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const newName = name.charAt(0).toUpperCase() + name.slice(1);

  const handleTransfer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setMessage(response.data.message);
      setAlertVisible(true);

      // Hide alert after 3 seconds
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    } catch (error) {
      // Handle error response
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Something went wrong!");
      }
      setAlertVisible(true);

      // Hide alert after 3 seconds
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    }
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {name[0].toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{newName}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="amount">
                  Amount (in Rs)
                </label>
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={handleTransfer}
                className="justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              >
                Initiate Transfer
              </button>

              {/* Alert Box */}
              {alertVisible && (
                <div
                  className={`alert ${
                    message.includes("successful")
                      ? "bg-green-300"
                      : "bg-red-300"
                  } text-white p-2 rounded`}
                >
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
