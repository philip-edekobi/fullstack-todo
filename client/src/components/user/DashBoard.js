/* eslint-disable react-hooks/exhaustive-deps */
import { Typography, Button, CircularProgress } from "@mui/material";
import TodoList from '../todo/Todolist';
import AddTodo from '../todo/AddTodo';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useEffect } from "react";
import { atom, useRecoilState } from 'recoil';

export default function DashBoard(){
    const [loggingOut, setLoggingOut] = useState(false);
    const [todos, setTodos] = useRecoilState(todoListState);

    const navigate = useNavigate();

    async function logout(){
        await axios.post('/api/logout');
        setLoggingOut(true);
        await setTimeout(() => navigate('/login'), 1500)
    }

    async function getTodos(){
        const response = await axios.get("/api/");
        setTodos(response.data.todos);
    }

    useEffect( async () => {
        getTodos();
    }, []);

    return (
        <div className="box">
        <Button id="lo" variant="outlined" 
        onClick={logout}>
            { loggingOut ? <CircularProgress style={{color: "#fff"}} size="1rem" /> : <>{<LogoutIcon />} &nbsp;Log Out</> }
        </Button>
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
                <AddTodo setTodos={setTodos} />
            </div>

            <TodoList setTodos={setTodos} todos={todos} />

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

const todoListState = atom({ key: 'todoListState',  default: [] });