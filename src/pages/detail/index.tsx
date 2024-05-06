/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, IconButton, Menu, MenuItem, Stack, TextField, Typography } from "@mui/material";
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
import { LuArrowUpDown } from "react-icons/lu";
import { FaSortAlphaDown, FaSortAlphaUp, FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";

function Detail() {
    const { id } = useParams();
    const activity: ActivityType | null = useSelector(selectActivitySelected);
    const todo: TodoType[] = useSelector(selectTodo);
    const loading: boolean = useSelector(selectTodoIsLoading);
    const navigate: NavigateFunction = useNavigate();
    const dispatch: Dispatch = useDispatch();

    const [title, setTitle] = React.useState<string>(activity ? activity.title : 'Undefined')
    const [changeTitle, setChangeTitle] = React.useState<boolean>(false);
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const [filter, setFilter] = React.useState<string>('new');

    function handleChangeTitle() {
        setChangeTitle(!changeTitle)
        UpdateActivityFunction(dispatch, activity?.id ?? 1, title)
    }

    function displayData() {
        const component: any[] = []
        let data: TodoType[];
        if (filter === 'old') {
            data = todo.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
        } else if (filter === 'a-z') {
            data = todo.sort((a, b) => a.title[0] < b.title[0] ? -1 : a.title[0] > b.title[0] ? 1 : 0)
        } else if(filter === 'z-a') {
            data = todo.sort((a, b) => a.title[0] < b.title[0] ? 1 : a.title[0] > b.title[0] ? -1 : 0)
        } else if(filter === 'uncheck') {
            data = todo.sort((a, b) => a.is_active < b.is_active ? -1 : a.is_active > b.is_active ? 1 : 0)
        } else {
            data = todo.sort((a, b) => a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0)
        }

        data.forEach(item => component.push(<ListComponent id={activity?.id ?? 1} key={item.id} data={item}/>))

        return component
    }

    function handleOpenMenu(e: React.MouseEvent<HTMLButtonElement>) { setAnchorEl(e.currentTarget) }
    function handleCloseMenu(select?: string) {
        if (select) {
            setFilter(select)
        }
        setAnchorEl(null) 
    }

    React.useEffect(() => {
        FetchTodoFunction(dispatch, id ?? '1')
    }, [dispatch, id]);

    return (
        <>
            <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <IconButton data-cy="todo-back-button" aria-labelledby="back-button" onClick={() => navigate('/')}>
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
                        <Typography data-cy="todo-title" component={"p"} sx={{ fontWeight: 700, fontSize: '36px' }} onClick={() => setChangeTitle(true)}>
                            {title}
                        </Typography>
                    )}
                    <IconButton data-cy="todo-title-edit-button" aria-labelledby="edit-button" size="small" onClick={() => setChangeTitle(!changeTitle)}>
                        <MdEdit/>
                    </IconButton>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <IconButton
                        data-cy="todo-sort-button"
                        id="sort-button"
                        aria-label="sort button"
                        aria-controls={openMenu ? 'sort-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenu ? 'true': undefined}
                        onClick={handleOpenMenu}
                    >
                        <LuArrowUpDown/>
                    </IconButton>
                    <Menu
                        data-cy="sort-parent"
                        id="sort-menu"
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={() => handleCloseMenu()}
                        MenuListProps={{
                            'aria-labelledby': 'menu-button'
                        }}
                    >
                        <MenuItem data-cy="sort-latest" onClick={() => handleCloseMenu('new')}>
                            <FaSortAmountDownAlt style={{ marginRight: '1rem' }}/>
                            Terbaru
                        </MenuItem>
                        <MenuItem data-cy="sort-oldest" onClick={() => handleCloseMenu('old')}>
                            <FaSortAmountUpAlt style={{ marginRight: '1rem' }}/>
                            Terlama
                        </MenuItem>
                        <MenuItem data-cy="sort-az" onClick={() => handleCloseMenu('a-z')}>
                            <FaSortAlphaDown style={{ marginRight: '1rem' }}/>
                            A-Z
                        </MenuItem>
                        <MenuItem data-cy="sort-za" onClick={() => handleCloseMenu('z-a')}>
                            <FaSortAlphaUp style={{ marginRight: '1rem' }}/>
                            Z-A
                        </MenuItem>
                        <MenuItem data-cy="sort-unfinished" onClick={() => handleCloseMenu('uncheck')}>
                            <LuArrowUpDown style={{ marginRight: '1rem' }}/>
                            Belum Selesai
                        </MenuItem>
                    </Menu>
                    <Button data-cy="todo-add-button" variant="contained" sx={{ borderRadius: '30px', textTransform: 'none', fontSize: '18px', fontWeight: '600', gap: '2px' }} onClick={() => setOpenModal(true)}>
                        <FaPlus/>
                        Tambah
                    </Button>
                </div>
                <ModalComponent id={activity?.id ?? 1} open={openModal} handleClose={() => setOpenModal(false)}/>
            </Stack>
            <Stack direction={'row'} flexWrap={'wrap'} sx={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: "0.5rem" }}>
                {loading ? (
                    <>Loading...</>
                ) : todo.length > 0 ? (
                    displayData()
                ) : (
                    <img src={Image} data-cy="todo-empty-state" alt="Image" width={500}/>
                )}
            </Stack>
        </>
    );
}

export default Detail;