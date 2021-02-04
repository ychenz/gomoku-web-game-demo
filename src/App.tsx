import React from "react";
import { Board } from "./components/Board";
import { ActionBar } from "./components/ActionBar";
import "./App.css";

function App(): React.ReactElement {
  return (
    <div className="App">
      <div className="App-Content">
        <Board dimension={15} />
        <ActionBar />
      </div>
    </div>
  );
}

export default App;
