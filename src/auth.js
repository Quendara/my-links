import React, { Component, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

import { AmazonCognitoIdentity } from "amazon-cognito-identity-js";

import jwt_decode from "jwt-decode";

// https://www.npmjs.com/package/amazon-cognito-identity-js 

// Or, using CommonJS modules
require("cross-fetch/polyfill");
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");

const Auth = ({ authSuccessCallback }) => {
  const [username, setUsername] = useState("Test");
  const [password, setPassword] = useState("TestUser123");
  const [authError, setAuthError] = useState("");
  const [token, setToken] = useState("");
  const [trySend, setTrySend] = useState(false);

  const handleClick = event => {
    event.preventDefault();

    if (username.length > 0 && password.length > 0) {
      // send ONLY when it's filled out
      // authSuccessCallback(token);

      authImpl(username, password);

      // setUsername("");
      // setPassword("");
      // setTrySend(false);
    } else {
      // indicate that user has tried to send, now how potenial issues on UI
      // setTrySend(true);
    }
  };

  const authImpl = (username, password) => {
    // Amazon Cognito creates a session which includes the id, access, and refresh tokens of an authenticated user.

    const authenticationData = {
      Username: username,
      Password: password
    };

    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
    );

    console.log( authenticationData, "authenticationDetails")
    const poolData = {
      UserPoolId: "eu-central-1_8LkzpXcOV",
      ClientId: "5v3et57vfoqijj81g3ksbidm5k"
    };

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const userData = {
      Username: authenticationData.Username,
      Pool: userPool
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

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

        // Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer
        let idToken = result.idToken.jwtToken;

        let decoded = jwt_decode(idToken);
        console.log(decoded);

        let username = decoded['cognito:username']

        // callback to parent
        authSuccessCallback( username, idToken  )

        setAuthError( "Success" +  JSON.stringify(decoded) );
      },

      onFailure: function(err) {
        console.error( "Cannot log in " , JSON.stringify(err));
        setAuthError( "Cannot log in " +  JSON.stringify(err));
      }
    });
  };

  const getInputClass = val => {
    let ret = "form-control";
    if (val.length > 0) {
      ret += " is-valid";
    } else if (trySend) {
      // show issues when length is 0 and the user has tried to send
      ret += " is-invalid";
    }
    return ret;
  };

  return (
    <a className="list-group-item  ">
      <form onSubmit={handleClick}>
        <div className="form-row">
          <div className="col-6 col-sm-5 mb-3">
            <input
              value={username}
              className={getInputClass(username)}
              placeholder="Name"
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="col-6 col-sm-5 mb-3">
            <input
              value={password}
              className={getInputClass(password)}
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="col-12 col-sm-2 ">
            <button className="btn btn-primary">
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </button>
          </div>
        </div>
      </form>

      <b>{authError}</b>
    </a>
  );
};

export { Auth };

/*



*/
