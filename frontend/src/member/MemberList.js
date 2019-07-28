import React from 'react'
import axios from 'axios'
import {Table, Button,Form,Col,Row} from 'react-bootstrap';
import {Redirect} from 'react-router-dom'
class MemberList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          arr : [],
          search : ''
        }
        this.key = 0;
      }
      componentDidMount() {
          const {arr} = this.state;
        //엑시오스 호출
        axios.get(`http://localhost:9000/member/memberList`)
        .then(res=>{
            console.log(res.data)

            let listMap = []
            for (let i = 0; i < res.data.length; i++){
                // 객체형으로 넣으면 안된다.
                //푸시로 넣으면 안됨 수정하기.......
                // alert();
                listMap.push({id:res.data[i].id, email:res.data[i].email, grade:res.data[i].grade, regdate:res.data[i].regDate});
              }
              console.log(listMap)
            this.setState({
               arr : listMap
            })
        })
        .catch(e=>{
            alert('ERROR');
        })
        console.log(this.state.arr)
        
      }
      
    render(){
       const {arr,search} = this.state;
      //  console.log(arr);
      //강퇴
       const removeMember = e => {
        e.preventDefault();
        if (window.confirm(`회원을 탈퇴시키겠습니까?`)) {
          // alert(e.target.value)
          axios.delete(`http://localhost:9000/member/${e.target.value}`)
            .then(res=>{
              alert(`${res.data.result}`);
              window.location.reload();
          })
          .catch(e=>{
              alert('ERROR');
          })      
        }
      }

      const handleChange = name => e => {
        e.preventDefault();
        this.setState({
          ...this.state, [name] : e.target.value
        })
        console.log(search)
      }

      const searchBtn = e => {
        e.preventDefault();
        // alert(search)
        const headers = {
          'Content-Type'  : 'application/json',
          'Authorization' : 'JWT fefege..'
        }
        const data = {
          search   : search
        }
      }

        return(
            <div>
                {localStorage.getItem('grade') == 'n' && <Redirect/>}
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>email</th>
                      <th>grade</th>
                      <th>regdate</th>
                      <th>강퇴</th>
                    </tr>
                  </thead>
                  <tbody>
                  {arr.map((value, idx) => 
                    <tr><td>{value.id}</td><td>{value.email}</td>
                    <td>{value.grade}</td><td>{value.regdate}</td>
                    <td>
                      {value.grade === 'n' && <Button variant="danger" onClick={removeMember} value={value.id}>강퇴</Button>}
                    </td>
                    </tr>
                    )}
                  </tbody>
                </Table>
                <br/>
                <Form>
                  <Row className="justify-content-md-center">
                    <Col sm="2">
                      <Form.Control type="text" placeholder="search" value={search} onChange={handleChange('search')}/>
                    </Col>
                    <Col sm="1">
                      <Button onClick={searchBtn}>검색</Button>
                    </Col>
                  </Row>
                </Form>
            </div>
        );
    }
}
export default MemberList