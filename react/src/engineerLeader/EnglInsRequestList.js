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
import EnglTeamassign2 from "./EnglTeamassign2";


function EnglInsRequestList(props) {

  const [loading, setLoading] = useState(true);

  const [first,setFirst] = useState([]);

  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 페이지당 아이템 수
  
  
  useEffect(() => {
    if (props.userId !== null) {
    axios.get('http://13.209.147.231:8888/api/main/engleader/insRequestList',{
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
      if (filter === "회사명") {
        return item.cus_company_name.includes(searchWord);
      } else if (filter === "프로젝트명") {
        return item.pro_name.includes(searchWord);
      } else if (filter === "서버명") {
        return item.server_name.includes(searchWord);
      } else if (filter === "요청분류") {
        return item.insRequest_type.includes(searchWord);
      } else if (filter === "요청내용") {
        return item.insRequest_content.includes(searchWord);
      } else if (filter === "요청일") {
        return item.insRequest_regdate.includes(searchWord);
      } else if (filter === "담당엔지니어") {
        return item.eng_name.includes(searchWord);
      } else if (filter === "전체" && searchWord === "") {
        return item;
      } else if (filter === "전체") {
        return (
          item.cus_company_name.includes(searchWord) ||
          item.pro_name.includes(searchWord) ||
          item.server_name.includes(searchWord) ||
          item.insRequest_type.includes(searchWord) ||
          item.insRequest_content.includes(searchWord) ||
          item.insRequest_regdate.includes(searchWord) ||
          item.eng_name.includes(searchWord)
        );
      }
      //return true; // 다른 옵션 선택시 모든 항목을 포함
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
                        <option className="selecteeop">회사명</option>
                        <option className="selecteeop">프로젝트명</option>
                        <option className="selecteeop">서버명</option>
                        <option className="selecteeop">요청분류</option>
                        <option className="selecteeop">요청내용</option>
                        <option className="selecteeop">요청일</option>
                        <option className="selecteeop">담당엔지니어</option>
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
                          <tr style={{textAlign: 'center'}}>
                            <th scope="col" style={{ width: "13px" }}>
                              NO
                            </th>
                            <th scope="col">회사명</th>
                            <th scope="col">프로젝트명</th>
                            <th scope="col">서버명</th>
                            <th scope="col">요청분류</th>
                            <th scope="col">요청내용</th>
                            <th scope="col">요청일</th>
                            <th scope="col">담당 엔지니어</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((list, key) => (
                            <tr key={key} style={{textAlign: 'center'}}>
                              <th scope="row" className="col1st">
                                {(currentPage - 1) * itemsPerPage + key + 1}
                              </th>
                              <td style={{overflow: 'hidden', textAlign: 'center'}}>{list.cus_company_name}</td>
                              <td style={{overflow: 'hidden', textAlign: 'center'}}>{list.pro_name}</td>
                              <td style={{overflow: 'hidden', textAlign: 'center'}}> {list.server_name}</td>
                              <td style={{textAlign: 'center'}}>{list.insRequest_type}</td>
                              <td style={{textAlign: 'center'}}>{list.insRequest_content}</td>
                              <td style={{textAlign: 'center'}}>{list.insRequest_regdate}</td>
                              <td style={{textAlign: 'center'}}>{list.eng_name}</td>
                              <td>
                                <EnglTeamassign2
                                  insRequest_num={list.insRequest_num}
                                  insRequest_type={list.insRequest_type}
                                  leader_id={props.userId}
                                  pro_pi={list.pro_pi}
                                  pro_id={list.pro_id}
                                  server_id={list.server_id}
                                  check={false}
                                />
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
export default EnglInsRequestList;
