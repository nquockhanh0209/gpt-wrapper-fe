import React from "react";
export default function CreateTeamForm({
  teamData,
  handleInputChange,
  handleFormSubmit,
  onCancel,
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleFormSubmit}
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          width: "300px",
        }}
      >
        <h2>Create Team</h2>

        <div style={{ marginBottom: "1rem" }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={teamData.name}
            onChange={handleInputChange}

            required
            style={{
              width: "100%",
              border: "1px solid black",
              padding: "0.5rem",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Description:</label>
          <textarea
            name="description"
            value={teamData.description}
            onChange={handleInputChange}
            required
            style={{
              width: "100%",
              border: "1px solid black",
              padding: "0.5rem",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
