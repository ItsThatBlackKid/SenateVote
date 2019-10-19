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
        vote: null,
        message: "",
    };

    componentWillMount() {
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
        const n = sessionStorage.getItem("n");
        const g = sessionStorage.getItem("g");
        const num = this.state.vote;
        const c = g.modPow(num, n.square()).multiply(r.modPow(n, n.square()));

        this.setState({
            votes: this.state.votes.concat([c]),
            vote: 0
        })
    };

    submitVote = (e) => {


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
                    <div>
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
                    <button className={"submit"} onClick={this.submitVote}>Make Vote</button>
                    </div>
                    <div id={"n-votes"}>
                        {this.state.votes.map((vote) =>
                            <p key={vote} className={"vote-show"}>
                                vote: {this.state.votes.indexOf(vote)}
                            </p>
                        )}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default VotingBooth;