import { Button, TextField, CircularProgress } from '@mui/material';
import { Fragment, useState } from 'react';

export default function AddTodo(todo) {
    const [text, setText] = useState("");
    const [addLoading, setAddLoading] = useState(false);

    function change(e){
        setText(e.target.value);
    }

    function add(){
        return null;
    }

    return (
        <Fragment >
            <TextField sx={{width: "20rem"}} value={text} onChange={change} />
            <span class="distance" >
                <Button variant="contained" onClick={add}
                    sx={{backgroundColor: "#3aa", color: "#ddd",}} 
                >
                    {addLoading ? <CircularProgress size="1rem" /> : "Add"}
                </Button>
            </span>
        </Fragment>
    );
}