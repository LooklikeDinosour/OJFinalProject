import { Link } from "react-router-dom";
import "../enMain/EnMain.css";
import "../userMain/User.css";
import "../enMain/EnCss.css";
import SearchIcon from "./SearchIcon";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import Loading from '../loding/Loding';
import './EngLeader.css';

function EnglProjectList(props) {

  const [loading, setLoading] = useState(true);

  const [first,setFirst] = useState([]);

  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 페이지당 아이템 수
  

  
  useEffect(() => {
    if (props.userId !== null) {
    axios.get('http://13.209.147.231:8888/api/main/engleader/getAllPro',{
      params : {userId:props.userId}
    })
      .then(response => {
        const data = response.data;
        setList(data);
        setFirst(data);

        setLoading(false);
      })
    }
  }, [props.userId])


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    const searchWord = document.querySelector(".select-word-engl").value; //검색 단어

    const filter = document.querySelector(".selectee").value; // 회사명 프로젝트명

    // 데이터를 복사하여 필터링
    const filteredList = first.filter((item) => {
      if (filter === "프로젝트명") {
        return item.pro_name.includes(searchWord);
      } else if (filter === "회사명") {
        return item.cus_company_name.includes(searchWord);
      } else if (filter === "전체" && searchWord === "") {
        return item;
      } else if (filter === "전체") {
        console.log("전체고 검색어 있어");
        return (
          item.cus_company_name.includes(searchWord) ||
          item.pro_name.includes(searchWord)
        );
      }
      return true; // 다른 옵션 선택시 모든 항목을 포함
    });

    // 필터링된 데이터를 업데이트
    setList(filteredList);
    setCurrentPage(1); // 페이지를 첫 번째 페이지로 리셋
  };

  // 현재 페이지의 데이터 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  var currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  const customStyle = {
    color:'#4e645a',
  }

  return (
    <>
      
      <div className="page-wrapper prolist-engl">
        <div
          className="container-fluid englpro-all"
          style={{ padding: "10px", marginLeft: "100px", marginTop: "50px" }}
        >
          <div className="row">
            <div className="col-12">
              <div className="card1">
                <div className="customize-input float-end search-btn englpro-btn select-proeng">
                  <div className="customize-input right select-proengl">
                    {/* <select style={{ display: 'inline-block' }}>
                          <option>프로젝트명</option>
                        </select> */}
                  </div>

                  <form className="search-engineer search-englg">
                    <div className="customize-input right select-proengl">
                      <select
                        style={{ display: "inline-block" }}
                        className="selectee"
                      >
                        <option className="selecteeop">전체</option>
                        <option className="selecteeop">프로젝트명</option>
                        <option className="selecteeop">회사명</option>
                      </select>
                    </div>

                    <div
                      className="customize-input right"
                      style={{ marginLeft: "10px" }}
                    >
                      <input
                        className="form-control custom-shadow custom-radius border-0 bg-white select-word-engl"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                    </div>
                    <div
                      className="customize-input left search-click-engl"
                      style={{ marginLeft: "10px", marginRight: "5px" }}
                      onClick={handleSearch}
                    >
                      <SearchIcon color="#9cbba6" />
                    </div>
                    <div></div>
                  </form>
                </div>

                <div className="card-body1 englpro-carbody">
                  <div className="table-responsive">
                    <div className="projectlist-engl-table">
                      <table className="table englprolisttable">
                        <thead>
                          <tr>
                            <th scope="col" style={{ width: "13px" }}>
                              NO
                            </th>
                            <th scope="col" style={{ width: "45px" }}>
                              프로젝트명
                            </th>
                            <th scope="col">회사명</th>
                            <th scope="col">계약시작일</th>
                            <th scope="col">계약종료일</th>
                            <th scope="col">담당자</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((list, key) => (
                            <tr key={key}>
                              <th scope="row" className="col1st">
                                {(currentPage - 1) * itemsPerPage + key + 1}
                              </th>
                              <td>
                                <Link
                                  to={{
                                    pathname: `/engineerleader/projectDetail/${list.pro_id}`,
                                  }}
                                  style={{ padding: "0" }}
                                >
                                  {list.pro_name}
                                </Link>
                              </td>
                              <td>{list.cus_company_name}</td>
                              <td>{list.pro_startdate}</td>
                              <td>{list.pro_enddate}</td>
                              <td>{list.pro_rep}</td>
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
                      totalItemsCount={list.length}
                      pageRangeDisplayed={5}
                      prevPageText={"prev"}
                      nextPageText={"next"}
                      onChange={handlePageChange}
                      style={customStyle}
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
export default EnglProjectList;
