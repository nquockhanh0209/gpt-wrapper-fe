import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import UserInfoSidebar from "../../../baseComponents/UserInfoSidebar.tsx";
import { getConversation } from "../../../api/api.ts";
import { ConversationDTO } from "../../../dtos/ConversationDTO.ts";
interface ChatSidebarProps {
  teamId: string;
  onConversationSelect: (teamId: string, conversationId: string) => {};
  handleNewChat: () =>  void;
}
const Sidebar: React.FC<ChatSidebarProps> = ({
  teamId,
  onConversationSelect,
  handleNewChat,
}) => {
  const [conversations, setConversations] = useState<ConversationDTO[]>([]);
  useEffect(() => {
    (async () => {
      var resConversations = await getConversation(teamId);
      console.log(typeof resConversations);
      
      setConversations(resConversations);
    })();
  }, [teamId]);

  return (
    <div className="w-[260px] h-screen bg-gray-50 flex flex-col border-r border-gray-200">
      {/* Top content */}
      <div className="p-3">
        <img
          src={`/avatar_default.png`}
          alt="logo"
          className="w-8 h-8 rounded-full mb-4"
        />
        <button
          onClick={handleNewChat} // pass down from ChatWindow
          className="flex items-center space-x-2 hover:bg-gray-100 w-full px-3 py-2 rounded"
        >
          <Pencil size={18} />
          <span className="text-sm font-medium">New chat</span>
        </button>
      </div>
      {/* Chat list */}

      <div className="flex-1 overflow-auto text-sm">
      
        {conversations.map((conversation) => (
          <button
            onClick={() => onConversationSelect(teamId, conversation.id)}
            key={conversation.id}
            className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer truncate"
          >
            {conversation.name}
          </button>
        ))}
      </div>
      {/* Bottom user info */}
      <div className="mt-auto">
        <UserInfoSidebar />
      </div>
    </div>
  );
};

export default Sidebar;
