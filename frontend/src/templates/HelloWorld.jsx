import React, { useEffect, useState } from "react";
import axios from "axios";

function HelloWorld() {
  const [message, setMessage] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/hello/")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/message/", {
          message : inputMessage,
        })
        setResponseMessage(response.data.message)
        setInputMessage("")
    } catch (error) {
        console.error("Error Posting Message :", error);
        if (error.response && error.response.data) {
            setResponseMessage(error.response.data.error || "An error occurred");
        } else {
            setResponseMessage("Network error, please try again.");
        }
      }
  }

    const fetchGreeting = async (value) => {
      if (!value.trim()) {
        setGreeting(""); // clear if input is empty
        return;
      }
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/greeting/${value}/`);
        setGreeting(response.data.message);
      } catch (error) {
        console.error("Error fetching greeting:", error);
        setGreeting("Could not fetch greeting.");
      }
    };
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Django + React Test</h1>
      <ul>
        {message.map((value, index) => {
            return <li key={index}>{value}</li>
        })}
      </ul>
      
      <h2>For sending Message</h2>
      <form onSubmit={handleSubmit} method="post">
        <input 
            type="text"
            name="message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
                
        />

        <button type="submit">Submit</button>
      </form>

      { responseMessage && <h2>Response : {responseMessage}</h2>}

      <h2>For Dynamic routing</h2>
        <input
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => {
            setName(e.target.value);
            fetchGreeting(e.target.value); // fetch greeting on change
        }}
      />

      {/* Show Greeting */}
      {greeting && <h2>{greeting}</h2>}
    </div>
  );
}

export default HelloWorld;
