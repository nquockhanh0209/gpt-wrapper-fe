const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const API = {
  baseURL: BASE_URL,

  auth: {
    login: "/auth/login",
    refresh: "/auth/refresh",
    me: "/auth/me",
    team: "/team",
    conversation: "/conversation",
    conversationContinueChat: "/conversation/continue-chat",
    conversationStartChat: "/conversation/start-chat",

    conversationGetChatResponse: "/conversation/get-chat-response",
  },

  chat: {
    send: "/chat/send",
    history: (conversationId: string | number) =>
      `/chat/${conversationId}/history`,
  },

  // add more groups here...
} as const;
console.log(BASE_URL);

export const url = (path: string) => `${BASE_URL}${path}`;

export const isSavedLocalStorage = (key: string) => {
  return (
    !!localStorage.getItem(key) &&
    localStorage.getItem(key) !== undefined &&
    localStorage.getItem(key) !== "undefined"
  );
};

export const getFromLocalStorage = (key) => {
  return localStorage.getItem(key);
}