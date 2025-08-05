import React from "react";

const CreateTeamButton = ({ onClick }) => {
  //       const res = await fetch(url(API.auth.login), {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(loginRequestDTO),
  //       });
  // const handleCreateTeam = () => {
  //     const res = await fetch(url(API.auth.createTeam), {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(loginRequestDTO),
  //       });
  // };
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "green",
        color: "white",
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Create Team
    </button>
  );
};
export default CreateTeamButton;
