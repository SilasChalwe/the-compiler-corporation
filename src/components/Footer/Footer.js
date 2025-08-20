import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Footer.css";

function Footer({ sendMessage }) {
  const location = useLocation();
  const [chatInput, setChatInput] = useState("");

  // Only show input if we are on the chat page
  const showInput = location.pathname === "/chat";

  const handleSend = () => {
    if (!chatInput.trim()) return;
    if (typeof sendMessage === "function") {
      sendMessage(chatInput);
      setChatInput("");
    }
  };

  return (
    <footer className="footer">
      {showInput && (
        <div className="chat-footer-wrapper">
          <div className="chat-footer-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}

      <div className="footer-main">
        <p>&copy; {new Date().getFullYear()} The Compiler Corporation. All Rights Reserved.</p>
        <p>
          <a href="/about">About</a> | <a href="/contact">Contact</a> | <a href="/projects">Projects</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
