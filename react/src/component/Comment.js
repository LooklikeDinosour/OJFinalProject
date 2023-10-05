import axios from 'axios';
import { async } from 'q';
import React, { useEffect, useState } from 'react'

function Comment({style,pk,id}) {
  const [comments, setComments] = useState('');
  const [getCom,setGetCom]=useState([])

  // useEffect(() => {
  //   // 공지사항에 대한 댓글 목록을 불러오는 함수
  //   const fetchComments = async () => {
  //     const response = await axios.get('/api/eng/{noticeId}'); // noticeId에 공지사항 ID를 넣어주세요
  //     setComments(response.data);
  //   };
  //   fetchComments();
  // }, []);
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
  const getComment=async()=>{
    const response = await axios.get('http://13.209.147.231:8888/api/main/getComment?notice_num='+pk)
    setGetCom(response.data)
  }
  const handleCreateComment = async () => {
    // 새 댓글 생성 함수
    if(comments!=''){

        const com={  com_writer: id,  com_content: comments, notice_num: pk}
        const response = await axios.post('http://13.209.147.231:8888/api/main/CreateComments',com)
        setGetCom(response.data)
        setComments('');
    }else{
        alert("댓글을 입력해주세요")
        return
    }
};
//기존 댓글 불러오기
useEffect(()=>{
    
    getComment()
},[])

//삭제
//수정
const deleteCom=(e)=>{
    
    const num=e.target.value
    
    axios.get(`http://13.209.147.231:8888/api/main/commentDel?com_num=${num}&notice_num=${pk}`)
    .then(response=>{
        setGetCom(response.data)
    })
    alert('삭제되었습니다')
}
const updateCom=(e)=>{
    const targetValue = e.target.value;
    const element = document.getElementsByClassName(targetValue)[0];
    const com_num=element.id;
    console.log(com_num)
    // input 태그 생성
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = '';
  
    // 이전 내용을 숨기고 input 태그를 추가
    element.innerHTML = '';
    element.appendChild(inputElement);
  
    // input 태그에 포커스 주기
    inputElement.focus();
  
    // input 태그의 값이 변경될 때의 이벤트 처리
    inputElement.addEventListener('blur', function () {
      // 수정한 내용을 element에 적용
      const value=inputElement.value+"  "+new Date().toLocaleTimeString()+"에 수정됨";
      element.innerHTML = value

    
      axios.get(`http://13.209.147.231:8888/api/main/commentUp?com_content=${value}&notice_num=${pk}&com_num=${com_num}`)
      .then(response=>{
        setGetCom(response.data)
        })  
    alert("수정완료 했습니다")
    });
}
const ct=getCom.map((item,index)=>(

    
                            <div className="reply" key={index}>
                              <div className="row">
                                <div style={{width:'70%'}}>
                                  <span className="replyId" >작성자 : {item.com_writer} </span>
                                    <span  style={{marginLeft:'20px'}}>작성시간:{formatDateTime(item.com_regdate)}</span>
                                    
                                    </div>
                                  {id==item.com_writer?<div style={{width:'30%', textAlign:'right'}}>
                                  <button  style={{width:'50px',color:style.backgroundColor}} className="replySet" onClick={updateCom} value={index}>수정</button>
                                  <button  style={{width:'50px'}} className="replyDelete" onClick={deleteCom}value={item.com_num} >삭제</button>
                                  </div>:null}
                              </div>
                              <p style={{textAlign:"left",color:style.backgroundColor,marginTop:'10px'}}>내용:</p> 
                              <div className={index} style={{marginTop:"10px",height:'80px'}} id={item.com_num}>
                               {item.com_content}
                              </div>
                            </div>
                       
                           

))


  return (
   <>
   <div className="card-body border-top replyComment"> {getCom&&ct}</div>
                            <div className="card-body border-top inq-q">
                            <div className="row inq-answer">
                                <div className="comment" >
                                    <div className="input-field mt-0 mb-0 inq-answer-input">
                                        <input id="textarea1" placeholder="댓글"
                                            className="form-control border-0" type="text" name="com_content" value={comments}
                                            onChange={(e) => setComments(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="commentBtn">
                                    <div className="btn-list">
                                        <button type="button"
                                           className="btn waves-effect waves-light - inq-answer-btn" onClick={handleCreateComment} style={{backgroundColor:style.backgroundColor}}>등록
                                        </button>
            
                                    </div>
                                </div>
                            </div>
                        </div>
   </>
  )
}

export default Comment