import { Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import { FaTrashAlt } from "react-icons/fa";
import { ActivityType } from "../store/activity/types";
import { ConvertDate } from "../utils/convert";
import Alert from "../utils/alert";
import { DeleteActivityFunction } from "../store/activity/action";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

interface Props {
    data: ActivityType
}

function CardComponent({
    data
}: Props) {
    const dispatch: Dispatch = useDispatch();

    function handleDelete(data: ActivityType) {
        Alert({
            text: `Apakah anda yakin ingin menghapus activity <br/> <strong>${data.title}</strong>`,
            icon: 'warning',
            confirmText: 'Hapus',
            cancelButton: true,
            cancelButtonText: 'Batal'
        }).then(result => {
            if (result.isConfirmed) {
                DeleteActivityFunction(dispatch, data.id)
                    .then(() => {
                        Alert({
                            text: 'Activity berhasil dihapus',
                            icon: 'success'
                        })
                    })
                    .catch(error => {
                        Alert({
                            text: error,
                            icon: 'error'
                        })
                    })
            }
        })
    }

    return (
        <Card data-cy={`activity-item-${data.id}`} sx={{ width: '220px', height: '220px' }}>
            <CardContent sx={{ height: '100%', display: "flex", flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography data-cy="activity-item-title" component={'p'} sx={{ fontWeight: 700, fontSize: '18px', cursor: 'pointer' }}>
                    {data.title}
                </Typography>
                <Stack direction={'row'} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <p data-cy="activity-item-date">{ConvertDate(data.updated_at)}</p>
                    <IconButton data-cy="activity-item-delete-button" aria-label="delete" size="small" onClick={() => handleDelete(data)}>
                        <FaTrashAlt/>
                    </IconButton>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default CardComponent;