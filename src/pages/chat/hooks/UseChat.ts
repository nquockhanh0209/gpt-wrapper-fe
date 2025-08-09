// src/hooks/useChat.ts
import { useState, useEffect } from "react";
import { chatService } from "../services/ChatService.ts";
import { ConversationDTO } from "../../../dtos/ConversationDTO.ts";

export function UseChat(teamId: string, navigate: (path: string) => void) {
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [chatMode, setChatMode] = useState("GPT_3_5_TURBO");
  const [isNewChat, setIsNewChat] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);

  useEffect(() => {
    if (!teamId) navigate("/team");
  }, [teamId, navigate]);

  const fetchConversationDetail = async (conversationId: string) => {
    setInput("");
    const detail = await chatService.getConversationDetail(
      teamId,
      conversationId
    ) as ConversationDTO;
    setSelectedConversation(detail);
    setMessages(
      detail.chatDTOs.flatMap((c: any) => [
        { sender: "user" as const, text: c.question },
        { sender: "bot" as const, text: c.response },
      ])
    );
    setChatMode(detail.initModel || "GPT_3_5_TURBO");
  };

  const handleNewChat = () => {
    setInput("");
    setSelectedConversation(null);
    setMessages([]);
    setIsNewChat(true);
  };
  
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput("");

    let conversationId = selectedConversation?.id ?? "";
    if (isNewChat || !conversationId) {
      const newConv = await chatService.startConversation(
        userMessage,
        chatMode,
        teamId
      );
      conversationId = newConv.id;
      setSelectedConversation(newConv);
      setIsNewChat(false);
    } else {
      await chatService.sendMessage(
        conversationId,
        userMessage,
        chatMode,
        teamId
      );
    }

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMessage },
      { sender: "bot", text: "" },
    ]);

    await chatService.streamResponse(conversationId, (chunk) => {
      if (chunk === conversationId + "onQuestionResponseDone") return;
      setMessages((prev) => {
        const lastBotIndex = [...prev]
          .reverse()
          .findIndex((m) => m.sender === "bot");
        if (lastBotIndex === -1) return prev;
        const realIndex = prev.length - 1 - lastBotIndex;
        const updated = [...prev];
        updated[realIndex] = {
          ...updated[realIndex],
          text: updated[realIndex].text + chunk,
        };
        return updated;
      });
    });
  };

  return {
    messages,
    input,
    setInput,
    chatMode,
    setChatMode,
    fetchConversationDetail,
    handleNewChat,
    handleSend,
  };
}
