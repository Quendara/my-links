import React, { Component } from "react";
import { render } from "react-dom";
import { List } from "./list";

import { AmazonCognitoIdentity } from "amazon-cognito-identity-js";

// Or, using CommonJS modules
require("cross-fetch/polyfill");
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");

// Amazon Cognito creates a session which includes the id, access, and refresh tokens of an authenticated user.

var authenticationData = {
  Username: "test",
  Password: "TestTest123!"
};

https://quendara.auth.eu-central-1.amazoncognito.com/login?response_type=token&client_id=5v3et57vfoqijj81g3ksbidm5k&redirect_uri=https://master.d1fkj6njo6u28e.amplifyapp.com

var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
  authenticationData
);
var poolData = {
  UserPoolId: "eu-central-1_8LkzpXcOV", 
  ClientId: "5v3et57vfoqijj81g3ksbidm5k"
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var userData = {
  Username: authenticationData.Username,
  Pool: userPool
};
var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);


// cognitoUser.changePassword('Test123!', 'UserTest123!', function(err, result) {
//     if (err) {
//         alert(err.message || JSON.stringify(err));
//         return;
//     }
//     console.log('call result: ' + result);
// });  

cognitoUser.authenticateUser(authenticationDetails, {
  onSuccess: function(result) { 
    var accessToken = result.getAccessToken().getJwtToken();

    /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
    var idToken = result.idToken.jwtToken;
  },

  onFailure: function(err) {
    console.error( "Cannot log in ", err );
  }
});

const items = [
  {
    id: 1,
    name: "Tracking - André ",
    link: "https://master.d1skuzk79uqu7w.amplifyapp.com/search?user=andre"
  },
  {
    id: 11,
    name: "Tracking - Irena",
    link: "https://master.d1skuzk79uqu7w.amplifyapp.com/search?user=irena"
  },

  {
    id: 2,
    name: "Todos ",
    link: "https://master.d3cslmw4si24vo.amplifyapp.com/"
  },
  {
    id: 3,
    name: "Bücherei ",
    link:
      "https://katalog.dortmund.de/aDISWeb/app?service=direct/0/Home/%24DirectLink&sp=SOPAC02&sp=SBK00000000"
  }
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "Links"
    };
  }

  render() {
    return (
      <div className="container">
        <hr />
        <List items={items} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
