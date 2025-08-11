import { Router } from "express";
import { allTasks, createTask, deleteTasks, updateTasks } from "../controllers/task.controler.js";

const taskRouter = Router()

taskRouter.route("/task").post(createTask)

taskRouter.route('/alltasks').get(allTasks)

taskRouter.route('/update/:id').put(updateTasks)
taskRouter.route('/delete/:id').delete(deleteTasks)

export{taskRouter}