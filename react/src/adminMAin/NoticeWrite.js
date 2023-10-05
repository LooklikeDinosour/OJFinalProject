import { useState } from 'react'
import './Admin.css'
import { Form, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

function NoticeWrite({checkPermission}){

    const [form,setForm]=useState({
        notice_title:'',
        notice_content:'',
        notice_comment:'O',
        notice_target:'ALL',
        notice_writer:checkPermission.sub
    })
    const noticeChange=(e)=>{

        const copy={...form,[e.target.name]:e.target.value}
        setForm(copy)

    }
    const [fileUp,setFileUp]=useState({})
    const fileUpload=(e)=>{
        const file=e.target.files[0];

        setFileUp(file)
    }

    const history = useNavigate ();
    const submit=async()=>{
        if(form.notice_title!=''&form.notice_content!=""){

       
        if(fileUp.name!=undefined){
            const fileName=fileUp.name;
            const validExtensions = ['txt', 'pdf'];
            const fileExtension = fileName.split('.').pop().toLowerCase();
            if (validExtensions.includes(fileExtension)) {

                const AdminId=checkPermission.sub;
                let formData=new FormData();
                formData.append("file_data",fileUp);
                formData.append("userId",AdminId);

                await axios.post('http://13.209.147.231:8888/api/main/admin/noticeWrite', form)
                const response = await axios.post('http://13.209.147.231:8888/api/main/cloudUpload', formData)
                if(response.data==='성공'){
                    alert('작성 완료 했습니다.')
                    history("/admin/annoList")
                }else{
                    alert('잘못된 접근 입니다.')
                }
                
            }else{
                alert('txt, pdf 파일만 업로드 가능합니다.');
            }

        }else{
           const response= await axios.post('http://13.209.147.231:8888/api/main/admin/noticeWrite', form)
           if(response.data==='성공'){
            alert('작성 완료 했습니다.')
            history("/admin/annoList")
        }else{
            alert('잘못된 접근 입니다.')
        }
        }
    }else{
        alert('제목과 내용을 입력해주세요')
    }

    }

    return(

    <>
        <div className="page-wrapper" >

            <div className="page-breadcrumb">
              <div className="row">
                    <div className="col-12">
                        <div className="card">
                            
                                        <h4 className="" style={{padding:"40px 0 0 30px",fontWeight:'bold' ,color:'rgb(78, 89, 104)'}}> 
                                        <Link style={{margin:"0 15px 0 0"}} to="/admin/annoList" className="inq-back" >
                                        ← 공지 목록
                                    </Link>공지사항</h4>
                            <div className="card-body card-bsy">
                           
                                       
                                            <div className="form-body">
                                                <div className="row">
                                                    <div className="col-md-2sy">
                                                        <div className="form-group mb-3">
                                                          <div style={{textAlign: 'center'}}>제목</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4sy">
                                                        <div className="form-group mb-3">
                                                            <input type="text" onChange={noticeChange} name="notice_title" value={form.notice_title} className="form-control" placeholder="제목을 입력하세요" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                  <div className="col-md-2sy">
                                                      <div className="form-group mb-3">
                                                        <div style={{textAlign: 'center'}}>작성자명</div>
                                                      </div>
                                                  </div>
                                                  <div className="col-md-4sy">
                                                      <div className="form-group mb-3">
                                                          <input type="text" className="form-control" placeholder={checkPermission.sub} readOnly/>
                                                      </div>
                                                  </div>
                                              </div>
                                              
                                           
                                              <div className="row">
                                              <div className="col-md-2sy"></div>
                                              <div className="col-md-4sy">
                                              <div className="row" style={{width:"119%"}}>
                                                <div  className="row"style={{width:"50%"}}>
                                                <div className="col-md-2sy" style={{width:"50%"}}>
                                                    <div className="form-group mb-3">
                                                      <div style={{textAlign: 'center'}}>공지대상</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4sy" style={{width:"50%"}}>
                                                   <div className="form-group mb-3">
                                                      <select onChange={noticeChange} style={{width:"100%"}} name="notice_target" value={form.notice_target} className="custom-select custom-select-set form-control bg-white border-0 custom-shadow custom-radius">           
                                                      <option value="ALL">전체</option>
                                                      <option value="ROLE_ENGINEER">엔지니어</option>
                                                      <option value="ROLE_USER">유저</option>
                                                      </select>  
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="row" style={{width:"50%"}}>
                                                <div className="col-md-2sy" style={{width:"50%"}}>
                                                    <div className="form-group mb-3"/* style={{ padding:"0"}} */>
                                                      <div style={{textAlign: 'center'}} >댓글여부</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4sy"style={{width:"48%"}}>
                                                   <div className="form-group mb-3"  >
                                                      <select onChange={noticeChange} name="notice_comment" style={{width:"100%"}}value={form.notice_comment}className="custom-select custom-select-set form-control bg-white border-0 custom-shadow custom-radius">           
                                                      <option value="O">O</option>
                                                      <option value="X">X</option>
                                                      </select>  
                                                    </div>
                                                </div>
                                                </div>
                                              </div>

                                              </div>
                                              </div>
                                              <div className="row">
                                                <div className="col-md-2sy">
                                                    <div className="form-group mb-3">
                                                      <div style={{textAlign: 'center'}}>공지내용</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4sy">
                                                    <div className="form-group mb-3">
                                                        <textarea className="form-control"  onChange={noticeChange} name="notice_content" value={form.notice_content} placeholder="공지내용"  style={{height:'300px'}}></textarea>
                                                    </div>
                                                </div>
                                              </div>

                                              <div className="row">
                                                <div className="col-md-2sy">
                                                    <div className="form-group mb-3">
                                                      <div style={{textAlign: 'center'}}>첨부파일

                                                      </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4sy">
                                                    <div className="form-group mb-3">
                                                       <input type='file' onChange={fileUpload}/>
                                                    </div>
                                                </div>
                                              </div>
                                           
                                                <div className="row" style={{width:'40%',margin:'0 auto'}}>
                                                    <button style={{background:"rgb(198, 73, 42)"}} type="submit"className="btn-writer"  onClick={submit} >작성하기</button>
                                                </div>
                                             
                                             
                                              

  
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

export default NoticeWrite