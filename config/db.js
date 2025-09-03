const mongoose = require('mongoose')

const connectDB = async () => {
    try {

    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB