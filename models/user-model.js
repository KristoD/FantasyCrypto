const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require('bcrypt'),
      SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    usd: {type: Number, required: true, default: 50000},
    coin: {
        btc: [{
            amt: {type: Number},
            price: {type: Number},
            total: {type: Number},
            time: {type: Date, default: Date.now()}
        }],
        eth: [{
            amt: {type: Number},
            price: {type: Number},
            total: {type: Number},
            time: {type: Date, default: Date.now()}
        }],
        etc: [{
            amt: {type: Number},
            price: {type: Number},
            total: {type: Number},
            time: {type: Date, default: Date.now()}
        }],
        bch: [{
            amt: {type: Number},
            price: {type: Number},
            total: {type: Number},
            time: {type: Date, default: Date.now()}
        }],
        ltc: [{
            amt: {type: Number},
            price: {type: Number},
            total: {type: Number},
            time: {type: Date, default: Date.now()}
        }]
    },
    sold: {
        btc: [{
            amt: {type: Number},
            purchasePrice: {type: Number},
            price: {type: Number},
            total: {type: Number},
            time: {type: Date, default: Date.now()}
        }],
        eth: [{
            amt: {type: Number},
            purchasePrice: {type: Number},
            price: {type: Number},
            total: {type: Number},
            time: {type: Date, default: Date.now()}
        }],
        etc: [{
            amt: {type: Number},
            purchasePrice: {type: Number},
            price: {type: Number},
            total: {type: Number},
            time: {type: Date, default: Date.now()}
        }],
        bch: [{
            amt: {type: Number},
            purchasePrice: {type: Number},
            price: {type: Number},
            total: {type: Number},
            time: {type: Date, default: Date.now()}
        }],
        ltc: [{
            amt: {type: Number},
            purchasePrice: {type: Number},
            price: {type: Number},
            total: {type: Number},
            time: {type: Date, default: Date.now()}
        }]
    }
}, {timestamps: true});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hashes password if it has been modified or new
    if(!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if(err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if(err) return cb(err);
        cb(null, isMatch);
    });
}

module.exports = mongoose.model('User', UserSchema);