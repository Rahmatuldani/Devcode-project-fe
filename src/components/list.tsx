import { Card, CardContent, Checkbox, IconButton, Typography } from "@mui/material";
import { GoDotFill } from "react-icons/go";
import { TodoType } from "../store/todo/types";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Alert from "../utils/alert";
import ModalComponent from "./modal";
import { DeleteTodoFunction, UpdateTodoFunction } from "../store/todo/action";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

interface Props {
    id: number;
    data: TodoType
}

function ListComponent({
    id,
    data
}: Props) {
    const [check, setCheck] = React.useState<boolean>(Boolean(data.is_active))
    const [open, setOpen] = React.useState<boolean>(false)
    const dispatch: Dispatch = useDispatch();

    function handleCheck() {
        setCheck(!check)
        UpdateTodoFunction(dispatch, data.id, {is_active: !check})
    }

    function handleDelete() {
        Alert({
            text: `Apakah anda yakin ingin menghapus list item <br/> <strong>${data.title}</strong>?`,
            icon: 'warning',
            confirmText: 'Hapus',
            cancelButton: true,
            cancelButtonText: 'Batal',
            data_cy: 'modal-delete'
        }).then(result => {
            if (result.isConfirmed) {
                DeleteTodoFunction(dispatch, data.id)
                    .then(() => {
                        Alert({
                            text: 'To do list berhasil dihapus',
                            icon: 'success',
                            data_cy: 'modal-information'
                        })
                    })
            }
        });
    }

    return (
        <Card data-cy="todo-item" sx={{ width: '100%' }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem !important' }}>
                <Typography component={"div"} sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Checkbox data-cy="todo-item-checkbox" checked={check} onChange={handleCheck}/>
                    <GoDotFill data-cy="todo-item-priority-indicator" style={{ 
                        color: 
                            data.priority === 'very-high' ? 'red' : 
                            data.priority === 'high' ?  'orange' : 
                            data.priority === 'medium' ?  'green' : 
                            data.priority === 'low' ?  'blue' : 
                            'purple'
                        }}/>
                    <Typography
                        data-cy="todo-item-title"
                        sx={{
                            textDecoration: check ? 'line-through' : 'none'
                        }}
                    >
                        {data.title}
                    </Typography>
                    <IconButton data-cy="todo-item-edit-button" aria-label="edit" size="small" onClick={() => setOpen(true)}>
                        <MdEdit/>
                    </IconButton>
                </Typography>
                <IconButton data-cy="todo-item-delete-button" aria-label="delete" onClick={handleDelete}>
                    <MdDelete/>
                </IconButton>
            </CardContent>
            <ModalComponent id={id} data={data} open={open} handleClose={() => setOpen(false)}/>
        </Card>
    );
}

export default ListComponent;