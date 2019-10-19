import React, {Component, Fragment} from 'react';
import "./votingauthority.css"
import axios from "axios";
const bigInt = require('big-integer');

class VotingAuthority extends Component {
    state = {
        loggedIn: false,
        votesCalculated: false,
        error: "",
        username: "",
        pwd: "",
        statesInfo: "",
        bobCount: 0,
        aliceCount: 0
    };

    onUpdate = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    login = () => {
        const {username, pwd} = this.state;

        if(username !== "vauthority" || pwd !== "rootadmin") {
            this.setState({
                error: "Incorrect username or password"
            });
            return;
        }

        this.setState({
            loggedIn: true,
        })
    }

    countVotes = () => {
        axios.get('/votes/count').then((res) => {
            const lambda = bigInt(res.data.lambda);
            const mu = bigInt(res.data.mu);
            const n = bigInt(res.data.n);
            const c = bigInt(res.data.c);

            // m = L(c^(lambda) mod n^2)*mu mod n
            const lu = c.modPow(lambda,n.square()).minus(1).divide(n);
            const m = lu.multiply(mu).mod(n);
            console.log(m);

            const mProper = Number(m.toString()).toString(2);
            const mLength = mProper.length;
            const bits =  6 - mLength;
            let nZeroes = "";

            if(bits > 0) {
                for(let i = 0; i < bits; i++) {
                    nZeroes = "0" + nZeroes;
                }
            }

            let binary = nZeroes + mProper.toString(2);
            console.log(binary);

            const alice = binary.substring(0,3);
            console.log(alice);
            const bob = binary.substring(3,binary.length);
            console.log(bob);

            const aliceCount = parseInt(alice,2);
            const bobCount = parseInt(bob,2);

            this.setState({
                votesCalculated: true,
                aliceCount: aliceCount,
                bobCount: bobCount,
            })

        })
    };

    render() {
        const {loggedIn,votesCalculated,username,pwd, error} = this.state;
        if(!loggedIn) {
            return (
                <Fragment>
                    <h2>Please login below</h2>
                    <div className={"login"}>
                        <input type={"textbox"} style={{marginBottom: 15}} id={"username"} value={username} onChange={this.onUpdate} />
                        <input type={"password"} style={{marginBottom: 15}} id={"pwd"} value={pwd} onChange={this.onUpdate}/>
                        {error !== "" ? <p style={{color: "red"}}>{error}</p> : ""}
                        <button onClick={this.login}>Login</button>
                    </div>
                </Fragment>
            )
        }

        return (
            <Fragment>
                {votesCalculated &&
                    <Fragment>
                        <h2>There are {this.state.aliceCount} votes for Alice</h2>
                        <h2>There are {this.state.bobCount} votes for Bob</h2>
                    </Fragment>
                }
                <button onClick={this.countVotes}>Count votes</button>
            </Fragment>
        )
    }
}

export default VotingAuthority;