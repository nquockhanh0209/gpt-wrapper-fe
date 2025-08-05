import React, { useState } from "react";

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [chatMode, setChatMode] = useState("Default");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="flex-1 bg-[#343541] flex flex-col justify-between">
      {/* Dropdown selector */}
      <div className="px-6 py-4 border-b border-[#40414f]">
        <select
          value={chatMode}
          onChange={(e) => setChatMode(e.target.value)}
          className="bg-[#40414f] text-white text-sm p-2 rounded-md border border-[#555] focus:outline-none"
        >
          <option value="Default">🧠 Default</option>
          <option value="Creative">✨ Creative</option>
          <option value="Developer">👨‍💻 Developer</option>
          <option value="Research">📚 Research</option>
        </select>
      </div>

      {/* Message history */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg ${
                msg.sender === "user"
                  ? "bg-[#2e2f32] text-white"
                  : "bg-[#444654] text-gray-100"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-[#40414f]">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message (${chatMode} mode)...`}
            className="flex-1 bg-[#40414f] text-white p-3 rounded-lg border border-[#555] focus:outline-none"
          />
          <button
            type="submit"
            className="bg-white text-black px-4 py-2 rounded-lg font-semibold"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
