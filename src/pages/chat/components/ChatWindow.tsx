import React from "react";

export const ChatWindow = ({
  messages,
  input,
  setInput,
  chatMode,
  setChatMode,
  handleSend,
}: any) => {
  const isEmptyChat = messages.length === 0;

  return (
    <div className="flex-1 bg-white flex flex-col justify-between border-l border-gray-200">
      <div className="px-6 py-4 border-b bg-gray-50">
        <select
          value={chatMode}
          onChange={(e) => setChatMode(e.target.value)}
          className="bg-white text-sm p-2 rounded-md border"
        >
          <option value="GPT_3_5_TURBO">🧠 Expert</option>
          <option value="GPT_4O">✨ Professor</option>
        </select>
      </div>

      {/* Messages area */}
      {!isEmptyChat && (
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-2xl mx-auto space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-100 text-gray-900"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Input area */}
      {isEmptyChat ? (
        // Centered placeholder + input bar when no messages
        <div className="flex flex-1 flex-col items-center justify-center space-y-6">
          <div className="text-gray-900 text-lg">Where should we begin?</div>
          <div className="w-full max-w-lg flex items-center border rounded-lg p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Start a new chat..."
              className="flex-1 outline-none p-2"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        // Bottom fixed input when chat has messages
        <div className="p-4 border-t flex items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 outline-none border rounded-lg p-2"
          />
          <button
            onClick={handleSend}
            className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};
