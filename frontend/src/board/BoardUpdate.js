import React from 'react'
import {Card, Button} from 'react-bootstrap'
import axios from 'axios'
import history from '../history'
import {makeStyles, Grid, Typography, Paper, Box, TextField,Row,Container,Col } from '@material-ui/core';
class BoardUpdate extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.location.state.id,
            title : this.props.location.state.title,
            content : this.props.location.state.content,
            email : this.props.location.state.email,
            file: '',
            imagePreviewUrl: '',
            //로케이셔네 담아서 받아오기
            storeFileUrl : ''
        }
    }
    
    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        // alert('클릭');
        console.log('handle uploading-', this.state.file);
        var frm = new FormData();
        frm.append("photo", this.state.file);
        console.log(frm)
        //경로에 파일저장
        axios.post('http://localhost:9000/board/uploadProfileImg', frm,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        })
        .then(res => {
        var strArray = res.data.result.split()
        //state에 받아온 경로저장
        alert(res.data.result)
        this.setState({
            ...this.state, storeFileUrl: res.data.result
        })
        
        alert(`이미지 저장 성공`);
        })
        .catch(e => {
        
        alert('ERROR');
        })

        console.log(this.state.storeFileUrl)
      }
    
      _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
              ...this.state,
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
      }
    
    render(){
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
          $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        const {id, title, content, email,storeFileUrl} = this.state
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
                content : content,
                fileUrl : storeFileUrl
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
                {/* 보드업데이트 */}
               {/* {id}
               {title}
               {content}
               {email} */}
               <br/>
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
               {/* 이미지 */}
               표지이미지
               <div className="previewComponent">
                    <form onSubmit={(e)=>this._handleSubmit(e)}>
                    <input className="fileInput" 
                        type="file" 
                        onChange={(e)=>this._handleImageChange(e)} />
                    <button className="submitButton" 
                        type="submit" 
                        onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
                    </form>
                    <div className="imgPreview">
                        {$imagePreview}
                    </div>
                </div>
                {/* 이미지 */}
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