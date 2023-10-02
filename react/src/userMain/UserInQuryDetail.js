import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Comment from '../component/Comment';
// import '../enMain/EnMain.css'
// import './User.css'
function UserInQuryDetail({ checkPermission }) {
    const location = useLocation();
    const [DetailData, setDetailData] = useState(location.state.item)
    const [update, setUpdte] = useState(false);
    const [answer, setAnswer] = useState(DetailData.cs_answer_yn)
    const [form, setForm] = useState({ //수정 사항
        cs_title: DetailData.cs_title,
        cs_content: DetailData.cs_content,
        cs_num: DetailData.cs_num,
        cs_target: DetailData.cs_target,
        cs_type: DetailData.cs_type
    })
    const [fileUp, setFileUp] = useState({})
    const [file, setFile] = useState({})
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

    const down = async () => {

        const link = document.createElement('a')
        link.href = file.file_path
        link.download = file.file_name
        link.click()
    }
    const getFile = async () => {
        const file_num = DetailData.cs_num

        const response = await axios.get(`http://43.201.243.223:8888/api/main/getPoto?cus_id=${file_num}`)
        if (response.data === '파일 없음') {
            return;
        } else {
            setFile(response.data)
            return;
        }
    }

    useState(() => {
        getFile()
    }, [])
    const updateAnno = () => {
        setUpdte(true);
    }
    const history = useNavigate()
    const updateGoodAnno = async () => {



        if (fileUp.name != undefined) {
            const fileName = fileUp.name;
            const validExtensions = ['txt', 'pdf'];
            const fileExtension = fileName.split('.').pop().toLowerCase();
            if (validExtensions.includes(fileExtension)) {

                const AdminId = checkPermission.sub;
                let formData = new FormData();
                formData.append("file_data", fileUp);
                formData.append("userId", AdminId);

                await axios.post('http://43.201.243.223:8888/api/main/admin/noticeUpdate', form)
                const response = await axios.post('http://43.201.243.223:8888/api/main/cloudUpload', formData)
                if (response.data === '성공') {
                    alert('수정 완료 했습니다.')
                    history("/admin/annoList")
                } else {
                    alert('잘못된 접근 입니다.')
                }

            } else {
                alert('txt, pdf 파일만 업로드 가능합니다.');
            }

        } else {
            const response = await axios.post('http://43.201.243.223:8888/api/main/admin/noticeUpdate', form)
            if (response.data === '성공') {

                alert('수정 완료 했습니다.')
                history("/admin/annoList")
            } else {
                alert('잘못된 접근 입니다.')
            }
        }

    }


    const noticeChange = (e) => {
        const copy = { ...form, [e.target.name]: e.target.value }
        setForm(copy)
    }
    const fileUpload = (e) => {
        const file = e.target.files[0];

        setFileUp(file)
    }
    const deleteAnno = () => {
        console.log(file.file_num)
        const deleteA = { notice_num: DetailData.cs_num, file_name: file.file_name, file_id: file.file_id }
        axios.post("http://43.201.243.223:8888/api/main/inQuryDel", deleteA)
        alert("삭제 되었습니다.")
        history("/user/inQuryList")
    }


    //답변 업데이트
    const answerValue = () => {
        axios.get("http://43.201.243.223:8888/api/main/csUpdate?cs_answer_yn=" + answer + "&cs_num=" + DetailData.cs_num)
            .then(response => {
                alert(response.data)
            })
    }


    return (
        <>
            <div className="page-wrapper" >

                <div class="page-breadcrumb">
                    <div class="row">
                        {/* <div class="col-7 align-self-center">
                        <h3 class="page-title text-truncate text-dark font-weight-medium mb-1">엔지니어</h3>
                        <div class="d-flex align-items-center">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb m-0 p-0">
                                    <li class="breadcrumb-item"><a href="index.html">문의사항</a>
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div> */}

                    </div>
                </div>
                <div class="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body" style={{ padding: '30px 70px 0 100px', height: '100%', width: "100%" }} >
                                    <div className='row'>
                                        <Link to="/user/inQuryList" className="inq-back" style={{ width: "50%" }}>
                                            ← 문의 목록
                                        </Link>
                                       {checkPermission.sub==DetailData.cs_writer? 
                                       <div style={{ width: "50%", textAlign: 'right', paddingLeft: "30px", display: "inline", paddingRight: "50px" }}>
                                            <button className="boardD" style={{ display: "inline", fontSize: "20px", marginBottom: "15px", marginLeft: "30px" }} onClick={deleteAnno}>글 삭제</button>
                                        </div>:null} 
                                    </div>
                                    <h1 className="css-148cvwt edhjjyh1 inq-title">
                                    
                                        {DetailData.cs_title}
                                        
                                    <h3 style={{position:'absolute', top:"70px",right:"100px"}}>{DetailData.cs_type}</h3>
                                    </h1>
                                    <div className="list-flex">
                                        <div style={{ width: "17%" }}>
                                            <span className='inq-writer'>작성자</span>
                                            <span className='inq-writer2'>{DetailData.cs_writer}</span>
                                        </div>
                                        <div style={{ width: "20%" }}>
                                            <span className='inq-writer'>등록일자</span>
                                            <span className='inq-writer2'>{formatDateTime(DetailData.cs_regdate)}</span>
                                        </div>
                                      
                                        {checkPermission.role == 'ROLE_ADMIN' || checkPermission.role == 'ROLE_ENGINEER' ?
                                            <div style={{ width: "50%", textAlign: "right", marginRight: "50px" }}>
                                                <button style={{ fontSize: "20px", marginRight: '10px' }} className='answerValue' onClick={answerValue}>답변 여부 등록하기</button>
                                                <select style={{ fontSize: "20px" }} onChange={(e) => setAnswer(e.target.value)}>
                                                    <option value="Y">O</option>
                                                    <option value="N">X</option>
                                                </select>
                                            </div> : null}
                                    </div>

                                    <article className="inq-content" style={{ height: '300px' }}>

                                        <p style={{ textAlign: "left" }}>{update ? <textarea name="notice_content" onChange={noticeChange} style={{ width: "100%", height: "200px" }} value={form.cs_content} placeholder={DetailData.cs_content == '' ? "내용 없음" : DetailData.cs_content} /> : DetailData.cs_content}
                                        </p>
                                    </article>


                                    <div style={{ width: "100%", textAlign: 'left' ,marginBottom:"40px"}}>
                                        <p style={{ display: "inline", fontSize: "20px", marginBottom: "15px" }}>첨부 파일 : </p>

                                        {file.file_name != null ? <button onClick={down} className="fileDown" style={{ color: 'black' }}>{file.file_name}</button> :

                                            update ? <input type="file" onChange={fileUpload} style={{ display: "inline" }} /> : <button>파일이 없습니다</button>

                                        }
                                    </div>

                                    <Comment style={{ backgroundColor: "#8971ea" }} pk={DetailData.cs_num} id={checkPermission.sub} />
                                </div>

                            </div>







                        </div>

                    </div>


                </div>

            </div>










        </>
    )
}

export default UserInQuryDetail