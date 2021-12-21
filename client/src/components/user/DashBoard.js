import { Typography } from "@mui/material";
import TodoList from '../todo/Todolist';

const todos = [
    {
        action: "Go to church",
        completed: false
    },
    {
        action: "Eat food",
        completed: true
    },
    {
        action: "pray",
        completed: true
    },
    {
        action: "Watch a movie",
        completed: false
    }
];

export default function DashBoard(){

    return (
        <div>
            <Typography variant="h2" class="header"> Hey there, John</Typography>
            <div>
                <span class="stats">
                    <Typography variant="body2" class="subtle">Your stats</Typography>
                </span>
            </div>
            <div class="stat-bar">
                <ul id="stat-list">
                    {useTaskInfo(todos).map(res => <li>{res}</li>)}
                </ul>
            </div>
            <TodoList todos={todos} />
        </div>
    );
}

function useTaskInfo(todoList){
    let todoCount = todoList.length;
    let done = todoList.filter(todo => todo.completed).length;
    let undone = todoCount - done;
    let res = [];
    res[0] = (todoCount === 1) ? "You have one task" : `You have ${todoCount} tasks`;
    res[1] = (done === 1) ? "Only one task is completed" : `${done} tasks are completed`;
    res[2] =(undone === 1) ? "Only one task is undone" : `${undone} tasks are undone`;
    return res;
}