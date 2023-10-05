import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from '../loding/Loding';

function EnglClientDetail() {


  const [loading, setLoading] = useState(true);


  const { cus_id } = useParams();
  const [list, setList] = useState([]);
  const [vo, setVo] = useState([]);


  useEffect(() => {


    axios.get(`http://13.209.147.231:8888/api/main/engleader/getClientInfo/${cus_id}`)
      .then(response => {

        setList(response.data.list);
        setVo(response.data.vo);
        console.log(list);
        console.log(vo);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {/* {loading ? <Loading /> : null} */}
      <div className="page-wrapper clientDetailpage-engl">

        <div><h4 className="cdp-head" style={{color:'#424242'}} >클라이언트정보</h4></div>

        <div className=" cardcusdetail">
          <div style={{}}>
            <table className="cdp-tb">
              <thead>
                <tr>
                  <th scope="col">회사명</th>
                  <th scope="col">대표자</th>
                  <th scope="col">회사번호</th>
                  <th scope="col">우편번호</th>
                  <th scope="col">회사주소</th>
                  <th scope="col">담당자</th>
                  <th scope="col">담당자이메일</th>
                  <th scope="col">담당자번호</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{vo.cus_company_name}</th>
                  <td>{vo.cus_boss}</td>
                  <td>{vo.cus_company_ph}</td>
                  <td>{vo.cus_postal_code}</td>
                  <td>{vo.cus_address1 + " " + vo.cus_address2}</td>
                  <td>{vo.cus_managet_name}</td>
                  <td>{vo.cus_email}</td>
                  <td>{vo.cus_phone_number}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>

        <h4 className="cdp-head2" style={{color:'#424242'}} >해당 클라이언트의 프로젝트 정보</h4>

        </div>
        <div>
          <table className="cdp-tb2">
            <thead>
              <tr>
                <th scope="col">NO</th>
                <th scope="col">프로젝트명</th>
                <th scope="col">시작날짜</th>
                <th scope="col">종료날짜</th>
                <th scope="col">계약상태</th>
                <th scope="col">프로젝트정보</th>
                <th scope="col">정기점검일</th>
              </tr>
            </thead>
          
              
              <tbody>
                {list.map((data,key)=>(
                    <tr key={key}>
                    <th scope="row">{key+1}</th>
                    <td><Link to={{pathname:`/engineerleader/projectDetail/${data.pro_id}`}}>{data.pro_name}</Link></td>
                    <td>{data.pro_startdate}</td>
                    <td>{data.pro_enddate}</td>
                    <td>{data.pro_status}</td>
                    <td>{data.pro_info}</td>
                    <td>{data.pro_pi}일</td>
                  </tr>
                ))}
                
              </tbody>
            </table>


        </div>
      </div>
    </>
  );
}
export default EnglClientDetail;
