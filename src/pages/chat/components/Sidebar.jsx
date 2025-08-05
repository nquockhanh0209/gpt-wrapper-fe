import React from "react";

const Sidebar = () => {
  const chatList = [
    "Create ChatGPT Login UI",
    "iPhone highest battery capacity",
    "Professional Photo Shoot Setup",
    "Lịch sinh hoạt và tập luyện",
    "SSH host key change",
    "Điểm chuẩn CNTT 2025",
    "Delete Parent Polygon Relation",
    "Overlay2 Docker Storage Explain",
    "Lỗi IBus tiếng Việt",
    "Cài đặt bộ gõ Bamboo",
    "Unix time to datetime",
    "Java to Python UUID conversion",
  ];

  return (
    <div className="w-[260px] bg-[#202123] flex flex-col">
      <div className="p-4 font-medium text-sm text-gray-300 border-b border-gray-700">
        Chats
      </div>

      <div className="flex-1 overflow-auto text-sm">
        {chatList.map((chat, idx) => (
          <div
            key={idx}
            className="px-4 py-2 text-gray-300 hover:bg-[#343541] cursor-pointer truncate"
          >
            {chat}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-700 p-4 text-xs text-gray-400">
        <div className="flex items-center space-x-2">
          <div className="bg-orange-600 rounded-full h-6 w-6 flex items-center justify-center text-white text-xs font-bold">
            Q
          </div>
          <div>Quốc Khánh Nguyễn</div>
        </div>
        <div className="text-gray-500 mt-1">Free</div>
      </div>
    </div>
  );
};

export default Sidebar;
