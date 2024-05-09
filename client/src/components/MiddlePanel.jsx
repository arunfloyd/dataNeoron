import React from "react";
import ResizePanel from "react-resize-panel";

// Middle Panel Component 

const MiddlePanel = ({ children }) => {
  return (
    <ResizePanel
      direction="e"
      style={{ height: "50%", minHeight: "50px", border: "8px solid red" }}
    >
      {children}
    </ResizePanel>
  );
};

export default MiddlePanel;
