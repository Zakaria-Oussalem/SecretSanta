import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

function CreateSessionPage() {
  const [username, setUsername] = useState("");
  const [players, setPlayers] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${"http://127.0.0.1:5000"}/users`, {
        username,
        role: "admin",
        players,
      });
      console.log(username);
      console.log(players);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {}, []);
  return (
    <div className="App">
      <header className="App-header">
        <div className="title-box">
          <h1>Secret Santa - Session Creation</h1>
        </div>
        {/* a box h2 title saying Number of players and the entry below it and a submit button on the side * */}
        <div className="small-box">
          <h3>Choose number of players and your name</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="submitForm">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="players">Number of players</label>
            <input
              type="text"
              name="players"
              id="players"
              value={players}
              onChange={(e) => setPlayers(e.target.value)}
            />
            <button type="submit" className="button">
              Submit
            </button>
          </div>
        </form>
      </header>
    </div>
  );
}

//   const handleSubmit = async (event) => {
//     const { data } = await axios.post("${baseURL}/session");
//     event.preventDefault();
//     console.log(data);
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <div className="title-box">
//           <h1>Secret Santa - Session Creation</h1>
//         </div>
//         {/* a box h2 title saying Number of players and the entry below it and a submit button on the side * */}
//         <div className="small-box">
//           <h3>Choose number of players and your name</h3>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             name="username"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             type="text"
//             name="role"
//             id="role"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//           />
//           <button type="submit">Submit</button>
//         </form>
//         <div>
//           <button className="Submitbutton button">Submit</button>
//         </div>
//       </header>
//     </div>
//   );
// }

export default CreateSessionPage;
