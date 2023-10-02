import { Link } from "react-router-dom";
import "../enMain/EnMain.css";
import "../userMain/User.css";
import "../enMain/EnCss.css";

import FormControlIcon from "../img/FormControlIcon";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import SearchIcon from "../engineerLeader/SearchIcon";

function EnL_newProject({ checkPermission }) {
  const eng_enid = checkPermission.sub;
  const [first, setFirst] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 정보 저장
  const itemsPerPage = 10; // 페이지당 아이템 수


  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    axios
      .get(`http://43.201.243.223:8888/api/main/engineer/newList/${eng_enid}`)
      .then((response) => {
        setData(response.data);
        setFirst(response.data);
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handlePageChange = (page) => { // 페이지 핸들링
    setCurrentPage(page);
  };

  const handleSearch = (e) => { //search 버튼을 눌렀을때의 이벤트

    const searchWord = document.querySelector(".select-word-engl").value; //검색 단어

    const filter = document.querySelector(".selectee").value; // 회사명 프로젝트명(옵션값)
////////////////////////////////////////////////
    // 데이터를 복사하여 필터링
    const filteredList = first.filter((item) => { //검색시작
      if (filter === "프로젝트명") {
        return item.pro_name.includes(searchWord);
      } else if (filter === "회사명") {
        return item.cus_company_name.includes(searchWord);
      } else if (filter === "계약상태") {
        return item.pro_status.includes(searchWord);
      } else if (filter === "전체" && searchWord === "") {
        return item;
      } else if (filter === "전체") {
        return (
          item.pro_name.includes(searchWord) || item.cus_company_name.includes(searchWord) || item.pro_status.includes(searchWord)
        );
      }
      return true;
  });

  // 필터링된 데이터를 업데이트
  setData(filteredList);
  setCurrentPage(1); // 페이지를 첫 번째 페이지로 리셋
}; // 검색끝

  const indexOfLastItem = currentPage * itemsPerPage; //마지막 페이지 계산
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; 
  var currentItems = data.slice(indexOfFirstItem, indexOfLastItem);





  return (
    <>
      <div className="page-wrapper">
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-7 align-self-center">
              <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">
                엔지니어(프로젝트 리스트)
              </h3>
            </div>
            <div className="col-5 align-self-center"></div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card1">
                {/* <div className="customize-input float-end search-btn">
                  <Link className="nav-link" href="javascript:void(0)">
                    <form className="search-engineer">
                      <div className="customize-input right">
                        <input
                          className="form-control custom-shadow custom-radius border-0 bg-white"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                        />
                      </div>
                      <div className="customize-input left">
                        <FormControlIcon />
                      </div>
                      <div></div>
                    </form>
                  </Link>
                </div> */}
                <div className="card-body1">
                <form className="search-engineer search-englg" style={{position:'absolute', top:'0px', right: '100px', margin: '0 5px', marginBottom:'20px' }}>
                  <div className="customize-input right select-proengl">

                    <select style={{ display: 'inline-block' }} className="selectee">
                      <option className="selecteeop">전체</option>
                      <option className="selecteeop">프로젝트명</option>
                      <option className="selecteeop">회사명</option>
                      <option className="selecteeop">계약상태</option>
                    </select>
                  </div>

                  <div className="customize-input right" style={{ marginLeft: '10px' }}>

                    <input
                      className="form-control custom-shadow custom-radius border-0 bg-white select-word-engl"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                  </div>
                  <div className="customize-input left search-click-eng" style={{ marginLeft: '10px', marginRight: '5px' }} onClick={handleSearch}> 
                    <SearchIcon color="#9cbba6" />
                  </div>
                </form>


                  <div className="table-responsive">
                    <div className="project-table">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">NO</th>
                            <th scope="col">프로젝트명</th>
                            <th scope="col">회사명</th>
                            <th scope="col">담당자</th>
                            <th scope="col">연락처</th>
                            <th scope="col">계약일자</th>
                            <th scope="col">계약 상태</th>
                          </tr>
                        </thead>

                        <tbody>
                          {currentItems.map((project, index) => (
                            <tr key={project.pro_id}>
                              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                              <td>
                                <Link
                                  to={{
                                    pathname: `/engineer/newProjectDetail/${project.pro_id}`,
                                  }}
                                  state={{ project }}
                                >
                                  {project.pro_name}
                                </Link>{" "}
                                {project.new ? (
                                  <span className="new_b">new</span>
                                ) : null}
                              </td>
                              <td>{project.cus_company_name}</td>
                              <td>{project.cus_managet_name}</td>
                              <td>{project.cus_phone_number}</td>
                              <td>{project.pro_startDate}</td>
                              <td>
                                <button className="btn btn-success">
                                  {project.pro_status}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="pagedivengl pagination-engl">
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={data.length}
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

export default EnL_newProject;