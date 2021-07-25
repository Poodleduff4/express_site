var router = require('express').Router();
var axios = require('axios').default;
const { Console } = require('console');
const { CONNREFUSED } = require('dns');
var https = require('https');
var fs = require('fs');

router.get('/', function (req, res) {
    movieTitle = req.query.t;
    res.send(movieTitle);
});

router.get('/info', function (req, res) {
    var movieId = req.query.i;
    var requestData = req.query.d;
    url = "https://www.omdbapi.com/?apikey=95b1aff&i=" + movieId;
    axios.get(url).then(function (response) {
        // console.log(response.data[requestData]);
        res.send(response.data[requestData]);
    })
});

router.get('/suggestions', function (req, res) {
    movieTitle = req.query.t;
    var host = 'v2.sg.media-imdb.com'
    var filename = '/suggestion/' + movieTitle[0] + '/' + movieTitle + '.json';
    var url = 'https://' + host + filename;
    // console.log(url);
    const suggestions = [];
    https.get(url, function (response) {

        response.on('data', function (d) {
            // let json = JSON.stringify(d);
            // for(var key in json) {
            //     // var value = json[key];
            //     console.log(key);
            //   }
            try {
                let temp = JSON.parse(d);


                for (var key in temp['d']) {
                    let movieTemp = [];
                    // console.log('key: ' + key)
                    for (var key2 in temp['d'][key]) {
                        // console.log(key + '/' + key2 + ': ' + temp['d'][key][key2]);

                    }
                    for (var key3 in temp['d'][key]['i']) {

                    }

                    movieTemp.push(temp['d'][key]['l']); //Title
                    movieTemp.push(temp['d'][key]['id']) //id
                    try {
                        movieTemp.push(temp['d'][key]['i']['imageUrl']); //image link
                    }
                    catch {
                        movieTemp.push(null);
                    }

                    suggestions.push(movieTemp);
                }
                // console.log(suggestions);
                res.send(suggestions);
            } catch (error) {
                console.error(error);
            }
        });
    });
    // console.log(suggestions);

});

router.get('/vote', function (req, res) { // vote request for movie with id movieId
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

module.exports = router;