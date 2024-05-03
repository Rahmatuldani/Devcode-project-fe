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

function Detail() {
    const activity: ActivityType | undefined = useSelector(selectActivitySelected);
    const navigate: NavigateFunction = useNavigate();
    const dispatch: Dispatch = useDispatch();

    const [title, setTitle] = React.useState<string>(activity ? activity.title : 'Undefined')
    const [changeTitle, setChangeTitle] = React.useState<boolean>(false);

    function handleChangeTitle() {
        setChangeTitle(!changeTitle)
        UpdateActivityFunction(dispatch, activity?.id ?? 1, title)
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
                <Button data-cy="activity-add-button" variant="contained" sx={{ borderRadius: '30px', textTransform: 'none', fontSize: '18px', fontWeight: '600', gap: '2px' }}>
                    <FaPlus/>
                    Tambah
                </Button>
            </Stack>
            <Stack direction={'row'} flexWrap={'wrap'} sx={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: "1rem" }}>
                {/* {data ? (
                    <>
                        <CardComponent/>
                    </>
                ) : (
                )} */}
                <img src={Image} alt="Image" width={500}/>
                {/* <ListComponent/> */}
            </Stack>
        </>
    );
}

export default Detail;