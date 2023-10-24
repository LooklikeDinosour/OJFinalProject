import React, { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import "../enMain/EnMain.css";
import "../enMain/EnCss.css";
import "../userMain/User.css";
import axios from "axios";

function WorkDetailDownLoad(props) {

const {eachData} = props;
console.log(eachData);  
  
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  }

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


  // const [WorkDetailData,setWorkDetailData]=useState('')
  const [file, setFile] = useState([])
 

  
  const getFiles = async () => {

    const work_filenum = eachData.work_filenum;
    console.log(work_filenum);
  
    const response = await axios.get(`http://13.209.147.231:8888/api/main/getFiles?work_filenum=${work_filenum}`)


    if (response.data === '파일 없음') {
      return;
    } else {
      console.log(response.data);
      setFile(response.data)
      console.log(file);
      return;
    }
  }
  useEffect(() => {
    // setWorkDetailData(props.state.list[0].work_num)
    getFiles();
  }, []);



  const down = async (index) => {
    
    const link = document.createElement('a')
    link.href = file[index].file_path
    console.log(file);
    link.download = file[index].file_name
    console.log(file.file_name);
    link.click()
}


  return (
    <>
      <button onClick={openModal}>다운로드</button>
      <Modal
        // overlayClassName="modal-overlay"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="detail_modal_container">
          <h2>파일 다운로드</h2>
          <div className="detail_modal_container_inner">
          <table
              className="workDetailDownLoadList"
              style={{ margin: "0 auto", marginBottom: "20px" }}
            >
              <thead>
                <tr>
                  <th>No.</th>
                  <th>파일이름</th>
                  <th>등록일자</th>
                  <th>다운로드받기</th>
                </tr>
              </thead>
              <thead>
                {file && file.length > 0 ? (
                  file.map((file, index) => (
                      <tr key={file.file_id}>
                        <td>{index + 1}</td>
                        <td>{file.file_name}</td>
                        <td>{file.user_id}</td>
                        <td>
                          {file.file_name != null ? (
                            <button onClick={() => down(index)} className="fileDown" style={{ color: 'black' }}>
                              {file.file_name}
                            </button>
                          ) : (
                            "파일이 없습니다"
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">첨부파일이 없습니다</td>
                    </tr>
                  )}
              </thead>
            </table>

            <div className="detail_modal_button">
              <input
                type="button"
                value="목록보기"
                className="detail_modal_button_close"
                onClick={() => setModalIsOpen(false)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default WorkDetailDownLoad;