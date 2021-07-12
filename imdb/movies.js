var router = require('express').Router();
var axios = require('axios');
const { Console } = require('console');
const { CONNREFUSED } = require('dns');
var https = require('https')

router.get('/', function(req, res) {
    movieTitle = req.query.t;
    res.send(movieTitle);
});

router.get('/suggestions', function(req, res) {
    movieTitle = req.query.t;
    var host = 'v2.sg.media-imdb.com'
    var filename = '/suggestion/' + movieTitle[0] + '/' + movieTitle + '.json';
    var url = 'https://' + host + filename;
    console.log(url);
    const suggestions = [];
    https.get(url, function(response){

        response.on('data', function (d) {
            // let json = JSON.stringify(d);
            // for(var key in json) {
            //     // var value = json[key];
            //     console.log(key);
            //   }
            let temp = JSON.parse(d);
            for(var key in temp['d']) {
                for(var key2 in temp['d'][key]){
                    // console.log(key + '/' + key2 + ': ' + temp['d'][key][key2]);
                    
                }
                // let tempTitle = temp['d'][key]['l'];
                suggestions.push(temp['d'][key]['l']);
                // console.log(suggestions);
                // console.log(temp['d'][key]['l']);
                // console.log('\n');
                
              }
              console.log(suggestions);
              res.send(suggestions);
        });
    });
    // console.log(suggestions);
    
});

module.exports = router;