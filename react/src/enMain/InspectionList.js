import { Link } from "react-router-dom";
import "../enMain/EnCss.css";
import "../enMain/InspectionList.css";
import FormControlIcon from "../img/FormControlIcon";
import { useEffect, useState } from "react";
import axios from "axios";
import EnServerDetailModal from "./EnServerDetailModal";
import Pagination from "react-js-pagination"
import Loading from '../loding/Loding';
import SearchIcon from "../engineerLeader/SearchIcon";

// 날짜를 원하는 형식으로 변환하는 함수
function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = new Date(dateString).toLocaleDateString('ko-KR', options);

  // 맨 뒤의 "." 제거
  return formattedDate.replace(/\.$/, '');
}

function InspectionList({ checkPermission }) {
  const eng_enid = checkPermission.sub;
  const [first, setFirst] = useState([]);
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 정보 저장
  const itemsPerPage = 10; // 페이지당 아이템 수
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://13.209.147.231:8888/api/main/engineer/inspectionList/${eng_enid}`)
      .then((res) => {
        setList(res.data.inspectionList);
        setFirst(res.data.inspectionList);
        setLoading(false);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const selectee1 = (e) => {
    console.log(e.target.value)
    if (e.target.value === "점검시작") {
      const filteredList = first.filter((item) =>
        item.work_status === '점검시작'
      )
      console.log(filteredList)
      setList(filteredList);
      setCurrentPage(1);
    } else if (e.target.value === "점검예정") {
      const filteredList = first.filter((item) =>
        item.work_status === '점검예정'
      )
      console.log(filteredList)
      setList(filteredList);
      setCurrentPage(1);
    } else if (e.target.value === "점검완료") {
      const filteredList = first.filter((item) =>
        item.work_status === '점검완료'
      )

      setList(filteredList);
      setCurrentPage(1);
    } else {
      setList(first);
      setCurrentPage(1);
    }

  }

  const handlePageChange = (page) => { // 페이지 핸들링
    setCurrentPage(page);
  };

  const handleSearch = (e) => { // search 버튼을 눌렀을 때의 이벤트
    const searchWord = document.querySelector(".select-word-engl").value; // 검색 단어
    const filter = document.querySelector(".selectee").value; // 회사명 프로젝트명(옵션값)

    // 중복을 제거할 필드를 배열에 저장
    const uniqueFields = ['server_name', 'work_division', 'pro_name', 'work_date', 'server_status', 'work_status'];

    // 중복 값을 제거한 데이터를 저장할 객체
    const uniqueData = {};

    // 데이터를 순회하면서 중복을 제거한 데이터 구성
    first.forEach((workInfo) => {
      const key = uniqueFields.map((field) => workInfo[field]).join('|');
      uniqueData[key] = workInfo;
    });

    // 중복을 제거한 데이터 객체를 배열로 변환
    const uniqueList = Object.values(uniqueData);

    // 데이터를 복사하여 필터링
    const filteredList = uniqueList.filter((item) => { // 검색 시작
      if (filter === "서버") {
        return item.server_name.includes(searchWord);
      } else if (filter === "점검종류") {
        return item.work_division.includes(searchWord);
      } else if (filter === "프로젝트명") {
        return item.pro_name.includes(searchWord);
      } else if (filter === "서버상태") { // 이 부분을 수정
        return item.server_status.includes(searchWord); // 서버 상태 검색
      } else if (filter === "현재상태") {
        return item.work_status.includes(searchWord);
      } else if (filter === "전체" && searchWord === "") {
        return item;
      } else if (filter === "전체") {
        return (
          item.server_name.includes(searchWord)
          || item.work_division.includes(searchWord)
          || item.pro_name.includes(searchWord)
          || item.server_status.includes(searchWord) // 서버 상태 검색
          || item.work_status.includes(searchWord)
        );
      }
      return true;
    });

    // 필터링된 데이터를 업데이트
    setList(filteredList);
    setCurrentPage(1); // 페이지를 첫 번째 페이지로 리셋
  }; // 검색 끝


  const indexOfLastItem = currentPage * itemsPerPage; // 마지막 페이지 계산
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  var currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="page-wrapper" >
        <div className="container-fluid">
          <div className="row">
            <div className="col-7 align-self-center">
              <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">
                점검목록
              </h3>
            </div>
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="searchBox">
                    <select onChange={selectee1} style={{ height: "30px", color: "#9cbba6", position: "absolute", top: '10px', left: "100px", border: "1px solid #9cbba6", borderRadius:"3px", color:"#c5c0c0", fontSize: "13px"  }} >

                      <option value="전체보기">작업상태</option>
                      <option value="점검예정">점검예정</option>
                      <option value="점검시작">점검시작</option>
                      <option value="점검완료">점검완료</option>

                    </select>

                    <form className="search-engineer search-englg" style={{ position: 'absolute', top: '0px', right: '100px', margin: '0 5px' }}>
                      <div className="customize-input right select-proengl" >
                        <select style={{ display: 'inline-block' }} className="selectee">
                          <option className="selecteeop">전체</option>
                          <option className="selecteeop">서버</option>
                          <option className="selecteeop">점검종류</option>
                          <option className="selecteeop">프로젝트명</option>
                          <option className="selecteeop">서버상태</option>
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
                  </div>
                  <div className="table-responsive">
                    <table className="insListTable" style={{ margin: '0 auto', width: '100%' }}>
                      <thead>
                        <tr style={{ textAlign: "center", borderBottom: "2px solid #cdcdcd", borderTop: "2px solid #cdcdcd" }}>
                          <th scope="col">번호</th>
                          <th scope="col">서버</th>
                          <th scope="col" style={{paddingLeft:'20px'}}>점검종류</th>
                          <th scope="col">프로젝트명</th>
                          <th scope="col">점검일자</th>
                          <th scope="col">서버상태</th>
                          <th scope="col">작업상태</th>
                        </tr>
                      </thead>
                      <tbody className="insListTableTBody">
                        {/* 중복을 제거한 데이터를 사용하여 출력 */}
                        {currentItems.map((workInfo, index) => (
                          <tr key={index}>
                            <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                            <td>
                              <EnServerDetailModal
                                proName={workInfo.pro_name}
                                serverName={workInfo.server_name}
                                engName={workInfo.eng_name}
                                serverId={workInfo.server_id}
                                workDate={formatDate(workInfo.work_date)}
                              />
                            </td>
                            <td style={{paddingLeft:'20px'}}>{workInfo.work_division}</td>
                            <td>{workInfo.pro_name}</td>
                            <td>{formatDate(workInfo.work_date)}</td>
                            <td>
                              <button
                                type="button"
                                className={`btn waves-effect waves-light btn-rounded ${workInfo.server_status === 'GOOD' ? 'btn-success' : 'btn-warning'
                                  }`}
                                style={{ width: '100px' }}
                              >
                                {workInfo.server_status}
                              </button>
                            </td>
                            <td>{workInfo.work_status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

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
  )
}

export default InspectionList;