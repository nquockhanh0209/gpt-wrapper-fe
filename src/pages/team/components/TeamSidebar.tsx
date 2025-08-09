import { useState, useEffect } from "react";
import axiosClient from "../../../api/axiosClient.ts";
import { TeamDTO } from "../../../dtos/TeamDTO.ts";
import TeamFormPopup from "./CreateTeamForm.tsx";
import TeamButton from "./TeamButton.tsx";
import UserInfoSidebar from "../../../baseComponents/UserInfoSidebar.tsx";
interface Props {
  onTeamSelect: (teamId: string) => {};
}

export default function TeamSidebar({ onTeamSelect }: Props) {
  const [teams, setTeams] = useState<TeamDTO[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [teamData, setTeamData] = useState<TeamDTO>({
    id: "",
    name: "",
    description: "",
    leaderDTO: {
      id: "",
      username: "",
      email: "",
      provider: "",
      role: "",
    },
    memberDTOs: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        const res = await axiosClient.get<TeamDTO[]>("/team", {
          signal: controller.signal,
        });
        setTeams(res.data);
        clearTimeout(timeoutId);
      } catch (err) {
        if ((err as any).name !== "CanceledError") {
          console.error("Failed to fetch teams:", err);
        }
      }
    })();

  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTeamData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendCreateTeam = async (newTeam: TeamDTO) => {
    try {
      const res = await axiosClient.post<TeamDTO>("/team", newTeam);
      return res.data;
    } catch (err) {
      console.error("Create team failed:", err);
      throw err;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await handleSendCreateTeam({ ...teamData });
      setTeams((prev) => [...prev, created]);
      setTeamData({
        id: "",
        name: "",
        description: "",
        leaderDTO: {
          id: "",
          username: "",
          email: "",
          provider: "",
          role: "",
        },
        memberDTOs: [],
      });
      setShowForm(false);
    } catch (err) {
      console.error("Could not create team:", err);
    }
  };

  return (
    <div className="h-screen w-64 bg-gray-100 flex flex-col p-4">
      {/* Top - Create Team */}
      <div>
        <h2 className="font-semibold text-sm mb-2">Teams</h2>
        <TeamButton
          className="w-full bg-green-600 text-white py-2 px-4 rounded mb-4"
          onClick={() => setShowForm(true)}
          buttonText="+ Create Team"
        />
        {showForm && (
          <TeamFormPopup
            teamData={teamData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>

      {/* Middle - Scrollable team list */}
      <div className="flex-1 overflow-y-auto mt-2">
        {teams.map((team) => (
          <button
            key={team.id}
            onClick={() => onTeamSelect(team.id)}
            className="block w-full text-left px-4 py-2 mb-1 bg-white hover:bg-gray-200 rounded"
          >
            {team.name}
          </button>
        ))}
      </div>

      {/* Bottom - User Info */}
      <div className="mt-4">
        <UserInfoSidebar />
      </div>
    </div>
  );
}
