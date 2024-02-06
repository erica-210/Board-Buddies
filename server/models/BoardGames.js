const { Schema } = require('mongoose');

const  gameSchema = new Schema({
    creators: [
        {
            type: String,
            required: true,
        },
    ],
    description: {
        type: String,
        required: true,
    },
    gameName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        
    },

    gameImage: {
        type: String,
        
    },
    gameLink: {
        type: String,
        required: true,
    },
    players: {
        type: Number,
       
    },  
    playTime: {
        type: Number,
        
    },
    reccommenedAge: {
        type: Number,
        
    },
});

module.exports = gameSchema;