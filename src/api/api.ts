import { API, url } from "../config/config.ts";
import { ChatHandlerDTO } from "../dtos/ChatHandlerDTO.ts";
import { ConversationDTO } from "../dtos/ConversationDTO.ts";
import axiosClient from "./axiosClient.ts";
import { EventSourcePolyfill } from "event-source-polyfill";

export const getConversation = async (teamId) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const res = await axiosClient.get<ConversationDTO[]>(
      API.auth.conversation,
      {
        params: { teamId },
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);
    return res.data;
  } catch (err) {
    if ((err as any).name !== "CanceledError") {
      console.error("Failed to fetch teams:", err);
    }
    return [];
  }
};

export const getConversationDetail = async (teamId, conversationId) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const res = await axiosClient.get<ConversationDTO[]>(
      API.auth.conversation,
      {
        params: { teamId, conversationId },
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);
    return res.data[0];
  } catch (err) {
    if ((err as any).name !== "CanceledError") {
      console.error("Failed to fetch teams:", err);
    }
    return [];
  }
};

export const continueConversation = async (
  conversationId,
  userMessage,
  model,
  teamId
) => {
  const dto: ChatHandlerDTO = {
    conversationId: conversationId,
    userMessage: userMessage,
    model: model,
    teamId: teamId,
  };
  console.log(dto);

  try {
    const response = await axiosClient.post(API.auth.conversationStartChat, dto);
    return response.data;
  } catch (error: any) {
    console.error("Error continue conversation:", error);
    throw new Error(
      "Failed to continue conversation" + (error?.err ? ": " + error.err : "")
    );
  }
};

export const startConversation = async (
  userMessage,
  model,
  teamId
): Promise<ConversationDTO> => {
  const dto: ChatHandlerDTO = {
    userMessage: userMessage,
    model: model,
    teamId: teamId,
  };
  console.log(dto);

  try {
    const response = await axiosClient.post(
      API.auth.conversationStartChat,
      dto
    );
    return response.data;
  } catch (error: any) {
    console.error("Error start conversation:", error);
    throw new Error(
      "Failed to start conversation" + (error?.err ? ": " + error.err : "")
    );
  }
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const baseSSEHandler = async (
  url,
  isClose,
  onMessageCallback: (message: string, conversationId: string) => void
) => {
  // Event source as GET method
  const token = localStorage.getItem("token");

  try {
    const eventSource = new EventSourcePolyfill(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    eventSource.onmessage = (e) => {
      console.log(e.data);

      onMessageCallback(e.data, e.lastEventId);
    };

    // eventSource.onerror = (err) => {
    //   console.log(err.err);

    //   if ("TypeError: network error" in err.err) {
    //     isClose = true;
    //   }
    //   eventSource.close();
    // };

    while (!isClose) {
      await sleep(100);
    }
  } catch (err) {
    console.log(err);
    // eventSource.close();
    return;
  }
};

export const receiveChatResponse = async (
  conversationId,
  isClose,
  onMessageCallback: (message: string, conversationId: string) => void
) => {
  const apiUrl =
    url(API.auth.conversationGetChatResponse) + `?requestId=${conversationId}`;
  await baseSSEHandler(apiUrl, isClose, onMessageCallback);
};
