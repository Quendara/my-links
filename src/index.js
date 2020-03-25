import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
import { List } from "./list";
import { Auth } from "./auth";

import Settings from "./Settings";

const App = () => {
  const [username, setUsername] = useState("");
  const [jwtTocken, setJwtToken] = useState("");
  const [items, setItems] = useState([]);
  const [once, setOnce] = useState(true);

  const authSuccessCallback = (username, token) => {
    setUsername(username);
    setJwtToken(token);

    console.log("username", username);
    console.log("authSuccess", token);
  };

  useEffect(() => {
    const fakeToken = "bnbvbnvbnvnb";

    // if (jwtTocken.length > 0 && items.length == 0 && once )
    if (once) {
      setOnce(false);
      // fetch URL with valid token
      const url = Settings.baseAwsUrl + "links";

      console.log("useEffect");

      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: fakeToken
        }
      };

      fetch(url, options)
        .then(res => res.json())
        .then(
          result => {
            console.log("result", result);
            setItems(result);
          },
          function(error) {
            console.error(error.message);
          }
        );
    }
  });

  // handles
  const addItemHandle = (name, link) => {
    const id = new Date().getTime();
    setItems([...items, { name, link, id }]); // push to the end
  };

  const removeItemHandle = id => {
    const items2 = items.filter(item => item.id !== id);
    setItems(items2); // push to the end
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand bg-dark">
        <a className="navbar-brand" href="#">
          Home
        </a>
        <Auth authSuccessCallback={authSuccessCallback} />
      </nav>
      <hr />
      {username.length > 0 && (
        <List
          items={items}
          addItemHandle={addItemHandle}
          removeItemHandle={removeItemHandle}
        />
      )}
    </div>
  );
};

render(<App />, document.getElementById("root"));
