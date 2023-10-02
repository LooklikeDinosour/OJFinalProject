import { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";



function AdProDetailInsModal(props) {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [adServerInsList, setAdServerInsList] = useState([]);

  // 날짜를 원하는 형식으로 변환하는 함수
function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit'};
  const formattedDate = new Date(dateString).toLocaleDateString('ko-KR', options);

  // 맨 뒤의 "." 제거
  return formattedDate.replace(/\.$/, '');
}
  
  console.log("여기있니?" + props.server_id);

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
      axios.get(`http://43.201.243.223:8888/api/main/admin/AdProDetailInsModal/${props.server_id}`)
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

  console.log(props);

  return(
   <> 
    <button onClick={openModal} style={{backgroundColor: 'rgb(255 118 118)', fontSize: '10px', padding: '5px', color: '#fff'}}>작업내역</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
    
    <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center" style={{display: "flex"}}>
            <h3 style={{color: '#dd7070', justifyContent: "left", flex: 1}}>
              작업 내역
            </h3>
            <div className="detail_modal_button" style={{justifyContent: "right"}}>
              <input
                type="button"
                value="x"
                className="detail_modal_button_close"
                style={{backgroundColor: 'rgb(214 87 87)', width: '30px', height: '20px', lineHeight: '20px'}}
                onClick={() => setModalIsOpen(false)}
              />
           </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
        <div className="col-6">

        <div className="card">
        
        <div className="card-body pro-body" style={{border: '1px solid #ffc4c4'}}>

        <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">서버이름</th>
                    <th scope="col">작업일자</th>
                    <th scope="col">작업분류</th>
                    <th scope="col">작업시간</th>
                    <th scope="col">CPU사용량</th>
                    <th scope="col">RAM사용량</th>
                    <th scope="col">HDD사용량</th>
                    <th scope="col">현재상태</th>
                    <th scope="col">배정 엔지니어</th>
                  </tr>

                </thead>
                <tbody style={{marginTop: "50px"}}>

                  {adServerInsList.map((server,index) => (

                    <tr key={server.server_id}>
                    <th scope="row">{index+1}</th>
                    <td>{server.server_name}</td>
                    <td>{server.work_date!==null ? formatDate(server.work_date) : null}</td>
                    <td>{server.work_division}</td>
                    <td>{server.work_time}</td>
                    <td>{server.work_cpu}</td>
                    <td>{server.work_ram}</td>
                    <td>{server.work_hdd}</td>
                    <td>{server.work_status}</td>
                    <td>{server.eng_name}</td>
                    </tr>

                    ) 
                  )}
                  
                </tbody>
              </table>
            </div>

            </div>
          </div>
        </div>
        </div>
      </div> 

    </Modal>   
  </>

  );

}

export default AdProDetailInsModal;