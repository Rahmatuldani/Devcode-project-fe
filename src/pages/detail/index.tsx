/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { MdEdit, MdKeyboardArrowLeft } from "react-icons/md";
import { ActivityType } from "../../store/activity/types";
import { useDispatch, useSelector } from "react-redux";
import { selectActivitySelected } from "../../store/activity/selector";
import React from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { UpdateActivityFunction } from "../../store/activity/action";
import { Dispatch } from "redux";
import Image from '../../assets/todo.svg';
import ListComponent from "../../components/list";
import ModalComponent from "../../components/modal";
import { TodoType } from "../../store/todo/types";
import { selectTodo, selectTodoIsLoading } from "../../store/todo/selector";
import { FetchTodoFunction } from "../../store/todo/action";

function Detail() {
    const { id } = useParams();
    const activity: ActivityType | null = useSelector(selectActivitySelected);
    const todo: TodoType[] = useSelector(selectTodo);
    const loading: boolean = useSelector(selectTodoIsLoading);
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

        todo.forEach(item => component.push(<ListComponent id={activity?.id ?? 1} key={item.id} data={item}/>))

        return component
    }

    React.useEffect(() => {
        FetchTodoFunction(dispatch, id ?? '1')
    }, [dispatch, id]);

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
                <ModalComponent id={activity?.id ?? 1} open={openModal} handleClose={() => setOpenModal(false)}/>
            </Stack>
            <Stack direction={'row'} flexWrap={'wrap'} sx={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: "0.5rem" }}>
                {loading ? (
                    <>Loading...</>
                ) : todo.length > 0 ? (
                    displayData()
                ) : (
                    <img src={Image} alt="Image" width={500}/>
                )}
            </Stack>
        </>
    );
}

export default Detail;