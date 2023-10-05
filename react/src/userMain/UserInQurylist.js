import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "../enMain/EnMain.css";
// import "./User.css";
import Search from '../userMain/Search'
import Loading from '../loding/Loding';
import Pagination from "react-js-pagination";
import PageNation from "../pagenation/PageNation";
import SearchIcon from "../engineerLeader/SearchIcon";
function UserInQurylist({ checkPermission }) {
    const [loading, setLoading] = useState(true);

    const [first, setFirst] = useState([]);
    const [pageInfo, setPageInfo] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;



    const list = async () => {//현재 목록 불러오기


            const response = await axios.get(`http://13.209.147.231:8888/api/main/csUserList?currentPage=${currentPage}&postsPerPage=${postsPerPage}&cs_writer=${checkPermission.sub}`)
            setPageInfo(response.data);
            setFirst(response.data);
            setLoading(false);
        
    }

    useEffect(() => {
        list()

       
    }, []);



    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // 페이지 변경 시 현재 페이지 업데이트
    };
    function formatDateTime(timestamp) {
        const date = new Date(timestamp);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷팅
        const day = String(date.getDate()).padStart(2, '0'); // 일을 2자리로 포맷팅
        const hours = String(date.getHours()).padStart(2, '0'); // 시간을 2자리로 포맷팅
        const minutes = String(date.getMinutes()).padStart(2, '0'); // 분을 2자리로 포맷팅

        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
        return formattedDateTime;
    }

    const handleSearch = (e) => {
        const searchWord = document.querySelector(".select-word-engl").value;
        const filter = document.querySelector(".selectee").value;
        console.log(filter)
        const filteredList = first.filter((item) => {
            if (filter === "제목") {
                return item.cs_title.includes(searchWord);
            } else if (filter === "작성자") {
                return item.cs_writer.includes(searchWord);
            } else if (filter === "문의 종류") {
                return item.cs_type.includes(searchWord);
            } else if (searchWord === "") {
                return item
            } else if (filter === "전체") {
                return item.cs_title.includes(searchWord) || item.cs_type.includes(searchWord) || item.cs_writer.includes(searchWord);
            }
            return true;
        });
        setPageInfo(filteredList);
        setCurrentPage(1);

    }   

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = pageInfo.slice(startIndex, endIndex);
    return (
        <>
            {/* {loading ? <Loading /> : null} */}
            <div className="page-wrapper">
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-7 align-self-center">
                            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
                                문의사항
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body" style={{height:"600px"}}>
                                    <div className="table-responsive" style={{height:"450px"}}>
                                    <select style={{ display: 'inline-block', width: '100px',border:"1px solid rgb(149 164 235)" }} className="selectee">
                                            <option value="전체">전체</option>
                                            <option value="제목">제목</option>
                                            <option value="작성자">작성자</option>
                                            <option value="문의 종류">문의 종류</option>
                                            <option value="답변여부">답변여부</option>
                                        </select>
                                        <div className="customize-input right" style={{ marginLeft: '10px', width: '150px', display: "inline-block" }}>

                                            <input
                                                style={{border:"1px solid rgb(149 164 235)"}}
                                                className="form-control custom-shadow custom-radius border-0 bg-white select-word-engl"
                                                type="search"
                                                placeholder="Search"
                                                aria-label="Search"
                                            />
                                        </div>
                                        <div className="customize-input left search-click-engl" style={{ display: "inline-block", marginLeft: '10px', marginRight: '5px' }} onClick={handleSearch}>
                                            <SearchIcon color="#4662ec" />
                                        </div>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">NO</th>
                                                    <th scope="col">제목</th>
                                                    <th scope="col">작성자</th>
                                                    <th scope="col">등록일</th>
                                                    <th scope="col">문의종류</th>
                                                    <th scope="col">답변여부</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {currentPosts.map((item, index) => (
                                                    <tr key={index}>
                                                        <th style={{width:"10%"}} scope="row">{index + 1}</th>
                                                        <td style={{width:"40%"}}><Link to={`/user/inQuryDetail`} state={{ item }} style={{padding:"0"}} >{item.cs_title}</Link></td>
                                                        <td style={{width:""}}>{item.cs_writer}</td>
                                                        <td style={{width:""}}>{formatDateTime(item.cs_regdate)}</td>
                                                        <td style={{width:""}}>{item.cs_type=='project'?"프로젝트 및 서버 문의":"기타 문의"}</td>
                                                        <td style={{width:""}}>{item.cs_answer_yn}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div  className="pagedivengl pagination-cus">
                                        <Pagination
                                            activePage={currentPage}
                                            itemsCountPerPage={postsPerPage}
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

export default UserInQurylist;