import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 50,
  },
  mainGrid: {
    marginTop: theme.spacing(3),
    // backgroundColor: 'grey'
  },
}));

const StatusCard = ({ status }) => {
  const classes = useStyles();
  let statusObj = {};

  if (status === 0) {
    statusObj.comment = "물 한 잔으로 하루를 시작해보세요!";
    statusObj.background = "linear-gradient (45deg, white 5%, #CDE8F5 90%";
  } else if (0 < status && status < 25) {
    statusObj.comment = "두 번째 우려낸 녹차가 더 맛있죠!!";
    statusObj.background = "#ADDEF5";
  } else if (25 <= status && status < 50) {
    statusObj.comment = "벌컥벌컥 어느덧 절반!";
    statusObj.background = "#7ECBF0";
  } else if (50 <= status && status < 75) {
    statusObj.comment = "잘 하고 있군요!피부도 좋아할 거예요!";
    statusObj.background = "#51B7E8";
  } else if (75 <= status && status < 100) {
    statusObj.comment = "거의 다 왔네요! 한컵만 더?";
    statusObj.background = "#2BAAE7";
  } else if (100 <= status) {
    statusObj.comment = "짝짝짝 오늘의 목표 달성!";
    statusObj.background = "#069DE6";
  } else {
    statusObj.comment = "이게 난이예요 난";
    statusObj.background = "ivory";
  }
  return (
    <Card style={{ background: statusObj.background }}>
      <CardMedia
        image="../images/sample.png"
        title="Contemplative Reptile"
        className={classes.media}
      ></CardMedia>
      <CardContent>
        <Typography variant="h2" align="center">{status} %</Typography>
        <Typography variant="h5" align="center">{statusObj.comment}</Typography>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
