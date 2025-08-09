import { isSavedLocalStorage, getFromLocalStorage } from "../config/config.ts";

const UserInfoSidebar = () => {
  return (
    isSavedLocalStorage("username") &&
    isSavedLocalStorage("email") && (
      <div className="border-t border-gray-200 p-4 text-xs text-gray-600 bg-gray-100">
        <div className="flex items-center space-x-2">

          <div>{getFromLocalStorage("username")}</div>
        </div>
        <div className="text-gray-400 mt-1">Free</div>
      </div>
    )
  );
};

export default UserInfoSidebar;
