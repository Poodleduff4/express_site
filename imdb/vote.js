var router = require('express').Router();
var axios = require('axios').default;
var fs = require('fs');

router.get('/submitVote', function (req, res) { // vote request for movie with id movieId
    var movieId = req.query.i;
    axios.get(`http://localhost:8080/imdb/movies/info?i=${movieId}&d=Title`).then(function (response) {
        var movieTitle = response.data;
        movieTitle = String(movieTitle).toLowerCase();
    })
    console.log(movieTitle);
    var name = 'movieVotes.json';
    var m = JSON.parse(fs.readFileSync(name));
    console.log(m[movieId]);

    for (var key in m) {
        // console.log(key + ': ' + m[key]['title']);
    }
    if (m[movieId] == undefined) {
        m[movieId] = {
            title: movieTitle,
            votes: 1
        };
        console.log('create');
    }
    else {
        m[movieId]['votes'] += 1;
        console.log('add');
    }
    fs.writeFileSync(name, JSON.stringify(m));
    res.send('piss and shit');
});

router.get('/getVotes', function(req, res){
    var name = 'movieVotes.json';
    var data = fs.readFileSync(name);
    res.send(data);
});

module.exports = router;