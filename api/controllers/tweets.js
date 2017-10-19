/**
 * Created by Afro on 10/19/2017.
 */

const model = require('../model');
const {User, Note, Tweet} = model;

const tweetsController = {
    all(req, res){
        //Returns all notes
        Tweet.find({})
            .populate('user')
            .exec((err, tweets) => res.json(tweets))
    },
    byId(req, res){
        "use strict";
        const idParam = req.params.id;
        Tweet.findOne({_id: idParam})
            .populate('user')
            .exec((err, tweet) => res.json(tweet))
    },
    create(req, res) {
        "use strict";
        const data = req.body;
        if (data.tweet) {
            let newData = {
                "tweet": req.body.tweet,
                display_name: 'AfroBaba',
                screen_name: 'iamafro'
            };

            let newTweet = new Tweet(newData);

            newTweet.save((err, savedTweet) => {
                Tweet
                    .findOne({_id: savedTweet._id})
                    .exec((err, tweet) => {
                        res.status(201).json(tweet);
                    })
            });

            let err = {
                "status": 400,
                "message": "Your tweet couldn't be saved"
            };

        } else {
            let err = {
                status: 400,
                message: "Incomplete parameters to complete this request"
            };
            res.status(400).json(err);
        }
    },
    update(req, res){
        "use strict";
        const idParam = req.params.tweetId;
        let tweet = req.body;
        // Finds a product to be updated
        Note.findOne({_id: idParam}, (err, data) => {
            // Updates the product payload
            data.tweet = tweet.tweet;
            // Saves the product
            data.save((err, updated) => res.json(updated));
        })
    },
    remove (req, res) {
        const idParam = req.params.tweetId;
        // Removes a product
        Note.findOne({_id: idParam}).remove((err, removed) => res.json(idParam))
    }

};

module.exports = tweetsController;