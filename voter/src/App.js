import React from 'react';
import logo from './logo.svg';
import './App.css';
import VotingBooth from "./views/VotingBooth";
import Home from "./views/Home";

const headerStyle = {
    textAlign: "left",
    /*padding: "0 10px 0",*/
    background: "#eb3477"
}

function App() {
  return (
    <div className="App">
        <header className={"App-header"}><h1>Senate Voting Booth</h1></header>
        <Home/>
    </div>
  );
}

export default App;
