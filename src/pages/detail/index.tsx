/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { MdEdit, MdKeyboardArrowLeft } from "react-icons/md";
import { ActivityType } from "../../store/activity/types";
import { useDispatch, useSelector } from "react-redux";
import { selectActivitySelected } from "../../store/activity/selector";
import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { UpdateActivityFunction } from "../../store/activity/action";
import { Dispatch } from "redux";
import Image from '../../assets/todo.svg';
import ListComponent from "../../components/list";
import ModalComponent from "../../components/modal";
import { TodoType } from "../../store/todo/types";

function Detail() {
    const activity: ActivityType | undefined = useSelector(selectActivitySelected);
    const todo: TodoType[] = [
        {
            id: 1,
            title: "To Do Title",
            activity_group_id: "1",
            is_active: "1",
            priority: "very-high",
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        },
        {
            id: 2,
            title: "To Do Title 2",
            activity_group_id: "1",
            is_active: "0",
            priority: "very-low",
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        }
    ]
    const navigate: NavigateFunction = useNavigate();
    const dispatch: Dispatch = useDispatch();

    const [title, setTitle] = React.useState<string>(activity ? activity.title : 'Undefined')
    const [changeTitle, setChangeTitle] = React.useState<boolean>(false);
    const [openModal, setOpenModal] = React.useState<boolean>(false)

    function handleChangeTitle() {
        setChangeTitle(!changeTitle)
        UpdateActivityFunction(dispatch, activity?.id ?? 1, title)
    }

    function displayData() {
        const component: any[] = []

        todo.forEach(item => component.push(<ListComponent key={item.id} data={item}/>))

        return component
    }

    return (
        <>
            <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <IconButton aria-labelledby="back-button" onClick={() => navigate('/')}>
                        <MdKeyboardArrowLeft/>
                    </IconButton>
                    {changeTitle ? (
                        <TextField 
                            variant="standard" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={handleChangeTitle}
                        />
                    ) : (
                        <Typography data-cy="activity-title" component={"p"} sx={{ fontWeight: 700, fontSize: '36px' }} onClick={() => setChangeTitle(true)}>
                            {title}
                        </Typography>
                    )}
                    <IconButton aria-labelledby="back-button" size="small" onClick={() => setChangeTitle(!changeTitle)}>
                        <MdEdit/>
                    </IconButton>
                </div>
                <Button data-cy="activity-add-button" variant="contained" sx={{ borderRadius: '30px', textTransform: 'none', fontSize: '18px', fontWeight: '600', gap: '2px' }} onClick={() => setOpenModal(true)}>
                    <FaPlus/>
                    Tambah
                </Button>
                <ModalComponent open={openModal} handleClose={() => setOpenModal(false)}/>
            </Stack>
            <Stack direction={'row'} flexWrap={'wrap'} sx={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: "0.5rem" }}>
                {todo.length > 0 ? (
                    displayData()
                ) : (
                    <img src={Image} alt="Image" width={500}/>
                )}
            </Stack>
        </>
    );
}

export default Detail;