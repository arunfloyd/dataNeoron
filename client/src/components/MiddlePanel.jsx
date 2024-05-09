import React from "react";
import ResizePanel from "react-resize-panel";

// Middle Panel Component 

const MiddlePanel = ({ children }) => {
  return (
    <ResizePanel
      direction="n"
      style={{ height: "50%", minHeight: "50px", border: "10px solid black" }}
    >
      {children}
    </ResizePanel>
  );
};

export default MiddlePanel;
