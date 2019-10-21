import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {
  const [submitted, setSubmitted] = useState(false)
  const content = submitted ? (
    <p>
      Thanks for joining in!<br />
      When we're ready to wow you, <br />
      You'll get an email.
    </p>
  ) : (
      <form onSubmit={(event) => {
        setSubmitted(true)
        event.preventDefault()
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
          I'll vouch for that
      </button>
      </form>
    )

  return <div className="App">{content}</div>
}

export default App;
