import Todo from './Todo';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { Typography } from "@mui/material";
import TablePagination from '@mui/material/TablePagination';
import { useState } from 'react';

export default function Todolist({ todos }){
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    let body = todos.map(todo => <Todo todo={todo} /> );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return(
        <Paper sx={{ backgroundColor: "#dee", width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky todo list table">
                    <TableHead id="head">
                        <TableRow>
                            <TableCell style={{backgroundColor: "inherit"}}>
                                <Typography variant="body1"><strong>Tasks</strong></Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {body}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 40]}
                component="div"
                count={body.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}