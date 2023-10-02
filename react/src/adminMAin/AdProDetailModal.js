import { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import AdProDetailInsModal from "./AdProDetailInsModal";

function AdProDetailModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [adProInfoList, setAdProInfoList] = useState([]);

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
      axios
        .get(`http://43.201.243.223:8888/api/main/admin/AdProDetailModal/${props.pro_id}`)
        .then((response) => {
          setAdProInfoList(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [modalIsOpen]);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  console.log(props);

  return (
    <>
      <button onClick={openModal}>{props.pro_name}</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-7 align-self-center">
              <h3 style={{ color: "#dd7070" }}>프로젝트 정보</h3>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-6">
              <div className="card">
                <div
                  className="card-body pro-body"
                  style={{ border: "1px solid #ffc4c4" }}
                >
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">프로젝트명</th>
                          <th scope="col">시작일</th>
                          <th scope="col">만료일</th>
                          <th scope="col">정기점검일</th>
                          <th scope="col">프로젝트정보</th>
                          <th scope="col">배정팀</th>
                          <th scope="col">계약상태</th>
                        </tr>
                      </thead>
                      <tbody style={{ marginTop: "50px" }}>
                        <tr>
                          <td>{adProInfoList?.[0]?.pro_name}</td>
                          <td>{adProInfoList?.[0]?.pro_startdate}</td>
                          <td>{adProInfoList?.[0]?.pro_enddate}</td>
                          <td>{adProInfoList?.[0]?.pro_pi}</td>
                          <td>{adProInfoList?.[0]?.pro_info}</td>
                          <td>{adProInfoList?.[0]?.team_id}</td>
                          <td>{adProInfoList?.[0]?.pro_status}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-7 align-self-center">
              <h3 style={{ color: "#dd7070" }}>서버 정보</h3>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-6">
              <div className="card">
                <div
                  className="card-body pro-body"
                  style={{ border: "1px solid #ffc4c4" }}
                >
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">서버이름</th>
                          <th scope="col">IP주소</th>
                          <th scope="col">운영체제</th>
                          <th scope="col">CPU</th>
                          <th scope="col">RAM</th>
                          <th scope="col">디스크 용량</th>
                          <th scope="col">서버 상태</th>
                          <th scope="col">배정 엔지니어</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody style={{ marginTop: "50px" }}>
                        {adProInfoList.map((server, index) => (
                          <tr key={server.pro_id}>
                            <th scope="row">{index + 1}</th>
                            <td class="user-servername">
                              {server.server_name}
                            </td>
                            <td class="user-ipadress">{server.ip_address}</td>
                            <td class="user-oprationsystem">
                              {server.operating_system}
                            </td>
                            <td>{server.cpu}</td>
                            <td>{server.ram}</td>
                            <td>{server.disk_capacitygb}</td>
                            <td>{server.server_status}</td>
                            <td>{server.eng_name}</td>
                            <td>
                              <AdProDetailInsModal
                                server_id={server.server_id}
                              />
                              {/* <button style={{backgroundColor: 'rgb(255 118 118)', fontSize: '10px', padding: '5px', color: '#fff'}}>작업내역</button> */}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="detail_modal_button">
          <input
            type="button"
            value="목록"
            className="detail_modal_button_close"
            style={{ backgroundColor: "rgb(214 87 87)" }}
            onClick={() => setModalIsOpen(false)}
          />
        </div>
      </Modal>
    </>
  );
}

export default AdProDetailModal;
