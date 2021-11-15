import { useState, useEffect } from 'react';
import axios from "axios";

export default function Todolist(){
    const [todos, setTodos] = useState([]);

    async function loadData() {
        let response = await axios.get("http://localhost:5000/todos");
        let responseArr = response.data.result;
        setTodos(responseArr);
    }

    useEffect(() => loadData(), []);

    return(
        <div>
            <ul>
                {todos.map((todo, index) => <li key={index}>{todo.content}</li>)}
            </ul>
        </div>
    );
}