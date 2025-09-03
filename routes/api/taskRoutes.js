const express = require('express')
const router = express.Router({ mergeparams: true }) // to access params from parent routers
const { protect } = require('../../utils/auth')
const Project = require('../../models/Project')
const Task = require('../../models/Task')

router.use(protect)

// Middleware to check project ownership before task operations
const checkProjectOwnership = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.projectId)
        if (!project) {
            return res.status(404).json({ message: 'Project not found' })
        }
        if (project.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized for this project' })
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

// POST /api/projects/:projectId/tasks @@ create a new task for a project
router.post('/', checkProjectOwnership, async (req, res) => {
    try {
        const newTask = new Task({
            ...req.body,
            project: req.params.projectId,
        });
        const task = await newTask.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET /api/projects/:projectId/tasks @@ Get all tasks for a project
router.get('/', checkProjectOwnership, async (req, res) => {
    try {
        const tasks = await Task.find({ project: req.params.projectId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Middleware for checking ownership on single task operations
const checkTaskOwnership = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.taskId).populate('project');
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (task.project.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized for this task' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// PUT /api/tasks/:taskId @@ Update a task
router.put('/:taskId', checkTaskOwnership, async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.taskId,
            req.body,
            { new: true }
        );
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE /api/tasks/:taskId @@ Delete a task
router.delete('/:taskId', checkTaskOwnership, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.taskId);
        res.json({ message: 'Task removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;