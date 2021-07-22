var router = require('express').Router();
var axios = require('axios');
const { Console } = require('console');
const { CONNREFUSED } = require('dns');
var https = require('https')

router.get('/', function (req, res) {
    movieTitle = req.query.t;
    res.send(movieTitle);
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



router.get('/vote', function(req, res){
    movieTitle = req.query.t;
    movieId = req.query.i;
    res.sendFile(__dirname + '/vote.html');
});

module.exports = router;