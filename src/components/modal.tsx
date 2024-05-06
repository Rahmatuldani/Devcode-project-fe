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
        if (!title) {
            return
        }
        if (data) {
            UpdateTodoFunction(dispatch, data.id, {
                activity_group_id: id,
                title,
                priority: priority ?? undefined,
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
        setPriority('very-high')
        handleClose()
    }

    return (
        <Dialog
            data-cy="modal-add"
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-component"
        >
            <Box sx={{ width: '600px' }}>
                <DialogTitle data-cy="modal-add-title">Tambah List Item</DialogTitle>
                <IconButton
                    data-cy="modal-add-close-button"
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
                        <InputLabel data-cy="modal-add-name-title" id="priority-label">Nama List Item</InputLabel>
                        <TextField
                            data-cy="modal-add-name-input"
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
                        <InputLabel data-cy="modal-add-priority-title" id="priority-label">Priority</InputLabel>
                        <Select
                            data-cy="modal-add-priority-dropdown"
                            labelId="priority-label"
                            id="priority-menu"
                            value={priority}
                            label="Priority"
                            onChange={handlePriority}
                        >
                            <MenuItem data-cy="modal-add-priority-item" value="very-high">
                                <GoDotFill style={{ color: 'red', marginRight: '1rem' }} />
                                Very High
                            </MenuItem>
                            <MenuItem data-cy="modal-add-priority-item" value="high">
                                <GoDotFill style={{ color: 'orange', marginRight: '1rem' }} />
                                High
                            </MenuItem>
                            <MenuItem data-cy="modal-add-priority-item" value="normal">
                                <GoDotFill style={{ color: 'green', marginRight: '1rem' }} />
                                Medium
                            </MenuItem>
                            <MenuItem data-cy="modal-add-priority-item" value="low">
                                <GoDotFill style={{ color: 'blue', marginRight: '1rem' }} />
                                Low
                            </MenuItem>
                            <MenuItem data-cy="modal-add-priority-item" value="very-low">
                                <GoDotFill style={{ color: 'purple', marginRight: '1rem' }} />
                                Very Low
                            </MenuItem>
                        </Select>
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button
                        data-cy="modal-add-save-button"
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