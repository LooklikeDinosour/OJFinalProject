import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "../enMain/EnMain.css";
// import "./User.css";
import Search from '../userMain/Search'
import Loading from '../loding/Loding';
import PageNation from "../pagenation/PageNation";
import SearchIcon from "../engineerLeader/SearchIcon";
import Pagination from "react-js-pagination";
import { Row } from "react-bootstrap";
function EnInQurylist({ checkPermission }) {
    const [loading, setLoading] = useState(true);

    const [first, setFirst] = useState([]);
    const [pageInfo, setPageInfo] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;




    const list = async () => {//현재 목록 불러오기

        const response = await axios.get(`http://43.201.243.223:8888/api/main/csEngineerList?currentPage=${currentPage}&postsPerPage=${postsPerPage}&cs_writer=${checkPermission.sub}&role=${checkPermission.role}`)
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
    const selectee1=(e)=>{
        if(e.target.value=="내 글 보기"){
            const filteredList=first.filter((item)=>
                item.cs_writer==checkPermission.sub
            )
            setPageInfo(filteredList);
            setCurrentPage(1);
        }else if(e.target.value=="들어온 요청"){
            const filteredList=first.filter((item)=>
                item.cs_writer!=checkPermission.sub
            )
            setPageInfo(filteredList);
            setCurrentPage(1);
        }else{
            setPageInfo(first);
            setCurrentPage(1);
        }
       
    }
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = pageInfo.slice(startIndex, endIndex);
    // const indexOfLastItem = currentPage * postsPerPage;
    // const indexOfFirstItem = indexOfLastItem - postsPerPage;
    // const currentPosts = pageInfo.slice(indexOfLastItem, indexOfFirstItem);

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
                                <div className="card-body" style={{ height: "630px" }}>
                                    <div className="table-responsive" style={{ height: "480px" }}>
                                        
                                        <select style={{ display: 'inline-block', width: '100px' }} className="selectee">
                                            <option value="전체">전체</option>
                                            <option value="제목">제목</option>
                                            <option value="작성자">작성자</option>
                                            <option value="문의 종류">문의 종류</option>
                                            <option value="답변여부">답변여부</option>
                                        </select>
                                        <div className="customize-input right" style={{ marginLeft: '10px', width: '150px', display: "inline-block" }}>

                                            <input
                                                className="form-control custom-shadow custom-radius border-0 bg-white select-word-engl"
                                                type="search"
                                                placeholder="Search"
                                                aria-label="Search"
                                            />
                                        </div>
                                        <div className="customize-input left search-click-engl" style={{ display: "inline-block", marginLeft: '10px', marginRight: '5px' }} onClick={handleSearch}>
                                            <SearchIcon color="#9cbba6" />
                                        </div>
                                        <select onChange={selectee1} style={{height:"30px",color:"#9cbba6",position:"absolute", top:'30px',right:"100px"}} >

                                        <option value="전체보기">전체보기</option>
                                        <option value="내 글 보기">내 글 보기</option>
                                        <option value="들어온 요청">들어온 요청</option>

                                        </select>
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
                                                        <td style={{width:"40%"}}><Link to={`/engineer/inQuryDetail`} state={{ item }} style={{ padding: "0" }} >{item.cs_title}</Link></td>
                                                        <td style={{width:""}}>{item.cs_writer}</td>
                                                        <td style={{width:""}}>{formatDateTime(item.cs_regdate)}</td>
                                                        <td style={{width:""}}>{item.cs_type}</td>
                                                        <td style={{width:""}}>{item.cs_answer_yn}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="pagedivengl pagination-engl">
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

export default EnInQurylist;