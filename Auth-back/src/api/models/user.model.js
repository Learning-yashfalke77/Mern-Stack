const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { jwtSecret, jwtExpirationInterval } = require('../../config/vars'); const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }

}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    } else {
        this.password = await bcrypt.hash(this.password, 10)
        next()
    }
})

userSchema.statics.findAndValidate = async function (email, password) {
    const foundUser = await this.findOne({ email })
    if (!foundUser) return false
    const isValid = await bcrypt.compare(password, foundUser.password)
    return isValid ? foundUser : false
}

userSchema.methods.generateAuthToken = async function () {
    const token = await jwt.sign({ _id: this._id, role: this.role, username: this.username }, jwtSecret, { expiresIn: jwtExpirationInterval })
    return token
}

module.exports = mongoose.model('User', userSchema)