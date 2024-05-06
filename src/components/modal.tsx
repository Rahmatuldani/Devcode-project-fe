import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { MdClose } from "react-icons/md";
import { TodoType } from "../store/todo/types";
import React from "react";
import { GoDotFill } from "react-icons/go";
import { CreateTodoFunction, UpdateTodoFunction } from "../store/todo/action";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

interface Props {
    id: number;
    data?: TodoType;
    open: boolean;
    handleClose: () => void;
}

function ModalComponent({
    id,
    data,
    open,
    handleClose,
}: Props) {
    const [title, setTitle] = React.useState<string>(data?.title ?? '')
    const [priority, setPriority] = React.useState<string>(data?.priority ?? 'very-high')
    const dispatch: Dispatch = useDispatch();

    function handleTitle(e: React.ChangeEvent<HTMLInputElement>) { setTitle(e.target.value) }
    function handlePriority(e: SelectChangeEvent) { setPriority(e.target.value) }

    function handleSubmit() {
        if (data) {
            UpdateTodoFunction(dispatch, data.id, {
                activity_group_id: id,
                title,
                priority,
                is_active: false
            })
        } else {
            CreateTodoFunction(dispatch, {
                activity_group_id: id,
                title,
                priority,
                is_active: false
            })
        }
        setTitle('')
        setPriority('')
        handleClose()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-component"
        >
            <Box sx={{ width: '600px' }}>
                <DialogTitle>Tambah List Item</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <MdClose/>
                </IconButton>
                <DialogContent dividers>
                    <FormGroup>
                        <InputLabel id="priority-label">Nama List Item</InputLabel>
                        <TextField
                            id="list-item"
                            placeholder="Tambahkan nama list item"
                            variant="outlined"
                            fullWidth
                            value={title}
                            sx={{ marginBottom: '1rem' }}
                            onChange={handleTitle}
                        />
                    </FormGroup>
                    <FormGroup sx={{ width: 'fit-content' }}>
                        <InputLabel id="priority-label">Priority</InputLabel>
                        <Select
                            labelId="priority-label"
                            id="priority-menu"
                            value={priority}
                            label="Priority"
                            onChange={handlePriority}
                        >
                            <MenuItem value="very-high">
                                <GoDotFill style={{ color: 'red', marginRight: '1rem' }} />
                                Very High
                            </MenuItem>
                            <MenuItem value="high">
                                <GoDotFill style={{ color: 'orange', marginRight: '1rem' }} />
                                High
                            </MenuItem>
                            <MenuItem value="medium">
                                <GoDotFill style={{ color: 'green', marginRight: '1rem' }} />
                                Medium
                            </MenuItem>
                            <MenuItem value="low">
                                <GoDotFill style={{ color: 'blue', marginRight: '1rem' }} />
                                Low
                            </MenuItem>
                            <MenuItem value="very-low">
                                <GoDotFill style={{ color: 'purple', marginRight: '1rem' }} />
                                Very Low
                            </MenuItem>
                        </Select>
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        autoFocus
                        sx={{ borderRadius: '30px', textTransform: 'none', fontSize: '18px', fontWeight: '600' }}
                        onClick={handleSubmit}
                    >
                        Simpan
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}

export default ModalComponent;