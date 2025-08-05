import React, { useState } from "react";
import TeamSidebar from "./components/TeamSidebar.tsx";
import TeamFormPopup from "./components/CreateTeamForm.tsx";
import { TeamDTO } from "../../dtos/TeamDTO.ts";
import { API, url } from "../../config/config.ts";
export default function TeamManagementPage() {
  const [teams, setTeams] = useState<any>([]);
  const [showForm, setShowForm] = useState(false);
  const [teamData, setTeamData] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeamData({ ...teamData, [name]: value });
  };

  const handleSendCreateTeam = async (newTeam: any) => {
    var teamDTO: TeamDTO = new TeamDTO(newTeam);
    const res = await fetch(url(API.auth.createTeam), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teamDTO),
    });
    console.log(res.text());
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newTeam = { ...teamData };
    await handleSendCreateTeam(newTeam);
    setTeams([...teams, newTeam]);
    setTeamData({ name: "", description: "" });
    setShowForm(false);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <TeamSidebar teams={teams} />

      <div style={{ flex: 1, padding: "2rem" }}>
        <h1>Team Management</h1>
        <button
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => setShowForm(true)}
        >
          Create Team
        </button>
        {showForm && (
          <TeamFormPopup
            teamData={teamData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
}
