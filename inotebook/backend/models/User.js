const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({ // creating schema, means how user data must look like in database when entered
    name:{
        type: String,
        required: true,
        unique: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true,
    },

    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', userSchema)