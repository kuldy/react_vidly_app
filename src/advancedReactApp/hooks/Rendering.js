import { library } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Rendering = () => {
  const [users, setUsers] = useState([]);

  // const getUser = async () => {
  //   const result = await axios.get(
  //     "https://jsonplaceholder.typicode.com/users"
  //   );
  //   console.log("result is", result);
  //   setUsers(result.data);
  // };
  useEffect(() => {
    console.log("use effect called");
    async function getUser() {
      const result = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      console.log("result is", result);
      setUsers(result.data);
    }
    getUser();
  }, []);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Rendering;
