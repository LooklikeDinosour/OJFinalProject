import axios from 'axios';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Comment from '../component/Comment';
// import '../enMain/EnMain.css'
// import './User.css'
function EnAnnoDetail({ checkPermission }) {
    console.log(checkPermission)
    const location = useLocation();
    const [DetailData,setDetailData]=useState(location.state?.item || {})
    const [update, setUpdte] = useState(false);
    const [form, setForm] = useState({
        notice_title: DetailData.notice_title,
        notice_content: DetailData.notice_content,
        notice_num: DetailData.notice_num,
        notice_target:DetailData.notice_target,
        notice_comment:DetailData.notice_comment
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
        const file_num = DetailData.notice_num

        const response = await axios.get(`http://13.209.147.231:8888/api/main/getPoto?cus_id=${file_num}`)
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

                await axios.post('http://13.209.147.231:8888/api/main/admin/noticeUpdate', form)
                const response = await axios.post('http://13.209.147.231:8888/api/main/cloudUpload', formData)
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
            const response = await axios.post('http://13.209.147.231:8888/api/main/admin/noticeUpdate', form)
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
        const deleteA={notice_num:DetailData.notice_num,file_name:file.file_name,file_id:file.file_id}
        axios.post("http://13.209.147.231:8888/api/main/AnnoDel",deleteA)
        alert("삭제 되었습니다.")
        history("/admin/annoList")
    }

    return (
        <>
            <div className="page-wrapper" >

                <div class="page-breadcrumb">

                </div>
                <div class="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body" style={{ padding: '50px 70px 0 100px', height: '100%' }} >
                                    <div className='row'>
                                        <Link to="/engineer/annoList" className="inq-back" style={{ width: "50%" }}>
                                            ← 공지 목록
                                        </Link>
                                       {checkPermission.sub==DetailData.notice_writer?<div style={{ width: "50%", textAlign: 'right', paddingLeft: "30px", display: "inline", paddingRight: "50px" }}>
                                            {update ? <button className="boardD" style={{ display: "inline", fontSize: "20px", marginBottom: "15px" }} onClick={updateGoodAnno}>수정 완료</button>
                                                : <button className="boardD" style={{ display: "inline", fontSize: "20px", marginBottom: "15px" }} onClick={updateAnno}>수정</button>}
                                            <button className="boardD" style={{ display: "inline", fontSize: "20px", marginBottom: "15px", marginLeft: "30px" }} onClick={deleteAnno}>삭제</button>
                                        </div> :null} 
                                    </div>
                                    <h1 className="css-148cvwt edhjjyh1 inq-title">{update ? <input type="text" onChange={noticeChange} name="notice_title" placeholder={DetailData.notice_title} /> : DetailData.notice_title}</h1>
                                    <div className='row'>
                                        <div className="list-flex" style={{ width: "50%" }}>
                                            <div>
                                                <span className='inq-writer'>작성자</span>
                                                <span className='inq-writer2'>{DetailData.notice_writer ? DetailData.notice_writer : 'admin'}</span>
                                            </div>
                                            <div>
                                                <span className='inq-writer'>등록일자</span>
                                                <span className='inq-writer2'>{DetailData.notice_regdate ? formatDateTime(DetailData.notice_regdate) : ""}</span>
                                            </div>
                                            <div>
                                            </div>
                                        </div>
                                        <div style={{ width: "50%", textAlign: "right", paddingRight: "50px" }}>
                                            <span className='inq-writer'>공개 범위</span>
                                            {update ?
                                                <select name="notice_target" onChange={noticeChange} style={{ width: "70px" }} value={form.notice_target}>
                                                    <option value="ALL">전체</option>
                                                    <option value="ROLE_ENGINEER">엔지니어</option>
                                                    <option value="ROLE_USER">유저</option>
                                                </select> :
                                                <span className='inq-writer2'>{DetailData.notice_target}</span>}
                                            <span className='inq-writer'>댓글 가능 여부</span>
                                            {update ? <select name="notice_comment" onChange={noticeChange} style={{ width: "70px" }} value={form.notice_comment}>
                                                <option value="O">O</option>
                                                <option value="X">X</option>
                                            </select>
                                                : <span className='inq-writer2'>{DetailData.notice_comment}</span>}
                                        </div>
                                    </div>
                                    <article className="inq-content" style={{ height: '300px' }}>
                                        <p style={{ textAlign: "left" }}>{update ? <textarea name="notice_content" onChange={noticeChange} style={{ width: "100%", height: "200px" }} value={ form.notice_content} placeholder={DetailData.notice_content == '' ? "내용 없음" :DetailData.notice_content} /> : DetailData.notice_content}
                                        </p>

                                    </article>
                                    <div style={{ width: "100%", textAlign: 'left' ,marginBottom:"40px"}}>
                                        <p style={{ display: "inline", fontSize: "20px", marginBottom: "15px" }}>첨부 파일 : </p>

                                        {file.file_name != null ? <button onClick={down} className="fileDown" style={{ color: 'black' }}>{file.file_name}</button> :

                                            update ? <input type="file" onChange={fileUpload} style={{ display: "inline" }} /> : <button>파일이 없습니다</button>

                                        }
                                    </div>


                                    {DetailData.notice_comment == 'O' ?
                                      <Comment style={{backgroundColor:"rgb(42, 198, 97)"}} pk={DetailData.notice_num} id={checkPermission.sub}/>
                                        : null}

                                 
                                </div>
                            </div>







                        </div>

                    </div>


                </div>

            </div>










        </>
    )
}

export default EnAnnoDetail