const bigInt = require('big-integer');


const generateParameters = () => {
    let p = bigInt();
    let n = bigInt();
    let g = bigInt();
    let q = bigInt();

    while (!p.isPrime()) {
        p = bigInt.randBetween("2", "1e10");
    }

    // generate p and q
    while (!q.isPrime()) {
        q = bigInt.randBetween("2", "1e10");
    }

    if(p.equals(q)) {
        generateParameters();
    }
    // phi is also important
    const phi = p.subtract(1).multiply(q.subtract(1));

    // so is n
    if (bigInt(1).equals(bigInt.gcd(phi, p.multiply(q)))) {
        n = p.multiply(q);
        console.log(n);
        if (n === 0) {
            generateParameters();
        }
    } else {
        // I'm sorryI made it a recursive function -- loops decrease readability.
        generateParameters();
    }

    // now we select g
    // there's probably a better algorithm to do this
    while (!bigInt(1).equals(bigInt.gcd(g, n.square()))) {
        // yeah just choose a random integer
        g =bigInt.randBetween("2", "1e10");
    }


    // compute lambda
    const lambda = bigInt.lcm(p.minus(1), q.minus(1));
    console.log(n.square());
    const nsquare = n.square();
    const u = g.modPow(lambda, nsquare);
    console.log(u);
    const lu = u.subtract(1);
    console.log(lu);
    const k =  lu.over(n);
    console.log(bigInt.gcd(k,n));
    const mu = k.modInv(n);


    //give results back
    return {
        p: p.toString(),
        q: q.toString(),
        n: n.toString(),
        phi: phi.toString(),
        g: g.toString(),
        lambda: lambda.toString(),
        mu: mu.toString()
    }
};


module.exports = {
    generateParameters: generateParameters
};