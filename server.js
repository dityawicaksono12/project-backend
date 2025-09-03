const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config() // load env var

connectDB()

const app = express()

app.use(express.json()) // init middleware to parse JSON bodies

app.use('/api/users', require('./routes/api/userRoutes'))
app.use('/api/projects', require('./routes/api/projectRoutes'))

// handle POST and GET for tasks in a project
app.use('/api/projects/:projectId/tasks', require('./routes/api/taskRoutes'))

// handle PUT and DELETE for individual tasks by their own ID
app.use('/api/tasks', require('./routes/api/taskRoutes'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))