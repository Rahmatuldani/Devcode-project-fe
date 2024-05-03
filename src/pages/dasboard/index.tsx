/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Stack, Typography } from "@mui/material";
import { ActivityType } from "../../store/activity/types";
import Image from '../../assets/duplicate.svg';
import { FaPlus } from "react-icons/fa6";
import CardComponent from "../../components/card";
import { useDispatch, useSelector } from "react-redux";
import { selectActivity } from "../../store/activity/selector";
import React from "react";
import { CreateActivityFunction, FetchActivityFunction } from "../../store/activity/action";
import { Dispatch } from "redux";

function Dashboard() {
    const data: ActivityType[] = useSelector(selectActivity)
    const loading: boolean = false
    const dispatch: Dispatch = useDispatch();

    function DisplayData() {
        const items: any[] = []
        data.slice(0, 15).forEach(item => items.push(<CardComponent data={item} key={item.id}/>))
        return items
    }

    function handleAddActivity() {
        CreateActivityFunction(dispatch)
    }

    React.useEffect(() => {
        FetchActivityFunction(dispatch)
    }, [dispatch]);

    return (
        <>
            <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
                <Typography data-cy="activity-title" component={"p"} sx={{ fontWeight: 700, fontSize: '36px' }}>
                    Activity
                </Typography>
                <Button data-cy="activity-add-button" variant="contained" sx={{ borderRadius: '30px', textTransform: 'none', fontSize: '18px', fontWeight: '600', gap: '2px' }} onClick={handleAddActivity}>
                    <FaPlus/>
                    Tambah
                </Button>
            </Stack>
            <Stack direction={'row'} flexWrap={'wrap'} sx={{ marginY: '2rem', display: 'flex', justifyContent: 'center', gap: "1rem" }}>
                {loading ? (
                    <>Loading</>
                ) : data.length > 0 ? (
                    DisplayData()
                ) : (
                    <img data-cy="activity-empty-state" src={Image} alt="Image" width={500}/>
                )}
            </Stack>
        </>
    );
}

export default Dashboard;