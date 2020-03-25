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

    if (token.length > 0 && items.length == 0 ) {
      // if (once) {
      setOnce(false);
      // fetch URL with valid token
      const url = Settings.baseAwsUrl + "links";

      console.log("useEffect");

      const fakeToken = "bnbvbnvbnvnb";

      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      };

      fetch(url, options)
        .then(res => res.json())
        .then(
          result => {
            console.log("result", result);
            setItems(result);
          },
          (error) => {
            console.error( "Could not load links : ", error.message);
          }
        )
        .catch(err => { console.log( "XX", err) })
    }
  };

  useEffect(() => {
    // const fakeToken = "bnbvbnvbnvnb";
    // if (jwtTocken.length > 0 && items.length == 0 && once )
    // // if (once) {
    //   setOnce(false);
    //   // fetch URL with valid token
    //   const url = Settings.baseAwsUrl + "links";
    //   console.log("useEffect");
    //   const options = {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: fakeToken
    //     }
    //   };
    //   fetch(url, options)
    //     .then(res => res.json())
    //     .then(
    //       result => {
    //         console.log("result", result);
    //         setItems(result);
    //       },
    //       function(error) {
    //         console.error(error.message);
    //       }
    //     );
    // }
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
      <br />
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand mr-auto " href="#" >
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
