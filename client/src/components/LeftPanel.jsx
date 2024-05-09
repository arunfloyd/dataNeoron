import React from 'react';
import ResizePanel from "react-resize-panel";

// Left Panel Component 
const LeftPanel = ({ children }) => {
  return (
    <ResizePanel
      direction="e"
      style={{ width: "50%", minWidth: "50px", border: "8px solid red" }}
    >
      {children}
    </ResizePanel>
  );
};

export default LeftPanel;
