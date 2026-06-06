import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { IoSend } from "react-icons/io5";
import { SiChatbot } from "react-icons/si";

function App() {
  const [chat, setchat] = useState([]);
  const [input, setinput] = useState("");
  const [show, setshow] = useState(false);

  async function dothis() {
    if (input === "") return;

    const userText = input;
    setchat((prev) => [...prev, { Text: userText, sender: "user" }]);
    setinput("");

    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText }),
    });

    const data = await res.json();
    setchat((prev) => [...prev, { Text: data.message, sender: "bot" }]);
  }

  return (
    <>
      <div className="app">
        <div className="chatbot">
          <SiChatbot size={"50px"} className="icon" />
          <h1 className="text">ChatBot</h1>
        </div>
        <div className="background">
          <div className="chat-container">
            {chat.map((msg, index) => (
              <div key={index} className={`${msg.sender}-container`}>
                <p key={index} className={msg.sender}>
                  {msg.Text}
                </p>
              </div>
            ))}
          </div>

          <div className="input-area">
            <input
              type="text"
              value={input}
              placeholder="Message"
              className="input"
              onChange={(e) => setinput(e.target.value)}
            />
            <button onClick={dothis} className="btn">
              <IoSend size={"20px"} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
