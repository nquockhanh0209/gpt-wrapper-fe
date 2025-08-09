import { useState } from "react";
import TeamSidebar from "./TeamSidebar.tsx";
import axiosClient from "../../../api/axiosClient.ts";
import { TeamDTO } from "../../../dtos/TeamDTO.ts";
import { UserDTO } from "../../../dtos/UserDTO.ts";
import { useNavigate } from "react-router-dom"; // or use <Link> instead
import TeamButton from "./TeamButton.tsx";

export default function MainLayout() {
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const navigate = useNavigate();
  const fetchTeamDetail = async (teamId: string) => {
    console.log(teamId);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const res = await axiosClient.get<TeamDTO[]>("/team", {
      params: { teamId },
      signal: controller.signal,
    });
    console.log(res.data[0]);

    setSelectedTeam(res.data[0]);
    clearTimeout(timeoutId);
  };

  const renderMemberRow = (user: UserDTO, role: string) => {
    return (
      <tr key={user.id} className="border-b">
        <td className="px-4 py-2 flex items-center gap-3">
          <img
            src={
              // user.avatar ||
              `/avatar_default.png`
            }
            alt={user.username}
            className="w-8 h-8 rounded-full"
          />
          {user.username}
        </td>
        <td className="px-4 py-2">{user.email}</td>
        <td className="px-4 py-2">
          {role === "member" && <td className="px-4 py-2">Team member</td>}
          {role === "leader" && <td className="px-4 py-2">Team leader</td>}
        </td>
        <td className="px-4 py-2 text-center">
          <input type="checkbox" />
        </td>
      </tr>
    );
  };
  return (
    <div className="flex h-screen">
      <TeamSidebar onTeamSelect={fetchTeamDetail} />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Team Management</h1>

        {selectedTeam ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{selectedTeam.name}</h2>
              <TeamButton
                onClick={() => navigate(`/chat?teamId=${selectedTeam.id}`)}
                buttonText="Start chat"
              />
            </div>
            <p className="mb-6 text-gray-600">{selectedTeam.description}</p>

            <table className="min-w-full table-auto border-collapse text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Team role</th>
                  <th className="px-4 py-2 text-center">Select</th>
                </tr>
              </thead>
              <tbody>
                {selectedTeam.leaderDTO &&
                  renderMemberRow(selectedTeam.leaderDTO, "leader")}
                {selectedTeam.memberDTOs &&
                selectedTeam.memberDTOs.length > 0 ? (
                  selectedTeam.memberDTOs.map((memberDTO: UserDTO) =>
                    renderMemberRow(memberDTO, "member")
                  )
                ) : (
                  <p className="text-gray-500">No members in this team yet.</p>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Create a team to start chat.</p>
        )}
      </main>
    </div>
  );
}
