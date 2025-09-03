const express = require('express')
const router = express.Router()
const { protect } = require('../../utils/auth')
const Project = require('../../models/Project')

// POST /api/projects @@ create a new project
router.post('/', async (req, res) => {
    try {
        const newProject = new Project({
            ...req.body,
            user: req.user.id,
        })
        const project = await newProject.save()
        res.status(201).json(project)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
})

// GET /api/projects @@ get all projects for the logged-in user
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user.id })
        res.json(projects)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
})