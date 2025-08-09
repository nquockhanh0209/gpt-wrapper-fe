import React, { useState, useEffect } from "react";
import {
  continueConversation,
  getConversationDetail,
  receiveChatResponse,
  startConversation,
} from "../../../api/api.ts";
import Sidebar from "./Sidebar.tsx";
import { useLocation, useNavigate } from "react-router-dom";

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [chatMode, setChatMode] = useState("GPT_3_5_TURBO");
  const [isNewChat, setIsNewChat] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const teamId = queryParams.get("teamId");

  useEffect(() => {
    if (!teamId) {
      navigate("/team");
    }
  }, [teamId, navigate]);

  const fetchConversationDetail = async (
    teamId: string,
    conversationId: string
  ) => {
    const conversationDetail = await getConversationDetail(
      teamId,
      conversationId
    );
    setSelectedConversation(conversationDetail);
  };

  useEffect(() => {
    if (selectedConversation != null) {
      const mapped = selectedConversation.chatDTOs.flatMap((chat) => [
        { sender: "user" as const, text: chat.question },
        { sender: "bot" as const, text: chat.response },
      ]);
      setMessages(mapped);
      setChatMode(selectedConversation.initModel || "GPT_3_5_TURBO");
    }
  }, [selectedConversation]);

  const handleSendQuestion = async (
    conversationId: string,
    userMessage: string,
    model: string,
    teamId: string
  ) => {
    const res = await continueConversation(
      conversationId,
      userMessage,
      model,
      teamId
    );
    console.log(res);

    await receiveChatResponse(conversationId, false, onChatResponse);
  };

  const onChatResponse = (message: string, conversationId: string) => {
    var doneMessage = conversationId + "onQuestionResponseDone";
    setMessages((prev) => {
      if (message === doneMessage) {
        return prev;
      }
      const lastBotIndex = [...prev]
        .reverse()
        .findIndex((msg) => msg.sender === "bot");
      if (lastBotIndex === -1) return prev;

      const realIndex = prev.length - 1 - lastBotIndex;

      const updatedMessages = [...prev];
      const previousText = updatedMessages[realIndex].text || "";
      updatedMessages[realIndex] = {
        ...updatedMessages[realIndex],
        text: previousText + message, // append new message chunk
      };

      return updatedMessages;
    });
  };
const handleNewChat = () => {
  setSelectedConversation(null);
  setMessages([]);
  setIsNewChat(true);
};


// When sending first message in new chat
const handleSend = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!input.trim()) return;

  const userMessage = input.trim();
  setInput("");

  // If it’s a new chat, first create a conversation on the server
  let conversationId = selectedConversation?.id ?? "";
  if (isNewChat || !conversationId) {
    const newConversation = await startConversation(
      userMessage,
      chatMode,
      teamId
    ); // you'll need an API for this
    conversationId = newConversation.id;
    setSelectedConversation(newConversation);
    setIsNewChat(false);
  }

  setMessages((prev) => [
    ...prev,
    { sender: "user", text: userMessage },
    { sender: "bot", text: "" },
  ]);

  await handleSendQuestion(conversationId, userMessage, chatMode, teamId ?? "");
};
    const isEmptyChat = messages.length === 0;
  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      <Sidebar
        teamId={teamId ?? ""}
        onConversationSelect={fetchConversationDetail}
        handleNewChat={handleNewChat}
      />

      <div className="flex-1 bg-white flex flex-col justify-between border-l border-gray-200">
        {/* Dropdown selector */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <select
            value={chatMode}
            onChange={(e) => setChatMode(e.target.value)}
            className="bg-white text-gray-900 text-sm p-2 rounded-md border border-gray-300 focus:outline-none"
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
    </div>
  );
};

export default ChatWindow;
