// src/services/chatService.ts
import {
  continueConversation,
  getConversationDetail,
  getConversation,
  receiveChatResponse,
  startConversation,
} from "../../../api/api.ts";

export const chatService = {
  getConversationList: (teamId: string) => getConversation(teamId),

  getConversationDetail: (teamId: string, conversationId: string) =>
    getConversationDetail(teamId, conversationId),

  startConversation: (message: string, model: string, teamId: string) =>
    startConversation(message, model, teamId),

  sendMessage: (
    conversationId: string,
    message: string,
    model: string,
    teamId: string
  ) => continueConversation(conversationId, message, model, teamId),

  streamResponse: (conversationId: string, onChunk: (chunk: string) => void) =>
    receiveChatResponse(conversationId, false, onChunk),
};
