import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import { getResponseCount } from './backend';

function App() {
  const [submitted, setSubmitted] = useState(false)
  const [responseCount, setResponseCount] = useState()
  const [status, setStatus] = useState("loading")

  useEffect(() => {
    getResponseCount().then(res => {
      setResponseCount(res)
      setStatus("loaded")
    })
      .catch(e => {
        console.log(e.message)
        setStatus("error")
      })
  }, [])
  let buttonMessage = ""
  switch (status) {
    case "loading":
      buttonMessage = "loading..."
      break
    case "loaded":
      buttonMessage = `Vouch with ${responseCount} other's`
      break
    case "error":
      buttonMessage = "I'll vouch for that"
      break
    default:
  }
  const content = submitted ? (
    <p>
      Thanks for joining in!<br />
      When we're ready to wow you, <br />
      You'll get an email.
    </p>
  ) : (
      <form onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(true)
      }}>
        <p>
          A social network, <br />
          Where you are the customer. <br />
          Ad free. Launching soon.
      </p>
        <label>
          Name:
        <input value='' />
        </label>
        <label>
          Email:
        <input value='' />
        </label>
        <button type="submit">
          {buttonMessage}
        </button>
      </form>
    )

  return <div className="App">{content}</div>
}

export default App;
