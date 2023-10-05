import { Link } from "react-router-dom";
import "../enMain/EnMain.css";
import "../userMain/User.css";
import "./EnMain.css";
import EnEngineerMyPage from "./EnEngineerMyPageModal";
import FormControlIcon from "../img/FormControlIcon";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "react-js-pagination"
import Loading from '../loding/Loding';
import SearchIcon from "../engineerLeader/SearchIcon";

function EnEngineerList({checkPermission}) {
  const eng_enid = checkPermission.sub;
  const [first, setFirst] = useState([]);
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 정보 저장
  const itemsPerPage = 10; // 페이지당 아이템 수



  useEffect(() => {
    axios.get(`http://13.209.147.231:8888/api/main/engineer/engineerList/${eng_enid}`).then((res) => {
     // const engineerList = res.data.engineerList || [];
      setList(res.data.engineerList) ;
      setFirst(res.data.engineerList);
      
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
      if (filter === "이름") {
        return item.eng_name.includes(searchWord);
      } else if (filter === "직급") {
        return item.eng_rank.includes(searchWord);
      } else if (filter === "전체" && searchWord === "") {
        return item;
      } else if (filter === "전체") {
        return (
          item.eng_name.includes(searchWord) || item.eng_rank.includes(searchWord)
        );
      }
      return true;
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
            {/* {loading ? <Loading /> : null} */}
      <div className="page-wrapper">
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-7 align-self-center">
              <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">
                엔지니어 리스트
              </h3>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card1">
                <div className="card-body1">
                  {/* <label style={{ display: "flex" }}>
                    <input
                      type="search"
                      className="form-control form-control-sm"
                      placeholder="검색"
                      aria-controls="zero_config"
                      style={{ width: "200px" }}
                    />
                    <button style={{ marginLeft: "5px" }}>
                      <FormControlIcon />
                    </button>
                  </label> */}
                  
                    <form className="search-engineer search-englg" style={{position:'absolute', top:'0px', right: '100px', margin: '0 5px', marginBottom:'20px' }}>


                      <div className="customize-input right select-proengl">

                        <select style={{ display: 'inline-block' }} className="selectee">
                          <option className="selecteeop">전체</option>
                          <option className="selecteeop">이름</option>
                          <option className="selecteeop">직급</option>
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



                  <div className="table-responsive" style={{width:'85%', margin:'0 auto'}}>
                    <div className="project-table">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">NO</th>
                            <th scope="col" style={{ paddingLeft: "80px" }}>
                              이름
                            </th>
                            <th scope="col">직급</th>
                            <th scope="col">이메일</th>
                            <th scope="col">전화번호</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((engineer, index) => (
                            <tr key={index}>
                              <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                              <td>
                                <div className="d-flex no-block align-items-center">
                                  <div className="me-3">
                                    <img
                                      src="https://project-buket.s3.amazonaws.com/profile.jpg"
                                      alt="user"
                                      className="rounded-circle"
                                      width="38"
                                      height="38"
                                    />
                                  </div>
                                  <div className="me-4">
                                    <h5 className="text-dark mb-0 font-16 font-weight-medium">
                                      <EnEngineerMyPage
                                        engName={engineer.eng_name}
                                        engRank={engineer.eng_rank}
                                        engEmail={engineer.eng_email}
                                        engPhone={engineer.eng_phone}
                                        team_Id={engineer.team_id}
                                      />
                                    </h5>
                                  </div>
                                </div>
                              </td>
                              <td>{engineer.eng_rank}</td>
                              <td>{engineer.eng_email}</td>
                              <td>{engineer.eng_phone}</td>
                              <td className="border-top-0 px-2 py-4;"></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* <div style={{ textAlign: "center" }}>
                    <ul className="pagination paginationEn">
                      <li className="page-item disabled">
                        <Link className="page-link" href="#" tabindex="-1">
                          Prev
                        </Link>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" href="#">
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" href="#">
                          Next
                        </Link>
                      </li>
                    </ul>
                  </div> */}
                  <div className="pagedivengl pagination-engl">
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

export default EnEngineerList;
