import React, { useEffect, useState } from "react";
import axios from "axios";
import GoingToHome from "../Components/GoingToHome";

const BASE_URL = "http://127.0.0.1:8000/api";

function HelloWorld() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/hello/`)
      .then((res) => setMessages(res.data.message))
      .catch((err) => console.error("Error fetching messages:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    try {
      const res = await axios.post(`${BASE_URL}/message/`, {
        message: inputMessage,
      });
      setResponseMessage(res.data.message);
      setInputMessage("");
      setMessages((prev) => [...prev, inputMessage]);
    } catch (err) {
      console.error("Error posting message:", err);
      setResponseMessage(
        err.response?.data?.error || "Network error, please try again."
      );
    }
  };

  const fetchGreeting = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setGreeting("");
      return;
    }

    try {
      const res = await axios.get(`${BASE_URL}/greeting/${name}/`);
      setGreeting(res.data.message);
    } catch (err) {
      console.error("Error fetching greeting:", err);
      setGreeting("Could not fetch greeting.");
    }
  };

  return (
    <div className="bg-secondary min-vh-100 d-flex flex-column">
      <GoingToHome />

      {/* Centered Content Container */}
      <div
        className="mx-auto p-4"
        style={{ width: "50%", minWidth: "300px", marginTop: "50px" }}
      >
        <h1 className="text-center text-light mb-4">Django + React Test</h1>

        {/* Messages Section */}
        <section className="mb-5">
          <h2 className="text-center text-light mb-3">Messages</h2>
          <ul className="list-group mb-3">
            {messages.map((msg, idx) => (
              <li key={idx} className="list-group-item">
                {msg}
              </li>
            ))}
          </ul>

          <form className="d-flex gap-2 mb-3" onSubmit={handleSubmit}>
            <input
              type="text"
              name="message"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Enter message"
              className="form-control"
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>

          {responseMessage && (
            <div className="text-center mt-2">
              <h5>Response: {responseMessage}</h5>
            </div>
          )}
        </section>

        {/* Dynamic Greeting Section */}
        <section>
          <h2 className="text-center text-light mb-3">Dynamic Greeting</h2>
          <form className="d-flex gap-2 mb-3" onSubmit={fetchGreeting}>
            <input
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
            <button type="submit" className="btn btn-primary">
              Greet Me
            </button>
          </form>

          {greeting && (
            <div className="text-center mt-2">
              <h5>{greeting}</h5>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default HelloWorld;
