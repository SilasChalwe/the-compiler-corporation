import React, { useRef, useEffect, useState } from "react";

function Chat({ messages, loading }) {
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [isNearBottom, setIsNearBottom] = useState(true);

  // Check if user is scrolled near the bottom
  const checkScrollPosition = () => {
    if (!chatContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    setIsNearBottom(distanceFromBottom < 100);
  };

  // Scroll to bottom when new messages arrive and user is near bottom
  useEffect(() => {
    if (isNearBottom) {
      chatEndRef.current?.scrollIntoView({ 
        behavior: "smooth",
        block: "nearest",
        inline: "start"
      });
    }
  }, [messages, loading, isNearBottom]);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Chat messages */}
      <div
        ref={chatContainerRef}
        onScroll={checkScrollPosition}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          backgroundColor: "#f0f4ff",
        }}
      >
        {messages.length === 0 && !loading && (
          <div style={{ textAlign: "center", marginTop: "20%" }}>🤖 Welcome!</div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              padding: "12px 16px",
              borderRadius: "16px",
              maxWidth: "75%",
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#3b82f6" : "#dbeafe",
              color: msg.sender === "user" ? "#fff" : "#1e3a8a",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              lineHeight: "1.5",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              // Ensure long text doesn't cause layout issues
              overflow: "hidden",
            }}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "16px",
              maxWidth: "75%",
              alignSelf: "flex-start",
              backgroundColor: "#dbeafe",
              color: "#1e3a8a",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              lineHeight: "1.5",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            TheCompilerAi is typing...
          </div>
        )}

        <div ref={chatEndRef} />
      </div>
    </div>
  );
}

export default Chat;