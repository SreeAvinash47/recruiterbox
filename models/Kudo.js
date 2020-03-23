const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating kudos schema
const KudoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
    },
    kudos_count: {
        type: Number,
    },
    my_kudos: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            name: {
                type: String
            },
            message: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    given_kudos: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            name: {
                type: String
            },
            message: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Kudo = mongoose.model('kudo', KudoSchema);