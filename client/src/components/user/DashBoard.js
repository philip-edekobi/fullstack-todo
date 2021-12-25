import { Typography } from "@mui/material";
import TodoList from '../todo/Todolist';
import AddTodo from '../todo/AddTodo';

const todos = [
    {
        id: 1,
        action: "Go to church",
        completed: true
    },
    {
        id: 2,
        action: "Eat food",
        completed: false
    },
    {
        id: 3,
        action: "pray",
        completed: true
    },
    {
        id: 4,  
        action: "Watch a movie",
        completed: false
    }
];

export default function DashBoard(){

    return (
        <div className="box">
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

            <div id="form">
                <AddTodo />
            </div>

            <TodoList todos={todos} />

            <footer>
                Poposki &copy; 2021
            </footer>
        </div>
    );
}

function useTaskInfo(todoList){
    let todoCount = todoList.length;
    let done = todoList.filter(todo => todo.completed).length;
    let undone = todoCount - done;
    let res = [];

    res[0] = (todoCount === 0) ? "You have no task" : (todoCount === 1) ? "You have only one task" : `You have ${todoCount} tasks` ;
    res[1] = (done === 0) ? "No task is completed yet" : (done ===1) ? "You have completed 1 task" :  `${done} tasks are completed`;
    res[2] =(undone === 0) ? "There is no undone task" :(undone === 1) ? "Only one task left to do" : `${undone} tasks are undone`;

    return res;
}