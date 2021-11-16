import { useState, useEffect } from 'react';
import axios from "axios";

export default function Todolist(){
    const [todos, setTodos] = useState([]);
    const URL = "http://localhost:5000/todos";

    async function loadData(data = null) {
        if(data){
            setTodos(data);
            return;
        }
        let response = await axios.get(URL);
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