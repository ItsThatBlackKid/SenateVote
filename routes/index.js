var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
});

router.get('/voter', (req,res) => {
  res.json({n: req.app.locals.parameters.n, g: req.app.locals.parameters.g})
})

module.exports = router;
