import React from 'react';
import {makeStyles, Grid, Typography, Paper,Button} from '@material-ui/core';
import ImageAvatars from '../components/ImageAvatars';
import MypageUpdate from '../member/MypageUpdate';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { routerActions } from 'connected-react-router';
import history from '../history'
import Exchange from '../api/Exchange'
import MyinfoUpdate from '../member/MyinfoUpdate';
const useStyles = makeStyles(theme => ({
  root : {
    padding : theme.spacing(3, 3),
  },
}));

export default function PaperSheet() {
  const classes = useStyles();
  const modiInfo=()=> {
    history.push('/mypageUpdate');
    window.location.reload();
  }

  return (
    <Router>  
      <div>
        <Grid container justify = "center" alignItems = "center">
        <Paper className = {classes.root}>
        <ImageAvatars/>
        <Typography variant = "h7" component = "h4">
          {localStorage.getItem('email')}
          </Typography>
          <Typography variant = "h6" component = "h3">
          {localStorage.getItem('name')}
          </Typography>
          
          <Typography component = "p">
          {(localStorage.getItem('introduce')=='null' ?'':localStorage.getItem('introduce'))}
          </Typography>
          <Grid container justify = "center" alignItems = "center">
            <Button  variant="outlined" color="primary" onClick={modiInfo} >
              회원정보 수정
            </Button>
            {/* <Button  variant="outlined" color="secondary" onClick={modiPw} >
              비밀번호 수정
            </Button> */}
            <MyinfoUpdate/>
          </Grid>
        </Paper>
        </Grid>
      </div>
      <Route path = "/mypageUpdate"  component = {MypageUpdate}/>
      <Route path = "/exchange"  component = {Exchange}/>
    </Router> 
  );
}