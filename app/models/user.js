var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        displayName  : String,
        password     : String,
        savesInUser: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Save'}]
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        displayName  : String,
        savesInUser: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Save'}]
    }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
