import React from "react";
import ResizableLayout from "./components/ResizableLayout";
import { Provider } from "react-redux";
import "./App.css";
import appStore from "./utils/appStore";
class App extends React.Component {
  render() {
    return (
      <div>
        <Provider store={appStore}>
          <ResizableLayout />
        </Provider>
      </div>
    );
  }
}

export default App;
