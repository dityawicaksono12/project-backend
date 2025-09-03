const express = require('express')
const router = express.Router()
const { protect } = require('../../utils/auth')
const Project = require('../../models/Project')
const { rawListeners } = require('../../models/Users')

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

// middleware to check project ownership
const checkOwnership = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id)

        if (!project) {
            return res.status(404).json({ message: 'Project not found' })
        }

        // check if the project's user ID matches the logged-in user's
        if (project.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized' })
        }

        req.project = project // attach project to the request object
        next()
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}