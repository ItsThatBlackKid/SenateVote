import React from 'react';
import logo from './logo.svg';
import './App.css';
import VotingBooth from "./views/VotingBooth";

function App() {
  return (
    <div className="App">
        <header style={{textAlign: "left", padding: "0 10px 0"}}><h1>Senate Voting Booth</h1></header>
        <VotingBooth/>
    </div>
  );
}

export default App;
