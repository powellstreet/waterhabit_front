import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import {
  Button,
  Typography,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  SwipeableDrawer,
  Menu,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Mail,
  MoveToInbox,
  AccountCircle,
  LocalDrink,
} from "@material-ui/icons";

import axios from "axios";
import dotenv from "dotenv";
import MainBar from "./MainBar";
import LeftDrawer from "./LeftDrawer";
dotenv.config();

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 36,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

const drawerWidth = 240;

const UserConsole = ({ history }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  let { nickname, intake, goal, day, userId, updated } = useSelector(
    (state) => ({
      nickname: state.nickname,
      intake: state.intake,
      goal: state.goal,
      day: state.day,
      userId: state.userId,
      toggleDrawer: state.toggleDrawer,
    })
  );

  const [addIntake, setAddIntake] = useState(0);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [stampType, setStampType] = useState("stamp");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  const handleStampType = (e) => {
    setStampType(e.target.checked);
  };

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const anchor = "left";

  // 해당 Drawer 메뉴 부분 기능별로 버튼 만들어서 세팅해놔야 함
  // const list = (anchor) => (
  //   <div
  //     className={clsx(classes.list, {
  //       [classes.fullList]: anchor === "top" || anchor === "bottom",
  //     })}
  //     role="presentation"
  //     onClick={toggleDrawer(anchor, false)}
  //     onKeyDown={toggleDrawer(anchor, false)}
  //   >
  //     <List>
  //       {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
  //         <ListItem button key={text}>
  //           <ListItemIcon>
  //             {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
  //           </ListItemIcon>
  //           <ListItemText primary={text} />
  //         </ListItem>
  //       ))}
  //     </List>
  //   </div>
  // );

  const ratio = Math.floor((intake / goal) * 100);

  const updateTotalIntake = () => {
    let updatedTotal = Number(intake) + Number(addIntake);
    if (updatedTotal >= goal) {
      console.log("목표를 달성했습니다");
      updateStamp();
    }

    axios
      .post(
        `http://localhost:${process.env.REACT_APP_PORT}/records/updateIntake`,
        { intake: updatedTotal, day, userId }
      )
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "intake", intake: updatedTotal });
      });
  };


  const updateStamp = () => {
    axios
      .post(
        `http://localhost:${process.env.REACT_APP_PORT}/records/updateStamp`,
        { userId, day }
      )
      .then((res) => console.log(res.data));
  };

  useEffect(() => {
    axios
      .post(
        `http://localhost:${process.env.REACT_APP_PORT}/records/checkIntake`,
        { userId, day }
      )
      // .then((res) => console.log(res.data))
      .then((res) =>
        // userConsole 할때만 잠깐 수정!
        // dispatch({ type: "intake", intake: res.data.instance.intake })
        dispatch({ type: "intake", intake: 0 })
      );
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MainBar history={history}/>

      <div className={classes.paper}>
        <Typography
          component="h1"
          variant="h3"
          color="textPrimary"
          align="center"
        >
          {nickname}님 안녕하세요! 목표까지 {100 - day}일 남았습니다!
        </Typography>

        <div style={{ flex: 2, backgroundColor: "green", width:'80%', flexDirection: 'column' }}>
          <div>
            물 추가하기
            <input
              name="addWater"
              type="text"
              placeholder="물한잔"
              onChange={(e) => setAddIntake(e.target.value)}
            ></input>
            <Button
              name="addWaterBtn"
              color="primary"
              variant="outlined"
              onClick={updateTotalIntake}
            >
              추가
            </Button>
          </div>
          <div>오늘의 목표 : {goal} ml</div>
          <div>현재까지 마신 물 : {intake} ml</div>
          <div>오늘의 목표 달성률 : {ratio} %</div>
        </div>

        <div style={{ flex: 1, backgroundColor: "yellow", width: '20%', flexDirection: 'column' }}>
          <div>
            <Button
              name="drawerButton"
              color="primary"
              variant="outlined"
              // onClick={toggleDrawer('left', true)}
            >
              Menu
            </Button>
          </div>
          <div
            style={{
              backgroundColor: "skyblue",
              width: `${ratio}%`,
              height: 100,
            }}
          ></div>
        </div>

        <Typography paragraph>
          This being human is a guest house. Every morning a new arrival. A joy,
          a depression, a meanness, some momentary awareness comes as an
          unexpected visitor. Welcome and entertain them all! Even if they’re a
          crowd of sorrows, who violently sweep your house empty of its
          furniture, still, treat each guest honorably. He may be clearing you
          out for some new delight. The dark thought, the shame, the malice,
          meet them at the door laughing, and invite them in. Be grateful for
          whoever comes, because each has been sent as a guide from beyond.
        </Typography>

        {/* <SwipeableDrawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          onOpen={toggleDrawer(anchor, true)}
        >
          {list(anchor)}
        </SwipeableDrawer> */}
      </div>
      <LeftDrawer />

    </div>
  );
};

export default UserConsole;
