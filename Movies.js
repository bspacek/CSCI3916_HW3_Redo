var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


// var bcrypt = require('bcrypt-nodejs');
//
//mongoose.connect(process.env.DB, { useNewUrlParser: true });
try {
    mongoose.connect( process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
        console.log("connected"));
}catch (error) {
    console.log("could not connect");
}
mongoose.set('useCreateIndex', true);

var actor = new Schema({
    ActorName: { type: String, required: true, unique: false},
    CharacterName: { type: String, required: true, unique: false},
})

//Movie schema
var MovieSchema = new Schema({
    title: { type: String, required: true},
    year: { type: Number, required: true, unique: false},
    genre: { type: String, required: true, unique: false},
    actors: {
        type: [actor],
        validate: [arraySize, 'Movie must have at least 3 actors.']
    },
});

function arraySize(arr) {
    return arr.length >= 3;
}


module.exports = mongoose.model('Movie', MovieSchema);