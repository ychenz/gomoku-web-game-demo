import React from "react";
import { Board } from "./components/Board";
import "./App.css";

function App(): React.ReactElement {
  return (
    <div className="App">
      <header className="App-header">
        <Board dimension={15} />
      </header>
    </div>
  );
}

export default App;
