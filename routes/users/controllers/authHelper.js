const User = require('../models/User')
const Calendar = require('../../calendar/models/Calendar')
const Category = require('../../category/models/Category')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function createUser(user){
    let newUser = await new User({
        username: user.username,
        email: user.email,
        password: user.password
    })
    return newUser
}

async function createCalendar(userID){
    let newCalendar = await new Calendar({
        user_id: userID
    })
    return newCalendar
}

async function createDefaultCategory(userID){
    let newDefaultCategory = await new Category({
        user_id: userID,
        name: 'UNIDENTIFIED'
    })
    return newDefaultCategory
}

async function hashPassword(password){
    let genSalt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(password, genSalt)

    return hashedPassword
}

async function errorHandler(error){
    let errorMessage = null

    if (error.errmsg.includes('email_1')){
        errorMessage = 'Email already exists! Please choose another one.'
    } else if (error.errmsg.includes('username_1')){
        errorMessage = 'Username already exists! Please choose another one.'
    }
    return errorMessage
}

async function findOneUser(email){
    try {
        let foundUser = User.findOne({email})
        if (!foundUser){
            return 404
        }
        return foundUser
    } catch (error) {
        return error
    }
}

async function comparePassword(incomingPassword, userPassword){
    try {
        let comparedPassword = await bcrypt.compare(incomingPassword, userPassword)
        if (comparedPassword){
            return comparedPassword
        } else {
            return 409
        }
    } catch (error) {
        return error
    }
}

async function createJwtToken(user){
    let payload = {
        id: user._id,
        email: user.email,
        username: user.username
    }
    let jwtToken = await jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 3600})
    return jwtToken
}

module.exports = {
    createUser,
    createCalendar,
    hashPassword,
    errorHandler,
    findOneUser,
    comparePassword,
    createJwtToken,
    createDefaultCategory
}