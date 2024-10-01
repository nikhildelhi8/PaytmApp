import { useState, useEffect } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState([]);

  //debounce logic

  const debounce = (func, delay) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:3000/api/v1/user/bulk?filter=" + filter,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(response.data.user);
      } catch (error) {
        console.error("error fetching users: ", error);
      }
    };

    fetchUsers();
  }, [filter]);

  const handleFilterChange = debounce((e) => {
    setFilter(e.target.value); // Update the filter state based on the input value
  }, 500);

  return (
    <div className="my-8 mx-20">
      <div className="font-bold mt-20 text-2xl">Users</div>
      <div className="my-2">
        <input
          onChange={handleFilterChange}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 mb-5 rounded border-slate-200 hover:shadow-lg"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User key={user._id} user={user}></User>
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center ">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-full">
        <Button
          onClick={() => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
          label={"Send Money"}
        ></Button>
      </div>
    </div>
  );
}
