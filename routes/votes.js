const express = require('express');
const randomWhole = require("../crypto/crypto").randomWhole;

const router = express.Router();

// votes are received encrypted.
// all the server does multiply them

const receiveVote = (req,res) => {
    const newVote = req.body.vote;
    const postgres = req.app.locals.postgres;

    // and we calculate this vote with the rest

    // first we get the old vote
    postgres.query(`SELECT * from vote`,(error, vote) => {
        let c = vote.rows[0].count;

        c = c*newVote;
    })
}

const getVotes = (req,res) => {

}


router.post('/',receiveVote);

module.exports = router;