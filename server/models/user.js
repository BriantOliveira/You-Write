// Caling the mongoose dependencies
const mongoose = require('mongoose');
// Calling the encryption method
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

// Use Schema
const UserSchema = new Schema ({
    createdAt: { type: Date },
    updatedAt: { type: Date },

    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlenght: [5, 'Username must be 5 characters or more.']
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlenght: [8, 'Password must be 8 characters or more.']
    }
});


UserSchema.pre('save', function (next) {
    let now = new Date();
    this.updatedAt = now;
    if ( !this.createdAt ) {
        this.createdAt = now;
    }

    // ENCRYPT

    let user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
        });
    });
});

UserSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, function(err, isMatch){
        done(err, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
