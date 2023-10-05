import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import SearchIcon from "../engineerLeader/SearchIcon";
import { Background } from "../loding/Styles";

function UserProList({state,userId}) {

  const[proList, setProList] = useState([]);
  //현재 시간 불러오기
  const [currentDate, setCurrentDate] = useState(new Date());
  
  //페이지 리스트
 // const [list, setList] = useState([]); // 
  const [first,setFirst] = useState([]); //처음으로 불러온 response값 저장

  //검색
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 정보 저장
  const itemsPerPage = 10; // 페이지당 아이템 수

  const handlePageChange = (page) => { // 페이지 핸들링
    setCurrentPage(page);
  };

  //search 버튼을 눌렀을때의 이벤트
  const handleSearch = (e) => { 

    const searchWord = document.querySelector(".select-word-engl").value; //검색 단어
    const filter = document.querySelector(".selectee").value; // 회사명 프로젝트명(옵션값)

    // 데이터를 복사하여 필터링
    const filteredList = first.filter((item) => { //검색시작
      if (filter === "프로젝트명") {
        return item.pro_name.includes(searchWord);
      } else if (filter === "계약상태") {
        return item.pro_status.includes(searchWord);
      } else if (filter === "계약시작일") {
        return item.pro_startdate.includes(searchWord);
      } else if (filter === "정기점검일") {
        return item.pro_pi.includes(searchWord);
      } else if (filter === "전체" && searchWord === "") {
        return item;
      } else if (filter === "전체") {
        return (
          item.pro_name.includes(searchWord) ||
          item.pro_status.includes(searchWord) ||
          item.pro_startdate.includes(searchWord) ||
          item.pro_pi.includes(searchWord) 
        );
      }
      //return true;
    });

    // 필터링된 데이터를 업데이트
    setProList(filteredList); //list
    setCurrentPage(1); // 페이지를 첫 번째 페이지로 리셋
  }; // 검색끝

  const indexOfLastItem = currentPage * itemsPerPage; //마지막 페이지 계산
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; 
  var currentItems = proList.slice(indexOfFirstItem, indexOfLastItem); //list
 
 useEffect(()=>{
    axios.get(`http://13.209.147.231:8888/api/main/user/list/${userId}`).then((response)=>{
      setProList(response.data);
      console.log(response.data);
      console.log('state: ',state);
      setFirst(response.data);

    // 컴포넌트가 마운트되었을 때와 매 초마다 현재 날짜를 업데이트
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // 1초마다 업데이트

    // 컴포넌트가 언마운트될 때 인터벌 정리
    return () => clearInterval(intervalId);
    })

    .catch((error)=>{
      console.log(error);
    });
  },[userId]);


  return (
    <>

             {/* {loading ? <Loading /> : null} */}
      <div className="page-wrapper" >

        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-7 align-self-center">
              <h3>
                프로젝트 목록
              </h3>
            </div>


          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-6">

              <div className="card">

                <div className="card-body">
                <label style={{ display: 'flex', justifyContent: 'right', marginBottom: '50px' }}> 
                  <div className="customize-input right select-proengl" style={{marginRight: '30px'}}>
                    <select style={{ display: 'inline-block', border: '1px solid #c3aee1'}} className="selectee">
                      <option className="selecteeop">전체</option>
                      <option className="selecteeop">프로젝트명</option>
                      <option className="selecteeop">계약상태</option>
                      <option className="selecteeop">계약시작일</option>
                      <option className="selecteeop">정기점검일</option>
                    </select>
                  </div>
                    <input type="search" className="form-control form-control-sm select-word-engl" placeholder="검색하기" aria-controls="zero_config" style={{ width: '150px', marginRight: '10px', border: '1px solid #c3aee1' }} />
                    <div className="search-click-engl" onClick={handleSearch}> 
                      <SearchIcon color="#c3aee1" />
                    </div>
                  </label> 
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">NO</th>
                          <th scope="col">프로젝트이름</th>
                          <th scope="col">계약상태</th>
                          <th scope="col">계약시작</th>
                          <th scope="col">정기점검날짜</th>
                        </tr>

                      </thead>
                      <tbody>
                        {currentItems.map((project,index) => (

                          <tr key={project.pro_id}>
                          <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                          <td class="user-proname"><Link to={{pathname: `/user/prodetail/${project.pro_id}` }}>{project.pro_name}</Link></td>
                          <td>{project.pro_status=='계약승인'&&project.pro_startdate==currentDate.toLocaleString()? project.pro_status : '프로젝트 진행중'}</td>
                          <td>{project.pro_startdate}</td>
                          <td>{project.pro_pi}</td>
                          </tr>

                        ) 
                        )}

                      </tbody>
                    </table>
                  </div>
                  <div style={{ textAlign: 'center'}}>
                     <div className="pagedivengl pagination-user">
                      <Pagination
                          activePage={currentPage}
                          itemsCountPerPage={itemsPerPage}
                          totalItemsCount={proList.length} //list
                          pageRangeDisplayed={5}
                          prevPageText={"prev"}
                          nextPageText={"next"}
                          onChange={handlePageChange}
                        />
                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>



        </div>
      </div>


    </>
  )

}

export default UserProList