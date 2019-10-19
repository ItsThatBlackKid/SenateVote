import React, {Component, Fragment} from 'react';
import "../styles/VotingBooth.css"
import bob from '../img/bob.png';
import alice from '../img/alice.png'
import client from '../api/client'
import tick from '../img/checked.svg';

const bigInt = require("big-integer");


class VotingBooth extends Component {
    state = {
        votes: [],
        vote: 0,
        message: "",
    };

    componentDidMount() {
        client.crypto.getPublicKey().then((res) => {
            sessionStorage.setItem("n", res.data.n);
            sessionStorage.setItem("g", res.data.g)
        });
    }

    onClick = (e) => {
        this.setState({vote: Number(e.target.id)})
    };

    makeVote = (e) => {
        const r = bigInt.randBetween("1", "400");
        const n = bigInt(sessionStorage.getItem("n"));
        console.log(n);
        const g = bigInt(sessionStorage.getItem("g"));
        console.log(g);

        const num = this.state.vote;
        console.log(num);
        console.log(g.modPow(num,n.square()));
        console.log(r.modPow(n,n.square()));
        const c = g.modPow(num, n.square()).multiply(r.modPow(n, n.square()));
        console.log(c);

        this.setState({
            votes: this.state.votes.concat([c]),
            vote: 0
        })
    };

    submitVote = (e) => {
        if(this.state.votes.length === 0) {
            return;
        }
        client.vote.makeVote(this.state.votes).then((res) => {
            this.setState({
                message: "Vote submitted",
            })
        })
    };



    render() {
        let {vote} = this.state;
        return (
            <Fragment>
                <div className={"wrapper"}>
                    <div style={{width: "90vw"}}>
                    <div className={"voteWrapper"}>
                        <div className={"vote"} id={"8"} onClick={this.onClick}>
                            <img alt={"vote for alice"} src={alice}/>
                            <h3>Alice</h3>
                            {vote == 8 ?
                                <div><img alt={"tick"} height={40} width={40} color={"white"} src={tick}/></div> : ""}
                        </div>
                        <div className={"vote"} id={"1"} onClick={this.onClick}>
                            <img alt={"vote for bob"} src={bob}/>
                            <h3>Bob</h3>
                            {vote == 1 ?
                                <div><img alt={"tick"} height={40} width={40} color={"white"} src={tick}/></div> : ""}
                        </div>
                    </div>
                    <button className={"submit"} onClick={this.makeVote}>Make Vote</button>
                    </div>
                    <div id={"n-votes"}>
                        <button onClick={this.submitVote} className={"submit"}>Submit Votes</button>
                        {this.state.votes.map((vote) =>
                            <p key={vote} className={"vote-show"}>
                                vote: {this.state.votes.indexOf(vote) +1}
                            </p>
                        )}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default VotingBooth;