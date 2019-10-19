const express = require('express');
const randomWhole = require("../crypto/crypto").randomWhole;
const bigInt = require('big-integer');
const router = express.Router();

// votes are received encrypted.
// all the server does multiply them

const receiveVote = (req, res) => {
    const newVote = req.body.vote;
    const postgres = req.app.locals.postgres;
    console.log(newVote);

    // and we calculate this vote with the rest


    // first we get the old vote
    postgres.query(`SELECT * from vote`, (error, vote) => {
        if (error) {
            res.status(500).json({error: "error"});
            console.log(error);
            return;
        }
        let c = bigInt(1);
        const votes = req.body.votes;
        votes.forEach((vote) => {
            c = bigInt(vote).multiply(c);
        });

        c = c.mod(req.app.locals.parameters.n);

        if (vote.rows[0]) {
            c = bigInt(vote.rows[0].count).multiply(c).mod(req.app.locals.parameters.n);
            console.log(c);
            postgres.query(`UPDATE vote set votes = ${c.toString()}  WHERE votes = '${vote.rows[0].count}'`).then((v, error) => {
                console.log(v);

            }).catch((error) => {
                console.log(error);
                res.status(500).json({err: "Error"});
            })
        } else {

            postgres.query(`INSERT INTO vote (votes) values (${c.toString()}) `).then((error, v) => {
                if (error)
                    console.log(error);

            }).catch((err) => {
                console.log(err);
                res.status(500).json({err: "Error"});
            })
        }

    })
}

const countVotes = (req, res) => {
    const postgres = req.app.locals.postgres;

    postgres.query(`SELECT votes from vote`).then((v, err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({err: "error"})

        }

        const votes = v.rows[0].votes;
        return res.json({
            mu: req.app.locals.parameters.mu,
            lambda: req.app.locals.parameters.lambda,
            n: req.app.locals.parameters.n,
            c: votes
        })
    })
}


router.post('/submit', receiveVote);
router.get('/count', countVotes);

module.exports = router;