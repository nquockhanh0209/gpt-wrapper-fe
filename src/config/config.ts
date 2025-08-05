const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const API = {
  baseURL: BASE_URL,

  auth: {
    login: "/auth/login",
    refresh: "/auth/refresh",
    me: "/auth/me",
    createTeam: "/team"
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
