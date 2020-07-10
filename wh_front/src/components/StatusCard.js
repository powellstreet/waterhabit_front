import React from 'react'
import { Typography } from '@material-ui/core';

const StatusCard = ({ status }) => {
    if(status === 0){
        return <Typography>물 한잔 해보시죠</Typography>
    } else if(0 < status && status < 25){
        return <Typography> 25 미만!</Typography>
    } else if (25 <= status && status < 50){
        return <Typography> 50 미만!</Typography>
    } else if (50 <= status && status < 75){
        return <Typography> 75 미만!</Typography>
    } else if (75 <= status && status < 100){
        return <Typography> 거의 다 와써!</Typography>
    } else if (100 <= status){
        return <Typography> 목표 달성!</Typography>
    } else {
        return <Typography> NAN </Typography>
    }
}

export default StatusCard;