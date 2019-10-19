import React, {Component, Fragment} from 'react';
import "../styles/VotingBooth.css"
import axios from "axios";
import VotingBooth from "./VotingBooth";
import VotingAuthority from "./VotingAuthority";
const bigInt = require('big-integer');

class Home extends Component {
    state = {
        option: -1
    };

    onClick = (e) => {
        if(e.target.id === "authority") {
            this.setState({option: 0})
        } else if(e.target.id === "booth") {
            this.setState({option: 1})
        }
    }

    render() {

        return (

            <Fragment>

                {
                    this.state.option === 1 &&
                        <VotingBooth/>
                }

                {
                    this.state.option ===0 &&
                        <VotingAuthority/>
                }

                {
                    this.state.option === -1 &&
                        <div style={{marginTop: 60}} onClick={this.onClick} className={"voteWrapper"}>
                            <div id={"authority"} className={"vote"}>
                                <h2>Authority</h2>
                            </div>
                            <div id={"booth"} onClick={this.onClick} className={"vote"}>
                                <h2>Booth</h2>
                            </div>
                        </div>
                }

            </Fragment>
        )
    }
}

export default Home;