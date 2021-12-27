import { Button, TextField, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';

export default function AddTodo(props) {
    const { setTodos } = props;
    const [text, setText] = useState("");
    const [addLoading, setAddLoading] = useState(false);

    function change(e){
        setText(e.target.value);
    }

    async function add(e){
        e.preventDefault();
        setAddLoading(true); setText("");
        const response = await axios.post('/api/', {
            action: text,
            id: nanoid()
        });
        switch(response.status){
            case 200: {
                setAddLoading(false);
                setTodos(response.data.todos);
                break;
            }
            case 409: {
                alert("Error! This todo already exists");
                break;
            }
            case 500: {
                alert("There was an error on the server. Try again later");
                break;
            }
            default: {
                console.log("An unexpected error occured");
            }
        }
    }

    return (
        <>
            <TextField style={{width: "20rem"}} value={text} onChange={change} />
            <span class="distance" >
                <Button variant="contained" onClick={add}
                    sx={{backgroundColor: "#3aa", color: "#ddd",}} 
                >
                    {addLoading ? <CircularProgress size="1rem" /> : "Add"}
                </Button>
            </span>
        </>
    );
}