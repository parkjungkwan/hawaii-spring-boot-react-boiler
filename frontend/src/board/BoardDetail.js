import React from 'react'
import {Card, Button} from 'react-bootstrap'
import axios from 'axios'
import history from '../history'
class BoardDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id : '',
            title : '',
            content : '',
            email : '',
            regdate : '',
            storeFileUrl : ''
        }
    }
    componentDidMount() {
      //엑시오스 호출
      axios.get(`http://localhost:9000/board/boardDetail/${this.props.location.state}`)
    .then(res=>{
        console.log(res.data)
       
        this.setState({
            id : res.data.id,
            title : res.data.title,
            content : res.data.content,
            email : res.data.email,
            regDate : res.data.regDate,
            storeFileUrl : res.data.fileUrl,
         }) 
        
    })
    .catch(e=>{
        alert('ERROR');
    })
    console.log('렌더링이 완료되었습니다!');
    }

    
    render(){
        const deleteBoard = e => {
            e.preventDefault();
            if (window.confirm('삭제하시겠습니까?')) {
                axios.delete(`http://localhost:9000/board/${this.props.location.state}`)
                .then(res=>{
                    alert(`${res.data.result}`);
                    
                    //보드 리스트로 이동
                    history.push('/boardList');
                    window.location.reload();
                })
                .catch(e=>{
                    alert('ERROR');
                })
            }
        }
        const updateBoard = e => {
            e.preventDefault();

            history.push({
                pathname : `/boardUpdate`,
                state : this.state
            })
            window.location.reload();
        }
        
        const {id, title, content, email, regDate, name,storeFileUrl} = this.state
        const imageSrc = '/static/images/board/'+storeFileUrl
        return(
            <div>
                {/* 보드디테일 */}
                {/* {this.props.location.state} */}
               {/* {console.log(this.props.location.state)} */}
               <Card className="text-center">
                    <Card.Header>{regDate}</Card.Header>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>
                        {storeFileUrl!=null&&(<img src={imageSrc} />) }
                         <br/> 
                        {content}
                        </Card.Text>
                        <footer className="blockquote-footer">
                            {email}
                        </footer>
                        <br/>
                        {email === localStorage.getItem('email') && 
                        <div> 
                            <Button variant="primary" onClick={updateBoard}>
                                수정
                            </Button> 
                            <Button variant="danger" onClick={deleteBoard}>
                                삭제
                            </Button>
                        </div>}
                    </Card.Body>
                    {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
                </Card>
               
               
            </div>
        );
    }
}
export default BoardDetail