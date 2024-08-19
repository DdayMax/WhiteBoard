import React from "react";
import { DuelGame } from "./pages/DuelGame";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Duel Game</h1>
      <DuelGame />
    </div>
  );
};

export default App;
