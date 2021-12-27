import { TableRow, TableCell, CircularProgress } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import axios from 'axios';

export default function Todo({ todo, setTodos }){
    const [toggleLoading, setToggleLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    async function deleteTodo(e){
        setDeleteLoading(true);
        const response = await axios.delete(`/api/${e.target.id}`);
        switch (response.status){
            case 200: {
                setDeleteLoading(false);
                setTodos(response.data.todos);
                break;
            }
            case 404: {
                setDeleteLoading(false);
                alert("Error! Todo does not exist")
                break;
            }
            case 500: {
                setDeleteLoading(false);
                alert("An error occured on the server, try again");
                break;
            }
            default: {
                setDeleteLoading(false);
                console.log("An unexpected error occured.");
            }
        }
    }

    async function toggleComplete(e) {
        setToggleLoading(true);
        const response = await axios.patch(`/api/${e.target.id}/`,{
            completed: !todo.completed
        });
        switch(response.status){
            case 200: {
                setToggleLoading(false);
                setTodos(response.data.todos);
                break;
            }
            case 404: {
                setToggleLoading(false);
                alert("Error! Todo nor found.");
                break;
            }
            case 500: {
                setToggleLoading(false);
                alert("An error occured on the server, try again");
                break;
            }
            default: {
                console.log("An unexpected error occured");
            }
        }
    }

    return (
        <TableRow key={todo.id}>
            <TableCell id={todo.id} onClick={toggleComplete} className="row" align="left">
                {todo.action}
                <span class="distance">
                    {toggleLoading ? 
                        <CircularProgress size="1rem" /> 
                    : 
                        todo.completed ? <DoneIcon id="done" /> : null}
                </span>
            </TableCell>
            <TableCell align="left">
             {deleteLoading
              ? <CircularProgress size="1rem" /> 
              : <DeleteIcon onClick={deleteTodo} id={todo.id} className="del" />}
            </TableCell>
        </TableRow>
    );
}