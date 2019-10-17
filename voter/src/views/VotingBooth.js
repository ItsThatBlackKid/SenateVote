import React, {Component, Fragment} from 'react';
import crypto from  '../api/client'
const bigInt = require("big-integer");

const voteDiv = {
    height: "600px",
    width: "100%",
    textAlign: "center",
    margin:"0px auto",
    display: "flex",
    flexDirection: "row"
};


class VotingBooth extends Component {
    state = {
        vote: 0,
    };

    componentWillMount() {
        crypto.crypto.getPublicKey().then((res) => {
            sessionStorage.setItem("n",res.data.n);
            sessionStorage.setItem("g",res.data.g)
        });


        const r = bigInt.randBetween("1","400");
        sessionStorage.setItem("r",r.toString());

    }

    render() {
        return (
            <div style={voteDiv}>
                <div style={{marginRight: "40px"}} id={"6"}>
                    <h1>Hello World</h1>
                </div>
                <div id={"8"}>
                    <h1>Hello y'all</h1>
                </div>
            </div>
        )
    }
}

export default VotingBooth;