import React, { useEffect, useState } from "react";
// import Hello from "../components/Hello";

// export default function Home() { // parent component
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:5000/api/hello")// to get data from backend
//       .then(res => res.json()) // converts backend response data to json
//       .then(data => setMessage(data.message)); //go inside the json data, get message value & set it to message state
//   }, []);

//   return <Hello message={message} />; // child component
// }



import UserList from "../components/UserList";

export default function Home() {
     const [message, setMessage] = useState("");

      useEffect(() => {
    fetch("http://localhost:5000/api/user")// to get data from backend
      .then(res => res.json()) // converts backend response data to json
      .then(data => setMessage(data.message)); //go inside the json data, get message value & set it to message state
  }, []);

  return (
    <div>
      <h1>Hello App</h1>
      <UserList />
    </div>
  );
}
