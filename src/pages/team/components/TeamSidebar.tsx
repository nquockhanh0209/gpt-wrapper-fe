import React from "react";

export default function TeamSidebar({ teams }) {
  return (
    <div style={{ width: "200px", background: "#f4f4f4", padding: "1rem" }}>
      <h3>Teams</h3>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
}