import React, { useEffect, useState } from "react";
import Modal from "react-modal";
// import "../enMain/EnMain.css";
import "../userMain/User.css";
import axios from "axios";
import { Link } from "react-router-dom";
import AdProDetailModal from "./AdProDetailModal";

function AdUserMyPageModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [AdUserMyPage, setAdUserMyPage] = useState([]);
  const [file, setFile] = useState(null); // State to store the selected file


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
      if (modalIsOpen) {
          getpro()

        }
        
    }, [modalIsOpen]);
    const getpro=async()=>{
  
      const cus_id={"cus_id":props.cus_id}
      console.log(1)
      const response=await axios.post('http://43.201.243.223:8888/api/main/client/getPro', cus_id) // v프
      console.log(response.data)

      setAdUserMyPage(response.data)
  
    }

  const openModal = () => {
    setModalIsOpen(true);
  }
  const closeModal = () => {
    setModalIsOpen(false);
  }
  //   axios.get("/api/main/client/AdUserMyPage")
  //     .then(response => setAdUserMyPage(response.data))
  //     .catch(error => console.log(error));
  // }, []);

  // const fileUpload = (file) => {
  //   const url = 'http://localhost:8888/api/client/imgupload';
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   const config = {
  //     headers: {
  //       'content-type': 'multipart/form-data'
  //     }
  //   }
  //   return axios.post(url, formData, config);
  // }

  // const handleUpload = (e) => {
  //   e.preventDefault();
  //   if (File) {
  //     fileUpload(file).then((response) => {
  //       console.log(response.data);
  //     });
  //   }
  // }

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   setFile(selectedFile); // Update the file state
  // };

  /* export async function getMyPage() {
    const response = await fetch(
      "http://ec2-3-35-91-109.ap-northeast-2.compute.amazonaws.com:8888/api/client/UserMyPage",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: token,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("마이페이지 정보를 불러오는데 실패했습니다");
    }
    const body = await response.json();
    return body;
  } */

  return (
    <>
      <button onClick={openModal}>{props.cusCompantName}</button>
      <Modal
        /* className="modal-content"
        overlayClassName="modal-overlay" */
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="detail_modal_container">
          <h2>상세정보</h2>
          <div className="detail_modal_container_inner">
            <table className="detail_modal_table" style={{ margin: 'auto' }}>
              {/* <tr>
                <th>
                  <div className="me-3">
                    <img
                      src="../img/widget-table-pic1.jpg"
                      alt="user"
                      className="rounded-circle"
                      width="150"
                      height="150"
                    />
                  </div>
                   <form onSubmit={handleUpload}>
                    <h1>File Upload</h1>
                    <input type="file" onChange={handleFileChange} name="file" />
                    <button type="submit">Upload</button>
                  </form> 
                </th>
                <td>
                  <input type="text" value="백스이" readOnly />
                </td>
              </tr> */}
              <tr>
                <th>회사명</th>
                <td>
                  <input type="text" value={props.cusCompantName} readOnly />
                </td>
              </tr>
              <tr>
                <th>대표명</th>
                <td>
                  <input type="text" value={props.cusBoss} readOnly />
                </td>
              </tr>
              <tr>
                <th>사업자등록번호</th>
                <td>
                  <input type="text" value={props.cusBusinessId} readOnly />
                </td>
              </tr>
              <tr>
                <th>회사 연락처</th>
                <td>
                  <input type="text" value={props.cusCompany_ph} readOnly />
                </td>
              </tr>
              <tr>
                <th>회사 주소</th>
                <td>
                  <input type="text" value={props.cusAdd1 + props.cusAdd2} readOnly />
                </td>
              </tr>
              <tr>
                <th>담당자 이름</th>
                <td>
                  <input type="text" value={props.cusManagetName} readOnly />
                </td>
              </tr>
              <tr>
                <th>담당자 이메일</th>
                <td>
                  <input type="text" value={props.cusEmail} readOnly />
                </td>
              </tr>
              <tr>
                <th>담당자 연락처</th>
                <td>
                  <input type="text" value={props.cusPhoneNumber} readOnly />
                </td>
              </tr>
              {AdUserMyPage.map((item,index)=>(
                      <tr key={index}>
                      <th>프로젝트 정보</th>
                      <td>
                      <AdProDetailModal 
                               pro_id={item.pro_id}
                               pro_name={item.pro_name}
                               />
                      </td>
                    </tr>
              ))}
            </table>

            <div className="detail_modal_button">

              <input
                type="button"
                value="목록"
                className="detail_modal_button_close"
                style={{background:"rgb(198, 73, 42)"}}
                onClick={() => setModalIsOpen(false)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AdUserMyPageModal;
