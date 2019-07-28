import React from 'react'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {makeStyles, Grid, Typography, Paper,Button,Box} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Router, Route, Link } from 'react-router-dom';
import history from '../history'
import axios from 'axios'
const useStyles = makeStyles(theme => ({
    root : {
        padding : theme.spacing(3, 3),
        height : 500
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
export default function BoardNew(){
    
    const classes = useStyles();
    const [values, setValues] = React.useState({
        title: '',
        content: '',
       
      });
      const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
      };
      const confirmBtn = e => {
        e.preventDefault();
        // alert(values.title);
        // alert(values.content);
        // alert(localStorage.getItem('email'));
        if(values.title===''||values.content===''){
            alert('제목과 내용을 입력해 주세요');
            return false;
        }
        
        const headers = {
            'Content-Type'  : 'application/json',
            'Authorization' : 'JWT fefege..'
          }
          const data = {
            title   : values.title,
            content : values.content,
            email   : localStorage.getItem('email')
        }
        axios.post(`http://localhost:9000/board`, JSON.stringify(data),
        {headers : headers})
            .then(res=>{
                alert(`${res.data.result}`);
                history.push('/boardList');
                window.location.reload();
            })
            .catch(e=>{
                alert('ERROR');
            }) 


      }
        return(
            <div>
                <br/>
            
            <Paper className = {classes.root}>
                <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    fullWidth
                    id="outlined-name"
                    label="제목"
                    className={classes.textField}
                    value={values.title}
                    onChange={handleChange('title')}
                    margin="normal"
                    variant="outlined"
                />
               
                <TextField
                    id="outlined-multiline-static"
                    label="내용"
                    multiline
                    fullWidth
                    rows="10"
                    value={values.content}
                    onChange={handleChange('content')}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <Button variant = "outlined" color = "secondary" className = {classes.button} onClick = {confirmBtn}>
                            글작성
                </Button>
                </form>
                </Paper>
                
                </div>
        );
    
}
