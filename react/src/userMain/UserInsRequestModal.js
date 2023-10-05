import { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function UserInsRequestModal(props) {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [adServerInsList, setAdServerInsList] = useState([]);

  const navigate = useNavigate();

  const customStyles = {
    content: {
      top: "55%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "100%", // Adjust the width as needed
      maxHeight: "85%", // Adjust the height as needed
      overflow: "auto", // Enable scrolling if content overflows
      borderRadius: "15px",
      backgroundColor: "#f9f9fd",
    },
  };


  useEffect(() => {
    if(props.server_id!==null){
      axios.get(`http://13.209.147.231:8888/api/main/user/UserInsRequestModal/${props.server_id}`)
      .then(response => {
        setAdServerInsList(response.data);
        console.log(response.data);
        
      })
      .catch((error)=>{
        console.log(error)
      })

    }
  },[modalIsOpen]);    
    
  const openModal = () => {
    setModalIsOpen(true);
  }
  const closeModal = () => {
    setModalIsOpen(false);
  }

  const handleChange = (e) => {
    setAdServerInsList({
      ...adServerInsList,
      [e.target.name]: e.target.value,
    });

  };

  const handleInsRequest = async (e) => {

    e.preventDefault(); // 폼 제출 이벤트의 기본 동작을 막습니다 (페이지 새로고침 방지)

    //폼 데이터를 서버에 전송하기 위해 필요한 데이터를 변수에 저장합니다.
    const insReVO = {
      cus_id: props.cus_id,
      server_id: props.server_id,
      insRequest_type: adServerInsList.insRequest_type,
      insRequest_content: adServerInsList.insRequest_content,
    };

    try {
      // Axios를 사용하여 서버에 POST 요청을 보냅니다.
      const response = await axios.post("http://13.209.147.231:8888/api/main/insRequestForm", insReVO);

      // 서버에서 반환한 응답을 확인합니다.
      if (response.status === 200) {
        
        // 요청이 성공한 경우

        alert("요청 되었습니다");

        setModalIsOpen(false);

      } else {
        // 요청이 실패한 경우
        alert("요청되지 않았습니다. 다시 확인해주시기 바랍니다");
        return;
      }
    } catch (error) {
      // 오류 처리
      console.error("서버 요청 오류:", error);
    }

  }


  return(
   <> 
    <button onClick={openModal} style={{backgroundColor: 'rgb(255 155 169)', fontSize: '10px', padding: '5px', color: '#fff'}}>점검요청</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
    
    <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center" style={{display: "flex"}}>
            <h3 style={{color: 'rgb(127 104 235)', textAlign: 'center', flex: 1, marginBottom: '30px'}}>
              점검 요청
            </h3>
            <div className="detail_modal_button" style={{justifyContent: "right"}}>
              <input
                type="button"
                value="x"
                className="detail_modal_button_close"
                style={{backgroundColor: 'rgb(133 121 253)', width: '30px', height: '20px', lineHeight: '20px'}}
                onClick={() => setModalIsOpen(false)}
              />
           </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
        <div className="col-6">
        <form onSubmit={handleInsRequest}>
        <div className="card">
        
        <div className="card-body pro-body" style={{border: '1px solid #c4ceff'}}>

        <div className="form-body">
          <div className="row">
            <div className="col-md-2sy">
                <div className="form-group mb-3">
                  <div style={{textAlign: 'center;'}}>작성자명</div>
                </div>
            </div>
            <div className="col-md-4sy">
                <div className="form-group mb-3">
                    <input type="text" className="form-control" name="cus_id" value={props.cus_id} readOnly/>
                </div>
            </div>
          </div>
       
          <div  className="row">
            <div className="col-md-2sy">
                <div className="form-group mb-3">
                  <div style={{textAlign: 'center;'}}>점검분류</div>
                </div>
            </div>
            <div className="col-md-4sy">
                <div className="form-group mb-3">
                  <select name="insRequest_type" onChange={handleChange} class="custom-select custom-select-set form-control bg-white border-0 custom-shadow custom-radius">           
                  <option value="">분류선택</option>
                  <option value="장애대응">장애대응</option>
                  <option value="긴급출동">긴급출동</option>
                  <option value="보안관리">보안관리</option>
                  <option value="기타점검">기타점검</option>
                  </select>  
                </div>
          </div>

        </div>
        </div>
        <div className="row">
          <div className="col-md-2sy">
              <div className="form-group mb-3">
                <div style={{textAlign: 'center;'}}>점검요청내용</div>
              </div>
          </div>
          <div className="col-md-4sy">
              <div className="form-group mb-3">
                  <textarea className="form-control"  name="insRequest_content" placeholder="상세내용" onChange={handleChange} style={{height:'300px'}}></textarea>
              </div>
          </div>
        </div>
      
          <div className="row" style={{width:'40%',margin:'0 auto'}}>
              <button style={{background:"rgb(133, 121, 253)", padding: "20px"}} type="submit" className="btn-writer">점검요청</button>
          </div>

            </div>
          </div>
          </form>
        </div>
        </div>
      </div> 

    </Modal>   
  </>

  );

}

export default UserInsRequestModal;