import React from 'react';
import {makeStyles, Grid, Typography, Paper,Button} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import axios from 'axios'
import ImageAvatars from '../components/ImageAvatars';
import history from '../history'
import {Redirect} from 'react-router-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Mypage from './Mypage'
import Home from '../common/Home';
import MemberList from './MemberList';
const useStyles = makeStyles(theme => ({
  root : {
    padding : theme.spacing(3, 3),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

export default function MypageUpdate() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: localStorage.getItem('name'),
    introduce : localStorage.getItem('introduce')
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  //수정버튼 클릭
  const modiInfo = e => {
    e.preventDefault();
    const headers = {
        'Content-Type'  : 'application/json',
        'Authorization' : 'JWT fefege..'
      }
      const data = {
        email        : localStorage.getItem('email'),
        name         : values.name,
        introduce    : values.introduce,
        pwd          : localStorage.getItem('pwd')
    }
    // alert(data.name)
    // alert(data.introduce)
    // alert(data.email)
    axios.post(`http://localhost:9000/member/updateMypage`, JSON.stringify(data),
        {headers : headers})
            .then(res=>{
                alert(`${res.data.result}`);
                localStorage.setItem('name',data.name);
                localStorage.setItem('introduce',data.introduce);
                history.push('/mypage');
                window.location.reload();
            })
            .catch(e=>{
                alert('ERROR');
            }) 

  }
  //탈퇴버튼 클릭
  const deleteInfo = e => {
    e.preventDefault();
    if (window.confirm('정말로 탈퇴하시겠습니까?')) {
        axios.delete(`http://localhost:9000/member/${localStorage.getItem('id')}`)
        .then(res=>{
            alert(`${res.data.result}`);
            //스토리지에서 값 삭제
            localStorage.removeItem('id');
            localStorage.removeItem('email');
            localStorage.removeItem('pwd');
            localStorage.removeItem('name');
            localStorage.removeItem('grade');
            localStorage.removeItem('introduce');
            //메인페이지로 이동
            history.push('/');
            window.location.reload();
        })
        .catch(e=>{
            alert('ERROR');
        })
    }
  }
  //멤버 리스트 클릭
  const memberListPage = () => {
      alert('멤버리스트페이지로 이동')
    
    history.push('/memberList');
    window.location.reload();
  }

  return (
    <Router> 
    <div>
        {localStorage.getItem('email') == null && <Redirect/>}
        {localStorage.getItem('email') == 'null' && <Redirect/>}
        마페수정
        <br/>
      <Grid container justify = "center" alignItems = "center">
      <Paper className = {classes.root}>
      <ImageAvatars/>
      <form className={classes.container} noValidate autoComplete="off">
        {/* <Typography variant = "h6" component = "h3">
        {localStorage.getItem('name')}
        </Typography> */}
        <Grid container justify = "center" alignItems = "center">
            <Typography variant = "h7" component = "h4">
            {localStorage.getItem('email')}
            </Typography>
            </Grid>
        <TextField
        required
        id="outlined-required"
        label="Name"
        value={values.name}
        onChange={handleChange('name')}
        className={classes.textField}
        margin="normal"
        variant="outlined"
        style={{ marginRight: 0  }}
        />
        <TextField
        id="outlined-full-width"
        label="Label"
        style={{ margin: 8 }}
        placeholder="Placeholder"
        value={values.introduce}
        fullWidth
        margin="normal"
        variant="outlined"
        onChange={handleChange('introduce')}
        />
        <Grid container justify = "center" alignItems = "center">
          <Button  variant="outlined" color="primary" onClick={modiInfo} >
            수정
          </Button>
          {localStorage.getItem('grade')=='n' && 
          <Button  variant="outlined" color="primary" onClick={deleteInfo} >
            회원탈퇴
          </Button>}
          {localStorage.getItem('grade')=='y' && 
          <Button  variant="outlined" color="primary" onClick={memberListPage} >
            회원리스트
          </Button>}
          
        </Grid>
        </form>
      </Paper>
      </Grid>
    </div>
    <Route path = "/memberList"  component = {MemberList}/>
    <Route path = "/mypage"  component = {Mypage}/>
    <Route exact path="/" component={Home} />
    </Router>
  );
}