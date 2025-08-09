import React from "react";

interface TeamButtonProps {
  onClick: () => void;
  buttonText: string;
  className?: string;
  style?: React.CSSProperties;
}

const TeamButton: React.FC<TeamButtonProps> = ({
  onClick,
  buttonText,
  className,
  style,
}) => {
  const defaultStyle: React.CSSProperties = {
    backgroundColor: "green",
    color: "white",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <button
      onClick={onClick}
      className={className}
      style={{ ...defaultStyle, ...style }}
    >
      {buttonText}
    </button>
  );
};

export default TeamButton;
