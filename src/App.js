// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Pages
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";

function App() {
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  const sendMessage = async (input) => {
    if (!input.trim() || loading) return;

    const userMessage = { sender: "user", text: input, timestamp: Date.now() };
    setMessages((prev) => {
      const updated = [...prev, userMessage];
      sessionStorage.setItem("chatMessages", JSON.stringify(updated));
      return updated;
    });

    setLoading(true);

    try {
      // conversation history
      const conversationHistory = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are TheCompilerAi. Format with markdown." },
            ...conversationHistory,
            { role: "user", content: input },
          ],
        }),
      });

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      const botText = data.choices[0].message.content;

      setMessages((prev) => {
        const updated = [...prev, { sender: "bot", text: botText, timestamp: Date.now() }];
        sessionStorage.setItem("chatMessages", JSON.stringify(updated));
        return updated;
      });
    } catch {
      setMessages((prev) => {
        const updated = [
          ...prev,
          { sender: "bot", text: "⚠️ Could not fetch response.", timestamp: Date.now() },
        ];
        sessionStorage.setItem("chatMessages", JSON.stringify(updated));
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="App" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat messages={messages} loading={loading} />} />
          </Routes>
        </main>
        <Footer sendMessage={sendMessage} />
      </div>
    </Router>
  );
}

export default App;
