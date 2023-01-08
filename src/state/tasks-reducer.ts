import {TasksStateType} from "../App";

export type RemoveTaskType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

export type ActionType = RemoveTaskType

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.filter(t => t.id != action.taskId);
            return {...state}
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}