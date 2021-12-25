import { TableRow, TableCell, CircularProgress } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

export default function Todo({ todo }){
    const [toggleLoading, setToggleLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    return (
        <TableRow id="row" key={todo.id}>
            <TableCell align="left">
                {todo.action}
                <span class="distance">
                    {toggleLoading ? 
                        <CircularProgress size="1rem" /> 
                    : 
                        todo.completed ? <DoneIcon id="done" /> : null}
                </span>
            </TableCell>
            <TableCell align="left"> {deleteLoading ? <CircularProgress size="1rem" /> : <DeleteIcon id="del" />}</TableCell>
        </TableRow>
    );
}