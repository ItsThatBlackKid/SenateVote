import React from 'react';
import logo from './logo.svg';
import './App.css';
import VotingAuthority from "./views/VotingAuthority";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Senate Voting Authority
      </header>
      <VotingAuthority />
    </div>
  );
}

export default App;
