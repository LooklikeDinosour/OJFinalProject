import { Link } from "react-router-dom";
import "../enMain/EnMain.css";
import "../userMain/User.css";
import "../enMain/EnCss.css";

import FormControlIcon from "../img/FormControlIcon";
import { color } from "d3-color";
import UserMyPageModal from "../userMain/UserMyPageModal";
import { useEffect, useState } from "react";
import axios from "axios";
import AdUserMyPageModal from "./AdUserMyPageModal";
import Pagination from "react-js-pagination";
import SearchIcon from "../engineerLeader/SearchIcon";

function AdUserList() {

  const [first, setFirst] = useState([]);
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 정보 저장
  const itemsPerPage = 10; // 페이지당 아이템 수

  useEffect(() => {
    axios.get('http://43.201.243.223:8888/api/main/admin/customerList').then((res) => {
      setList(res.data);
      setFirst(res.data);
    })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const handlePageChange = (page) => { // 페이지 핸들링
    setCurrentPage(page);
  };

  const handleSearch = (e) => { //search 버튼을 눌렀을때의 이벤트

    const searchWord = document.querySelector(".select-word-engl").value; //검색 단어

    const filter = document.querySelector(".selectee").value; // 회사명 프로젝트명(옵션값)

    // 데이터를 복사하여 필터링
    const filteredList = first.filter((item) => { //검색시작
      if (filter === "회사명") {
        return item.cus_company_name.includes(searchWord);
      } else if (filter === "담당자") {
        return item.cus_managet_name.includes(searchWord);
      } else if (filter === "전체" && searchWord === "") {
        return item;
      } else if (filter === "전체") {
        return (
          item.cus_company_name.includes(searchWord)||item.cus_managet_name.includes(searchWord)
        );
      }
      // return true;
    });

    // 필터링된 데이터를 업데이트
    setList(filteredList);
    setCurrentPage(1); // 페이지를 첫 번째 페이지로 리셋
  }; // 검색끝

  const indexOfLastItem = currentPage * itemsPerPage; //마지막 페이지 계산
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  var currentItems = list.slice(indexOfFirstItem, indexOfLastItem);



  return (
    <>
      <div className="page-wrapper">
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-7 align-self-center">
              <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">
                회원 리스트
              </h3>
            </div>


          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card1">
                <div className="card-body1">
                  <label>
                    <div className="col-5 align-self-center">
                      <div className="customize-input float-end">
                        <Link className="nav-link" href="javascript:void(0)">
                        <form className="search-engineer search-englg"   style={{position:'absolute', top:'0px', right: '100px', margin: '0 5px'}}>
                        <div className="customize-input right select-proengl">

                          <select style={{ display: 'inline-block', borderColor: '#ed7272'}} className="selectee">
                            <option className="selecteeop">전체</option>
                            <option className="selecteeop">회사명</option>
                            <option className="selecteeop">담당자</option>
                          </select>
                        </div>

                        <div className="customize-input right" style={{ marginLeft: '10px' }}>

                          <input
                            className="form-control custom-shadow custom-radius border-0 bg-white select-word-engl"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            style={{borderColor: '#ed7272'}}
                          />
                        </div>
                        <div className="customize-input left search-click-eng" style={{ marginLeft: '10px', marginRight: '5px' }} onClick={handleSearch}>
                          <SearchIcon color="#ed7272" />
                        </div>
                        </form>
                        </Link>
                      </div>
                    </div>
                  </label>
                  {/* <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '65px', marginBottom: '10px' }}>
                    <select style={{ padding: '3px', borderRadius: '5px', color:'#777'}}>
                      <option>계약신청</option>
                      <option>계약중</option>
                      <option>계약만료</option>
                    </select>
                  </div> */}
                  <div className="table-responsive">
                    <div className="project-table">
                      <table className="adUserTable" style={{width: '1170px'}}>
                        <thead>
                          <tr>
                            <th scope="col">NO</th>
                            <th scope="col">회사명</th>
                            <th scope="col">담당자</th>
                            <th scope="col">연락처</th>
                            <th scope="col">이메일</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((customer, index) => (
                          <tr>
                            <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                            <td>
                              <div className="d-flex no-block">
                                <div className="me-3" style={{ width: '80%' }}>
                                  <AdUserMyPageModal 
                                  cus_id={customer.cus_id}
                                  cusCompantName={customer.cus_company_name}
                                  cusBoss = {customer.cus_boss}
                                  cusBusinessId = {customer.cus_business_id}
                                  cusCompany_ph = {customer.cus_company_ph}
                                  cusAdd1 = {customer.cus_address1}
                                  cusAdd2 = {customer.cus_address2}
                                  cusManagetName = {customer.cus_managet_name}
                                  cusEmail = {customer.cus_email}
                                  cusPhoneNumber = {customer.cus_phone_number}

                                  
                                  />
                                  </div>
                              </div>
                            </td>
                            <td>{customer.cus_managet_name}</td>
                            <td>{customer.cus_phone_number}</td>
                            <td>{customer.cus_email}</td>
                           
                          </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="pagedivengl pagination-admin">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={list.length}
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
    </>
  );
}

export default AdUserList;
