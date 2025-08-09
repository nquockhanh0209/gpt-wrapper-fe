import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar.tsx";
import { ChatWindow } from "./components/ChatWindow.tsx";
import { UseChat } from "./hooks/UseChat.ts";

export default function ChatPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const teamId = new URLSearchParams(location.search).get("teamId") ?? "";

  const chat = UseChat(teamId, navigate);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        teamId={teamId}
        onConversationSelect={(t, c) => chat.fetchConversationDetail(c)}
        handleNewChat={chat.handleNewChat}
      />
      <ChatWindow
        messages={chat.messages}
        input={chat.input}
        setInput={chat.setInput}
        chatMode={chat.chatMode}
        setChatMode={chat.setChatMode}
        handleSend={chat.handleSend}
      />
    </div>
  );
}
