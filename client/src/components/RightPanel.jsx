import React from "react";
import ResizePanel from "react-resize-panel";

// Right Panel Component
const RightPanel = ({ children }) => {
  return (
    <ResizePanel
      direction="w"
      style={{ width: "50%", minWidth: "50px", border: "10px solid black" }}
    >
      {children}
    </ResizePanel>
  );
};

export default RightPanel;
