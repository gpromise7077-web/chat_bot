import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import "tailwindcss";
import { FaArrowUp } from "react-icons/fa";
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
      <div>
        <div className="flex flex-col items-center w-100 h-100">
          <div className="flex items-center bg-[blue] w-100 justify-center p-5">
            <SiChatbot size={"50px"} className="icon" />
            <h1 className="text">MY-ChatBot</h1>
          </div>
          <div className="bg-[azure] w-100 h-500">
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
                placeholder="Type your message..."
                className="input"
                onChange={(e) => setinput(e.target.value)}
              />
              <button onClick={dothis} className="btn">
                <FaArrowUp size={"20px"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
