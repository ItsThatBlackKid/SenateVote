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
            const n = bigInt(sessionStorage.getItem('n'));
            const g = bigInt(sessionStorage.getItem('g'));
            const r = bigInt(sessionStorage.getItem('r'));

            // c = g^(m)r^(n) mod n^2
            const c = g.modPow(num, n.square()).multiply(r.modPow(n, n.square()));
            return client.post('/makeVote', {vote: c})
        }
    }
}