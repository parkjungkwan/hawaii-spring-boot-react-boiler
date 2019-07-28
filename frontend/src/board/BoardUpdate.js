import React from 'react'
import {Card, Button} from 'react-bootstrap'
import axios from 'axios'
import history from '../history'
import {makeStyles, Grid, Typography, Paper, Box, TextField} from '@material-ui/core';
class BoardUpdate extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.location.state.id,
            title : this.props.location.state.title,
            content : this.props.location.state.content,
            email : this.props.location.state.email,
        }
    }
    

    
    render(){
        const {id, title, content, email} = this.state
        const updateBtn = e => {
            e.preventDefault();
            // alert('글수정')
            const headers = {
                'Content-Type'  : 'application/json',
                'Authorization' : 'JWT fefege..'
            }
            const data = {
                id : id,
                title : title,
                content : content
            }
            axios.post(`http://localhost:9000/board/updateBoard`, JSON.stringify(data),
            {headers : headers})
            .then(res=>{
                alert(`${res.data.result}`);
                history.push({
                    pathname : `/boardDetail`,
                    state : id
                })
                window.location.reload();
            })
            .catch(e=>{
                alert('ERROR');
            }) 
        }
        const handleChange = name => e => {
            e.preventDefault();
            this.setState({
                ...this.state, [name] : e.target.value
            })
            console.log(title)
            console.log(content)
        }
        
        const classes = makeStyles(theme => ({
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
        return(
            <div>
                보드업데이트
               {/* {id}
               {title}
               {content}
               {email} */}
               
               <Paper className = {classes.root}>
                <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    fullWidth
                    id="outlined-name"
                    label="제목"
                    className={classes.textField}
                    value={title}
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
                    value={content}
                    onChange={handleChange('content')}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <Button  variant="outline-danger" onClick = {updateBtn}>
                            글수정
                </Button>
                </form>
                </Paper>
               
            </div>
        );
    }
}
export default BoardUpdate