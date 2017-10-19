const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model.bind(mongoose);
const objectId = mongoose.Schema.Types.objectId;

const noteSchema = Schema({
    // id: objectId,
    title: String,
    note: String,
    date: {type: Date, default: Date.now},
});

const tweetSchema = Schema({
    // id: objectId,
    tweet: String,
    date: {type: Date, default: Date.now},
    tweeted: {type: Boolean, default: false},
    display_name: String,
    screen_name: String
});

// const userSchema = Schema({
//     id: objectId,
//     ,
//     dateJoined: {type: Date, default: Date.now}
// });

// const User = model('User', userSchema);
const Note = model('Note', noteSchema);
const Tweet = model('Tweet', tweetSchema);

module.exports = {Note, Tweet};