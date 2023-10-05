import { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function UserInsRequestCheckModal(props) {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [adServerInsList, setAdServerInsList] = useState([]);

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
      axios.get(`http://13.209.147.231:8888/api/main/user/UserInsRequestCheckModal/${props.server_id}/${props.cus_id}`)
      .then(response => {
        console.log("값?",response.data);
        setAdServerInsList(response.data);
        
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



  return(
   <> 
    <button onClick={openModal} style={{backgroundColor: 'rgb(118 180 255)', fontSize: '10px', padding: '5px', color: '#fff', marginLeft: '10px'}}>요청내역</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
    
    <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center" style={{display: "flex"}}>
            <h3 style={{color: 'rgb(127 104 235)', textAlign: 'center', flex: 1, marginBottom: '30px'}}>
              점검 요청 내역
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

        <div className="card">
        
        <div className="card-body pro-body" style={{border: '1px solid #ffc4c4'}}>

        <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">서버이름</th>
                    <th scope="col">점검요청유형</th>
                    <th scope="col">점검요청시간</th>
                    <th scope="col">점검요청내용</th>
                  </tr>

                </thead>
                <tbody style={{marginTop: "50px"}}>

                  {adServerInsList.map((insRe,index) => (

                    <tr key={insRe.server_id}>
                    <th scope="row">{index+1}</th>
                    <td>{insRe.server_name}</td>
                    <td>{insRe.insRequest_type}</td>
                    <td>{insRe.insRequest_regdate}</td>
                    <td>{insRe.insRequest_content}</td>
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

export default UserInsRequestCheckModal;