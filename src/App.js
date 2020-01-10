import React, { useState } from "react";
import axios from "axios";
import classes from "./style.module.css";
import "./font.module.css"

// just using an empty object for prevent app from hanging

export default function App() {
  const [users, setUser] = useState(null);
  const [usersVisible, setVisibility] = useState(new Array(12).fill(false));

  const fetchData = async () => {
    const response = await axios.get(
      "https://yalantis-react-school.herokuapp.com/api/task0/users"
    );

    setUser(response.data);
  };

  const groupedUsers =
    users &&
    users.reduce(
      (acc, n) => {
        acc[new Date(n.dob).getMonth()].users.push(n);
        return acc;
      },
      [...Array(12)].map((n, i) => ({
        month: new Date(0, i).toLocaleString("ru-RU", { month: "long" }),
        users: []
      }))
    );

  return (
    <div className={classes.App}>
      <h1>Users list</h1>

      {/* Fetch data from API */}
      <div>
        <button className="fetch-button" onClick={fetchData}>
          download users
        </button>
        <br />
      </div>

      {/* Display data from API */}
      {}
      <div className={classes.month}>
        {groupedUsers &&
          groupedUsers.map((n, index) => (
            <div
              id="months"
              key={n.month}
              className={
                n.users > 0
                  ? classes.month.grey
                  : n.users > 2
                  ? classes.blue
                  : n.users > 6
                  ? classes.green
                  : classes.red
              }
              onMouseLeave={() =>
                setVisibility(prevVisibility =>
                  Object.assign([], prevVisibility, { [index]: false })
                )
              }
              onMouseOver={() =>
                setVisibility(prevVisibility =>
                  Object.assign([], prevVisibility, { [index]: true })
                )
              }
            >
              <h2>{n.month}</h2>
              {n.users.map(user =>
                usersVisible[index] ? (
                  <div key={user.id} className={classes.user}>
                    <div>
                      <h4 className={classes.userId}>user #{user.id}</h4>
                      <p>👨id: {user.id}</p>
                       <p>firstName: {user.firstName}</p>
                      <p>lastName: {user.lastName}</p>
                    <p>⏰: {user.dob}</p>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
