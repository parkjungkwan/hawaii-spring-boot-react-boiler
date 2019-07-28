import React,{Component} from 'react';

class Exchange extends Component{
    constructor(props) {
        super(props);
        this.state = {
          // country   : '',
          // kftc_bkpr : ''
          arr : ['AAA'],
          cons: []
        }
        this.key = 0;
      }
      callApi = () => {
        fetch("/site/program/financial/exchangeJSON?authkey=lh4eJnm6eYZjI0fVzsBHLx5iDB9eWRJr&searchdate=20190718&data=AP01")
          .then(res => res.json())
          .then(res => {

            let countryMap = []
            
            for (let i = 0; i < res.length; i++){
              // 객체형으로 넣으면 안된다.
              //푸시로 넣으면 안됨 수정하기.......
              countryMap.push({code:res[i].cur_unit, desc:res[i].cur_nm});
            }

            console.log("--------------------------------------------------")
            console.log(countryMap)
            console.log("--------------------------------------------------")
         
            this.setState({
              arr: ['BBB'],
              cons:countryMap
            })
            
            console.log(this.state)
            // this.setState({
            //   // country   : json.cur_nm,
            //   // kftc_bkpr : json.kftc_bkpr
            //   arr : {
            //     country : json.cur_nm
            //   }
            // })
          })
      }
      componentDidMount() {
        this.callApi();
      }
    render(){

      const {arr, cons} = this.state;


      console.log("---------------");
      console.log(arr);
      console.log(cons);
      console.log("---------------");


      const testArray = cons;

      let currentState;
      
      testArray.map((value) => currentState = value)
      
      console.log(currentState);
 
        return(
            <div>
                <h3>
                    {/* dddd {arr} */}
                    {/* {arr.length === 0 ? arr : '데이터 불러오는 중'} */}
                </h3>
                               
                <table>
                  <tbody>
                  <tr>
                    <th>화폐명</th>
                    <th>화폐/원</th> 
                  </tr>
                  {cons.map( (value, idx) => <tr><td>{value.code}</td><td>{value.desc}</td></tr> )}

                  </tbody>
                </table> 
            </div>
        );
    }
}

export default Exchange;