import React from "react";
import DuelGame from "./components/DuelGame/DuelGame";
import "./styles/App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Duel Game</h1>
      <DuelGame />
    </div>
  );
};

export default App;
