const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');
const Task = require('../model/task');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (value.length <= 6) {
                throw new Error('Password length must greater than 6');
            } else if (value.toLowerCase().includes('password')) {
                throw new Error('Password must not contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
});

userSchema.plugin(uniqueValidator);

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
});

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Unable to login');
        }

        const isMatch = await bcrypt.compare(password.toString(), user.password);
        if (!isMatch) {
            throw new Error('Unable to login');
        }
        return user;
    }
    catch (e) {
        console.log(e);
    }
}

//Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next();
});
// Delete user's tasks when user is reomoved;
userSchema.pre('remove', async function (next) {
    const user = this;
    await Task.deleteMany({ owner: user._id });
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;