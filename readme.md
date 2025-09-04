# TaskMaster API

This is the backend API for the TaskMaster productivity application.

## Data Models

- **User**: `username`, `email`, `password`
- **Project**: `name`, `description`, `user` (owner)
- **Task**: `title`, `description`, `status`, `project` (parent)

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user.
- `POST /api/users/login` - Log in a user and get a JWT.

### Projects (Protected)
- `GET /api/projects` - Get all projects for the logged-in user.
- `POST /api/projects` - Create a new project.
- `GET /api/projects/:id` - Get a single project by ID (must own).
- `PUT /api/projects/:id` - Update a project (must own).
- `DELETE /api/projects/:id` - Delete a project (must own).

### Tasks (Protected)
- `GET /api/projects/:projectId/tasks` - Get all tasks for a specific project (must own project).
- `POST /api/projects/:projectId/tasks` - Create a new task for a project (must own project).
- `PUT /api/tasks/:taskId` - Update a task (must own parent project).
- `DELETE /api/tasks/:taskId` - Delete a task (must own parent project).
