const mongoose = require('mongoose');
const encryption = require('../util/encryption');
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true,},
    hashedPass: { type: mongoose.Schema.Types.String, required: true },
    firstName: { type: mongoose.Schema.Types.String },
    lastName: { type: mongoose.Schema.Types.String },
    salt: { type: mongoose.Schema.Types.String, required: true },
    roles: [{ type: mongoose.Schema.Types.String }],
    isAdmin: {type: Boolean, default: false},
    rentedCars:[{type: ObjectId, ref: 'Car'}]
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const User = mongoose.model('User', userSchema);

const salt = encryption.generateSalt();
const hashedPass = encryption.generateHashedPassword(salt, 'Admin');
User.create({
                username: 'adminuser',
                salt,
                hashedPass,
                roles: ['Admin'],
                isAdmin: true
            });

module.exports = User;

