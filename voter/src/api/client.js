import axios from 'axios';
const bigInt = require("big-integer");

const client = axios.create({
    baseURL:'/'
});


export default  {
    crypto: {
        getPublicKey() {
            return client.get('/voter');
        }
    },

    vote: {
        makeVote(num) {

            return client.post('/votes/submit', {votes: num})
        }
    }
}