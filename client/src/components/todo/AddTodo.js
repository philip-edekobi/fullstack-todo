import { Button, TextField, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';

export default function AddTodo(todo) {
    const [text, setText] = useState("");
    const [addLoading, setAddLoading] = useState(false);

    function change(e){
        setText(e.target.value);
    }

    async function add(e){
        e.preventDefault();
        setAddLoading(true);
        const response = await axios.post('/api/', {
            action: text,
            id: nanoid()
        });
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