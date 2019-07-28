import React from 'react'
import {Card, Button,Col,Container,Row} from 'react-bootstrap';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import history from '../history'
class BoardList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          arr : [],
          boardNum : ''
        }
        this.key = 0;
      }
      componentDidMount() {
        const {arr} = this.state;
      //엑시오스 호출
      axios.get(`http://localhost:9000/board/boardList`)
    .then(res=>{
        console.log(res.data)
        let listMap = []
        let cards = []
        for (let i = 0; i < res.data.length; i++){
          cards.push(i+1)
          // cards.map()
          listMap.push({id:res.data[i].id, title:res.data[i].title, content:res.data[i].content, email:res.data[i].email, regdate:res.data[i].regDate});
            
          }
       
        console.log(listMap)
        this.setState({
            arr : listMap
         })
        
        
        
    })
    .catch(e=>{
        alert('ERROR');
    })
    console.log('렌더링이 완료되었습니다!');
    console.log(arr)  
    }
    render(){
        const {arr,boardNum} = this.state;
        console.log(arr)
        console.log(boardNum)
        //새글쓰기
        const boardNewPage = e => {
            e.preventDefault();
            history.push('/boardNew');
            window.location.reload();
          }
          //글 상세보기
        const boardDetailPage = e => {
            e.preventDefault();
            console.log(e.target.value)
            this.setState({
                boardNum : e.target.value
            })
            console.log(boardNum)
            
            // history.push(`/boardDetail/${e.target.value}`);
            history.push({
                pathname : `/boardDetail`,
                state : e.target.value
            })
            window.location.reload();
        }
        return(
            <div>
            <Button variant="outline-danger" onClick = {boardNewPage}>
                새글작성
            </Button>
            <Container>
            <Row>
            {arr.map((value,idx)=>
            <Col sm>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="/static/images/avatar/jk.jpg" />
                    
                    <Card.Body>
                        <Card.Title>{value.title}</Card.Title>
                        <Card.Subtitle>{value.email}</Card.Subtitle>
                        <Card.Text>
                        {value.regdate}
                        </Card.Text>
                        <Button variant="primary" onClick={boardDetailPage} value={value.id}>전체보기</Button>
                    </Card.Body>
                </Card>
            </Col>
                )}
            </Row>
            </Container>
            </div>
        );
    }
}
export default BoardList