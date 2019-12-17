const { createUser,
    createCalendar,
    hashPassword,
    errorHandler,
    findOneUser,
    comparePassword,
    createJwtToken,
    createDefaultCategory } = require('./authHelper')

module.exports = {
    signup: async (req, res) => {
        try {
            let newUser = await createUser(req.body)
            let newCalendar = await createCalendar(newUser._id)
            let newDefaultCategory = await createDefaultCategory(newUser._id)
            await newDefaultCategory.save()
            await newCalendar.categories.push(newDefaultCategory)
            await newCalendar.save()
            newUser.password = await hashPassword(newUser.password)
            let savedUser = await newUser.save()
            let jwtToken = await createJwtToken(savedUser)
            console.log('success ', jwtToken)
            res.status(200).json({
                token: jwtToken,
            })
        } catch (error) {
            let errorMessage = await errorHandler(error)
            res.status(500).json({
                message: errorMessage
            })
        }
    },
    signin: async (req, res) => {
        try {
            let foundUser = await findOneUser(req.body.email)
            if (foundUser === 404){
                throw {
                    status: 500,
                    message: 'User not found, please sign up'
                }
            }
            let comparedPassword = await comparePassword(req.body.password, foundUser.password)
            if (comparedPassword === 409){
                throw {
                    status: 409,
                    message: 'Check your email and password'
                }
            }
            let jwtToken = await createJwtToken(foundUser)

            res.status(200).json({
                token: jwtToken
            })
        } catch (error) {
            res.status(error.status).json({
                message: error.message
            })
        }
    }
}