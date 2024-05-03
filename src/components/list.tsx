import { Card, CardContent, Checkbox, IconButton, Typography } from "@mui/material";
import { GoDotFill } from "react-icons/go";
import { TodoType } from "../store/todo/types";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Alert from "../utils/alert";
import ModalComponent from "./modal";

interface Props {
    data: TodoType
}

function ListComponent({
    data
}: Props) {
    const [check, setCheck] = React.useState<boolean>(Boolean(parseInt(data.is_active)))
    const [open, setOpen] = React.useState<boolean>(false)

    function handleCheck() { setCheck(!check) }

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
                Alert({
                    text: 'To do list berhasil dihapus',
                    icon: 'success',
                    data_cy: 'modal-information'
                })
            }
        });
    }

    return (
        <Card sx={{ width: '100%' }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem !important' }}>
                <Typography component={"div"} sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Checkbox checked={check} onChange={handleCheck}/>
                    <GoDotFill style={{ 
                        color: 
                            data.priority === 'very-high' ? 'red' : 
                            data.priority === 'high' ?  'orange' : 
                            data.priority === 'medium' ?  'green' : 
                            data.priority === 'low' ?  'blue' : 
                            'purple'
                        }}/>
                    <Typography
                        sx={{
                            textDecoration: check ? 'line-through' : 'none'
                        }}
                    >
                        {data.title}
                    </Typography>
                    <IconButton aria-label="edit" size="small" onClick={() => setOpen(true)}>
                        <MdEdit/>
                    </IconButton>
                </Typography>
                <IconButton aria-label="delete" onClick={handleDelete}>
                    <MdDelete/>
                </IconButton>
            </CardContent>
            <ModalComponent data={data} open={open} handleClose={() => setOpen(false)}/>
        </Card>
    );
}

export default ListComponent;