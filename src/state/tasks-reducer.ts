import {TasksStateType} from "../App";
import {v1} from "uuid";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskAction = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusAction = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}

export type ActionsType = RemoveTaskActionType | AddTaskAction | ChangeTaskStatusAction

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.filter(t => t.id != action.taskId);
            return {...state}
        case 'ADD-TASK': {
            let task = {id: v1(), title: action.title, isDone: false};
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = [task, ...todolistTasks];
            return {...state}
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let task = todolistTasks.find(t => t.id === action.taskId);
            if (task) task.isDone = action.isDone;
            return {...state};
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskAction => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusAction => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}