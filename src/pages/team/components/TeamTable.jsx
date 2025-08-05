import React from "react";

const TeamTable = ({ members }) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
            Name
          </th>
          <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
            Email
          </th>
          <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
            Role
          </th>
        </tr>
      </thead>
      <tbody>
        {members.map((member, index) => (
          <tr key={index}>
            <td style={{ padding: "8px" }}>{member.name}</td>
            <td style={{ padding: "8px" }}>{member.email}</td>
            <td style={{ padding: "8px" }}>{member.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TeamTable;
