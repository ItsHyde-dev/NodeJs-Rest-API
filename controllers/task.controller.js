class TaskController {
    constructor() {

    }

    async createTask(req, res, next) {
        try {
            //code to create task
        } catch (error) {
            next(error)
        }
    }

    async getAllTasks(req, res, next) {
        try {
            //code to get all tasks
        } catch (error) {
            next(error)
        }
    }

    async getTask(req, res, next) {
        try {
            //code to get task
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TaskController