const express = require('express');
const router = express.Router();
const file = require('../reader.js');

/* GET users listing. */
router.get('/tweets', function (req, res, next) {
    let tweets = file.read('tweets');
    res.status(200).json(tweets)
});

router.post('/add-tweet', function (req, res, next) {
    let data = req.body;
    if (!data.tweet) {
        let err = {
            code: 400,
            error: "The tweet parameter is required"
        };
        res.status(400).json(err)
    } else {
        let tweets = file.read('tweets');
        let tweet = {
            id: tweets.length ? tweets.length + 1 : 1,
            "tweet": data.tweet,
            date: new Date(),
            "display_name": "AFRO BABA",
            "screen_name": "iamAfro",
            "tweeted": false
        };
        file.write(tweet, "tweets");
        res.status(200).json(tweet);
    }
});

router.post('/delete-tweet/:tweetId', function (req, res, next) {
    let id = req.params.tweetId;
    if (parseInt(id)) {
        let deleted = file.delete(id, 'tweets');
        if (deleted) {
            let data = {
                "status": 200,
                "message": "Tweet deleted successfully"
            };
            res.status(200).json(data)
        } else {
            let err = {
                status: 400,
                message: "Error deleting tweet"
            };
            res.status(400).json(err)
        }
    }
    else {
        let err = {
            status: 400,
            message: "Incomplete parameters to complete this request"
        };
        res.status(400).json(err);
    }

});


module.exports = router;
