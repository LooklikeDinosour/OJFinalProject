import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import SearchIcon from "../engineerLeader/SearchIcon";
import "../enMain/EnMain.css";
import "../userMain/User.css";
import "../enMain/EnCss.css";
import "./Admin.css"

import AdProDetailModal from "./AdProDetailModal";

function AdProjectList() {

  const [proList, setProList] = useState([]);  
  const [first,setFirst] = useState([]); //처음으로 불러온 response값 저장

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
      } else if (filter === "회사명") {
        return item.cus_company_name.includes(searchWord);
      } else if (filter === "담당자") {
        return item.pro_rep.includes(searchWord);
      } else if (filter === "계약시작일") {
        return item.pro_startdate.includes(searchWord);
      } else if (filter === "계약종료일") {
        return item.pro_enddate.includes(searchWord);
      } else if (filter === "정기점검일") {
        return item.pro_pi.includes(searchWord);
      } else if (filter === "계약상태") {
        return item.pro_status.includes(searchWord);
      } else if (filter === "전체" && searchWord === "") {
        return item;
      } else if (filter === "전체") {
        return (
          item.pro_name.includes(searchWord) ||
          item.cus_company_name.includes(searchWord) ||
          item.pro_rep.includes(searchWord) ||
          item.cus_phone_number.includes(searchWord) ||
          item.pro_startdate.includes(searchWord) ||
          item.pro_enddate.includes(searchWord) ||
          item.pro_pi.includes(searchWord) ||
          item.pro_status.includes(searchWord)
        );
      }
      //return true;
    });

    // 필터링된 데이터를 업데이트
    setProList(filteredList);
    setCurrentPage(1); // 페이지를 첫 번째 페이지로 리셋
  }; // 검색끝

  const indexOfLastItem = currentPage * itemsPerPage; //마지막 페이지 계산
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; 
  var currentItems = proList.slice(indexOfFirstItem, indexOfLastItem); //list


  useEffect(()=>{
    axios.get('http://13.209.147.231:8888/api/main/admin/projectList').then((response)=>{
      setProList(response.data);
      console.log(response.data);
      setFirst(response.data);
    })
    .catch((error)=>{
      console.log(error);
    });
  },[]);


  return (
    <>
      <div className="page-wrapper">
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-7 align-self-center">
              <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">
                프로젝트 리스트
              </h3>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card1">
                <div className="card-body1">
                   
                <label style={{ display: 'flex', justifyContent: 'right', marginBottom: '50px' }}> 
                  <div className="customize-input right select-proengl" style={{marginRight: '30px'}}>
                    <select style={{ display: 'inline-block', border: '1px solid rgb(255 186 186)'}} className="selectee">
                      <option className="selecteeop">전체</option>
                      <option className="selecteeop">프로젝트명</option>
                      <option className="selecteeop">회사명</option>
                      <option className="selecteeop">계약시작일</option>
                      <option className="selecteeop">계약종료일</option>
                      <option className="selecteeop">정기점검일</option>
                      <option className="selecteeop">계약상태</option>
                    </select>
                  </div>
                    <input type="search" className="form-control form-control-sm select-word-engl" placeholder="검색하기" aria-controls="zero_config" style={{ width: '150px', marginRight: '10px', border: '1px solid rgb(255 186 186)' }} />
                    <div className="search-click-engl" onClick={handleSearch}> 
                      <SearchIcon color="rgb(255 186 186)" />
                    </div>
                  </label> 

                  <div className="table-responsive">
                    <div className="project-table">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">NO</th>
                            <th scope="col">프로젝트명</th>
                            <th scope="col">회사명</th>
                            <th scope="col">담당자</th>
                            <th scope="col">계약시작일</th>
                            <th scope="col">계약종료일</th>
                            <th scope="col">정기점검일</th>
                            <th scope="col">계약상태</th>
                          </tr>
                        </thead>
                        <tbody>
                              
                        {currentItems.map((project,index) => (

                          <tr key={project.pro_id}>
                            <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                            <td class="user-proname">
                              <AdProDetailModal 
                               pro_id={project.pro_id}
                               pro_name={project.pro_name}
                               />
                            </td>
                            <td>{project.cus_company_name}</td>
                            <td>{project.pro_rep}</td>
                            <td>{project.pro_startdate}</td>
                            <td>{project.pro_enddate}</td>
                            <td>{project.pro_pi}</td>
                            <td>{project.pro_status}</td>
                          </tr>

                          ) 
                         )}

                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center'}}>
                     <div className="pagedivengl pagination-admin">
                      <Pagination
                          activePage={currentPage}
                          itemsCountPerPage={itemsPerPage}
                          totalItemsCount={proList.length}
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
  );
}

export default AdProjectList;
