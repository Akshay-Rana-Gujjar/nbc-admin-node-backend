// searchCourse

var express = require('express');
var router = express.Router();
const { searchCourse } = require("../elastic/course");

router.get('/', async function(req, res) {
  const queryText = req.query.query;

    const searchResult = await searchCourse(queryText);
    console.log("\n\n======= SEARCH RESULT ========\n",searchResult.body.hits)
    const searches = searchResult?.body.hits?.hits;

    res.json(searches);

});

module.exports = router;
