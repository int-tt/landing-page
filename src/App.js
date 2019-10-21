import React, { useState, useEffect } from "react";
// import logo from './logo.svg';
import "./App.css";
import { getResponseCount, postResponse } from "./backend";

const errorMessages = {
  name: {
    required: "Name should be filled"
  },
  email: {
    required: "Email should be filled",
    "not-unique": "Email should be unique"
  },
  base: {
    something: "Something went wrong"
  }
};

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [responseCount, setResponseCount] = useState();
  const [fetchStatus, setFetchStatus] = useState("loading");
  const [registerStatus, setRegisterStatus] = useState({
    type: "pending",
    error: {}
  });

  useEffect(() => {
    getResponseCount()
      .then(res => {
        setResponseCount(res);
        setFetchStatus("loaded");
      })
      .catch(e => {
        console.log(e.message);
        setFetchStatus("error");
      });
  }, []);

  let buttonMessage = "";
  switch (fetchStatus) {
    case "loading":
      buttonMessage = "loading...";
      break;
    case "loaded":
      buttonMessage = `Vouch with ${responseCount} other's`;
      break;
    case "error":
      buttonMessage = "I'll vouch for that";
      break;
    default:
  }

  const content = submitted ? (
    <p>
      Thanks for joining in!
      <br />
      When we're ready to wow you, <br />
      You'll get an email.
    </p>
  ) : (
      <form
        onSubmit={event => {
          event.preventDefault();
          setRegisterStatus({ type: "sending", error: {} });

          postResponse({ email, name })
            .then(e => {
              if (e.status === "error") {
                setRegisterStatus({ type: "error", error: e.issues });
                return;
              }

              setSubmitted(true);
            })
            .catch(e => {
              // unknown error
              setRegisterStatus({ type: "error", error: { base: "something" } });
            });
        }}
      >
        <p>
          A social network, <br />
          Where you are the customer. <br />
          Ad free. Launching soon.
      </p>

        <label>
          Name:
        <input
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          />
          {
            <p className="App-error">
              {errorMessages.name[registerStatus.error.name]}
            </p>
          }
        </label>

        <label>
          Email:
        <input
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          {
            <p className="App-error">
              {errorMessages.email[registerStatus.error.email]}
            </p>
          }
        </label>

        {
          <p className="App-error">
            {errorMessages.base[registerStatus.error.base]}
          </p>
        }
        <button type="submit" disabled={registerStatus.type === "sending"}>
          {buttonMessage}
        </button>
      </form>
    );

  return <div className="App">{content}</div>;
}

export default App;
