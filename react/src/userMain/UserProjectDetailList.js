
import "../enMain/EnMain.css";
import "./User.css";
import UserProjectDetailModal from "./UserProjectDetailModal";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ProjectDetailChart from "./ProjectDetailChart";
import SearchIcon from "../engineerLeader/SearchIcon";
import Pagination from "react-js-pagination";



function UserProjectDetailList({info}) {
  //const [loading, setLoading] = useState(true);
    console.log(info)
  const [ProjectDetailList, setProjectDetailList] = useState([]);
  const [activeRow, setActiveRow] =useState(null);
  const wrapperRef = useRef(null);
  const [selectedServer, setSelectedServer] = useState(null);

console.log("값"+ProjectDetailList)

  const [list, setList] = useState([]);
  const [first,setFirst] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 페이지당 아이템 수



  useEffect(() => {
    axios.get(`http://13.209.147.231:8888/api/main/user/projectDetailList/${info.cus_id}`) 
      .then((response) => {
        console.log("??" + response.data);
        setList(response.data);
        setFirst(response.data);
        setProjectDetailList(response.data);
        
      })
     
      .catch((error )=> {console.log(error)})
      //setLoading(false);
  }, [info.cus_id]);

 /* const toggleDropDown = (e) => {
    console.log(e.currentTarget.nextElementSibling.querySelector('.hide'))
    const nextTarget = e.currentTarget.nextElementSibling.querySelector('.hide');
    if(nextTarget){
      nextTarget.classList.toggle('hide')
    }else{
      return;
    }
  }*/

  useEffect(()=>{
    function handleClickOutside(e){
      if(wrapperRef.current && !wrapperRef.current.contains(e.target)){
        setActiveRow(null);
      }
    }
    document.addEventListener("mousedown",handleClickOutside);
    return () => {
      document.removeEventListener("mousedown",handleClickOutside);
    }
  })

  function toggleDropDown(index) {
    if (activeRow === index) {
      setActiveRow(null);
      setSelectedServer(null); // Deselect the server
    } else {
      setActiveRow(index);
      setSelectedServer(index); // Set the selected server
    }
  }

/*   useEffect(() => {
    const getProjectDetailList = async () => {
      try {s
        const response = await axios.get("/api/client/projectDetailList");
        setProjectDetailList(response.data);
        console.log(response.data)
      } catch (error) {
        console.log("Error", error);
      }
    };
    getProjectDetailList(); // Call the function to fetch data
  }, []); */
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    const searchWord = document.querySelector(".select-word-pro").value; //검색 단어

    const filter = document.querySelector(".selectee").value; // 회사명 프로젝트명
    console.log(first)
    console.log(searchWord +' 오긴 오니 '+ filter)
    // 데이터를 복사하여 필터링
    const filteredList = first.filter((item) => {
      if (filter === "서버이름") {
        return item.server_name.includes(searchWord);
      } else if (filter === "서버종류") {
        return item.work_division.includes(searchWord);
      } else if (filter === "작업상태") {
        return item.work_status.includes(searchWord);
      } else if (filter === "담당엔지니어") {
        return item.eng_name.includes(searchWord);
      }   else if (filter === "전체" && searchWord === "") {
        return item;
      } else if (filter === "전체") {
        console.log("전체고 검색어 있어");
        return (
          item.server_name.includes(searchWord) ||
          item.work_division.includes(searchWord) ||
          item.server_name.includes(searchWord) ||
          item.eng_name.includes(searchWord)
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
  return (
    <>

            {/* {loading ? <Loading /> : null} */}

      <div className="page-wrapper">
        <div className="page-breadcrumb">
          <div className="row">
            {/* <div className="col-7 align-self-center">
              <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">
                프로젝트별 작업 내역
              </h3>
              <div className="d-flex align-items-center">
                <nav aria-label="breadcrumb"></nav>
              </div>
            </div> */}
            <div className="col-5 align-self-center">
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                <div className="col-md-4 ">
                        <div className="form-group mb-3">

                        </div>
                      </div>
            
                      <form className="search-project search-pro">


                    <div className="customize-input right select-pro">

                    <select  style={{ display: 'inline-block', border: '1px solid #8971ea'}} className="selectee">
                        <option className="selecteeop">전체</option>
                        <option className="selecteeop">프로젝트</option>
                        <option className="selecteeop">서버이름</option>
                        <option className="selecteeop">작업상태</option>
                        <option className="selecteeop">담당엔지니어</option>
                      </select>
                    </div>

                    <div className="customize-input right" style={{ marginLeft: '10px' }}>

                      <input
                        className="form-control custom-shadow custom-radius border-0 bg-white select-word-pro"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                    </div>
                    <div className="customize-input left search-click-pro"
                     style={{ marginLeft: '10px', marginRight: '5px' }}
                      onClick={handleSearch}>
                      <SearchIcon color="#8971ea" />
                    </div>
                    <div></div>
                    </form>
                  </div>


                  <div className="table-responsive">
                    <div className="project-table">
                    <div ref={wrapperRef}>

                      <table className="table">

                        <thead>
                          <tr>
                            <th scope="col">NO</th>
                            <th scope="col">프로젝트명</th>
                            <th scope="col">서버명</th>
                            <th scope="col">최근 점검</th>
                            <th scope="col">작업 상태</th>
                            <th scope="col">담당 엔지니어</th>
                          </tr>
                        </thead>

                        <tbody>
                        {currentItems
                            .map((list, index) => (
                            <>
                             <tr key={index} onClick={() => toggleDropDown(index)}>
                           
                              <th scope="row">  {(currentPage - 1) * itemsPerPage + index + 1}</th>
                              <td>
                                {/* <UserProjectDetailModal projectDetailList={list}/> */}
                                {list.pro_name}
                              </td>
                              <td>{list.server_name}</td>
                              <td>{list.work_date}</td>
                              <td>
                                <button type="button" className="button-danger" style={ 
                                                                list.work_status === '완료'
                                                                ? { backgroundColor: '#00c870' }
                                                                :
                                                                 { backgroundColor: '#ff0030' } 
                                                               }>
                                {list.work_status}
                                </button>
                              </td>
                              <td className="border-top-0 px-2 py-4">
                                <div className="d-flex no-block ">
                                  <div className="me-3">
                                    <img
                                      src="../img/widget-table-pic1.jpg"
                                      alt="user"
                                      className="rounded-circle"
                                      width="45"
                                      height="45"
                                    />
                                  </div>
                                  <div>
                                    <h5 className="text-dark mb-0 font-16 font-weight-medium">
                                      {list.eng_name}
                                    </h5>
                         
                                  </div>
                                </div>
                              </td>
                             </tr>
                            {selectedServer === index && (
                                <tr>
                                  <td colSpan="9" className={`trans ${activeRow === index ? '' : 'hide'}`} >
                                  <ProjectDetailChart pro_id={list.pro_id} server_id={list.server_id} />
                                  </td>
                                </tr>
                              )}
                             </>
                          ))}

                        </tbody>
                        </table>
                        </div>

                    </div>
                  </div>

                  <div className="pagedivengl pagination-pro">
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

    </>
  );
}

export default UserProjectDetailList;