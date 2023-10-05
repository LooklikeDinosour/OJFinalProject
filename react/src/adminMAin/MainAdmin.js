/* ES6 in Node.js */
import UserIcon from "../img/UserIcon";
import FolderIcon from "../img/FolderIcon";
import FolderPlusIcon from "../img/FolderPlusIcon";
import PenToolIcon from "../img/PenToolIcon";
import PieChartComponent from "../userMain/PieChartComponent";
import LineChart from "../userMain/LineChart";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";

function MainAdmin() {
  const [newPL, setnewPL] = useState([]);
  const [vo , setVO] = useState([]);
  const [contracts , setContracts] = useState([]);
  const [expiration,setExpiration] = useState([]);

  const [periodic, setPeriodic] = useState([0]);
  const [emergency, setEmergency] = useState([0]);
  const [approval, setApproval] = useState([0]);
  const [complete, setComplete] = useState([0]);

  useEffect(() => {
    axios.get("http://13.209.147.231:8888/api/main/admin").then((response) => {
      const data2 = response.data;
      const receivedvo = data2.vo;
      const receivednewPL = data2.newPL;
      const receivedcontracts= data2.contracts;
      const receivedexpiration = data2.expiration;

      const receivedperiodic = data2.periodic;
      const receivedemergency= data2.emergency;
      const receivedapproval = data2.approval;
      const receivedcomplete = data2.complete;



      console.log(response.data);
      setVO(receivedvo);
      setnewPL(receivednewPL);
      setContracts(receivedcontracts);
      setExpiration(receivedexpiration);

      setPeriodic(receivedperiodic);
      setEmergency(receivedemergency);
      setApproval(receivedapproval);
      setComplete(receivedcomplete);
      console.log(receivedperiodic)
    })

    .catch(error => {
      console.error("API 요청 오류:", error);
  });
  }, []);

  const [modalStates, setModalStates] = useState([]);
  const [alarmModals, setAlarmModals] = useState([]);
  useEffect(() => {
    axios
      .get("http://13.209.147.231:8888/api/main/alarm/getAlarmList", {
        params: { user_id: 'cloud200' },
      })
      .then((response) => {
        const d = response.data;
        setAlarmModals(d);
        setModalStates(d.map(() => true));
      });
  }, []);

  const openModal = (index) => {
 
    const updatedModalStates = [...modalStates];
    updatedModalStates[index] = true;
    setModalStates(updatedModalStates);
  };

  const closeModal = (index) => {
  
    const updatedModalStates = [...modalStates];
    updatedModalStates[index] = false;
    setModalStates(updatedModalStates);
  };

  const customModalStyles = {
    content: {
      left: '90%',
      right: 'auto',
      height:'75px',
      overflow:'auto',
      bottom: 'auto',
      marginRight: '-50%',
      borderRadius:'0.5em',
      fontSize:'11px',
      color:'black',
      border:'1px solid #dfaaaa',
      backgroundColor:'white',
      width:'180px',
      marginTop:'20px',
      padding:'10px',
      Animation:'move',
      animationName: 'move',
      animationDuration: '4s',
      animationIterationCount: 'infinite',
      webkitAnimation: 'move 1.5s',
      
      // 추가적인 스타일을 여기에 추가할 수 있습니다.
    },
  };



  return (
    <>
      <div className="page-wrapper">

      {alarmModals.map((data,index)=>{
      const dateObject = new Date(data.alarm_date);
      const formattedDate = `${dateObject.getFullYear()}/${String(dateObject.getMonth() + 1).padStart(2, '0')
    }/${String(dateObject.getDate()).padStart(2, '0')} ${String(dateObject.getHours()).padStart(2, '0')
    }:${String(dateObject.getMinutes()).padStart(2, '0')}`;
      return(
        <div key={index}>
       
        <Modal overlayClassName="alarm-overlay"
        isOpen={modalStates[index]} 
        onRequestClose={() => closeModal(index)} 
        contentLabel="알람 모달"
        style={{
          content: {
            top: `${(index + 1) * 85}px`, 
            ...customModalStyles.content 
          }
        }}
      >
        <div className="alarm-modal">
          <p style={{marginBottom:'5px'}}>{data.alarm_content}</p>
          <p style={{marginBottom:'5px'}}>{formattedDate}</p>
        </div>
        
        <button onClick={() => closeModal(index)} style={{float:'right'}}>닫기</button>
      </Modal>
      </div>
      )
    })}

        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <div className="card border-end cardpd">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <div className="d-inline-flex ">
                        <Link className=" mb-1 font-weight-medium change-color" to={'/admin/userList'}>
                          {vo.total_CUS_ID_COUNT}명
                        </Link>
                      </div>

                      <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                        클라이언트{" "}
                      </h6>
                    </div>
                    <div className="ms-auto mt-md-3 mt-lg-0">
                      
                      <span className="opacity-7 text-muted">
                        <UserIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card border-end cardpd">
                <div className="card-body">
                  <div className="d-flex ">
                    <div>
                      <div className="d-inline-flex ">
                        <Link className=" mb-1 font-weight-medium change-color" to={'/admin/projectList'}>
                          {vo.total_PRO_NAME_COUNT}개
                        </Link>
                      </div>

                      <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                        진행중인프로젝트{" "}
                      </h6>
                    </div>
                    <div className="ms-auto mt-md-3 mt-lg-0">
                      <span className="opacity-7 text-muted">
                        <FolderIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card border-end cardpd">
                <div className="card-body">
                  <div className="d-flex ">
                    <div>
                      <div className="d-inline-flex ">
                      <Link className=" mb-1 font-weight-medium change-color" to={'/admin/projectList'}>
                          {vo.pro_STATUS_WAITING_COUNT}개
                        </Link>
                      </div>

                      <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                        신규요청 프로젝트{" "}
                      </h6>
                    </div>
                    <div className="ms-auto mt-md-3 mt-lg-0">
                      <span className="opacity-7 text-muted">
                        <FolderPlusIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card border-end cardpd">
                <div className="card-body">
                  <div className="d-flex ">
                    <div>
                      <div className="d-inline-flex ">
                        <Link className=" mb-1 font-weight-medium change-color" to={'/admin/engineerList'}>
                          {vo.total_ENG_ENID_COUNT}명
                        </Link>
                      </div>

                      <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                        엔지니어
                      </h6>
                    </div>
                    <div className="ms-auto mt-md-3 mt-lg-0">
                      <span className="opacity-7 text-muted">
                        <PenToolIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row adminchart">
            <div className="col-lg-6 col-md-12">
              <div className="card cardpd">
                <div className="card-body">
                  <h4 className="card-title">총 프로젝트 현황</h4>
                  <div
                    id="chart-area"
                    className="col-lg-6 col-md-12" /* style={{ width: '466px', height: '350px' }} */
                  >
                    <PieChartComponent 
                        periodic={periodic}
                        emergency={emergency}
                        approval={approval}
                        complete={complete}
                      />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="card cardpd">
                <div className="card-body">
                  <h4 className="card-title">월 별 계약 수 </h4>
                  <div id="chart-area2" className="col-lg-6 col-md-12">
                    <LineChart 
                      contracts={contracts}
                      expiration={expiration}
                      />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="row listsize"
            style={{ float: "none", margin: "0 auto" }}
          >
            <div className="col-6" style={{ float: "none", margin: "0 auto" }}>
              <div className="card cardpd">
                <div className="card-body">
                  <div className=" listclient mb-4">
                    <h4 className="card-title">신규요청리스트</h4>
                    <div className="ms-auto">
                      <div className="dropdown sub-dropdown">
                        <button
                          className="btn btn-link text-muted dropdown-toggle"
                          type="button"
                          id="dd1"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i data-feather="more-vertical"></i>
                        </button>
                        <div
                          className="dropdown-menu dropdown-menu-right"
                          aria-labelledby="dd1"
                        >
                          <a className="dropdown-item" href="#">
                            Insert
                          </a>
                          <a className="dropdown-item" href="#">
                            Update
                          </a>
                          <a className="dropdown-item" href="#">
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table v-middle mb-0 tablesize">
                      <thead>
                        <tr className="border-0">
                          <th className="border-0 font-14 font-weight-medium text-muted">
                            회사명
                          </th>
                          <th className="border-0 font-14 font-weight-medium text-muted">
                            클라이언트
                          </th>
                          <th className="border-0 font-14 font-weight-medium text-muted px-2">
                            프로젝트명
                          </th>
                          <th className="border-0 font-14 font-weight-medium text-muted text-center">
                            계약시작일
                          </th>
                          <th className="border-0 font-14 font-weight-medium text-muted text-center">
                            계약상태
                          </th>
                        </tr>
                      </thead>
                      <tbody>

                        {newPL.map((clientInfo, index) => (
                          <tr key={clientInfo.pro_id}>
                            <td className="border-top-0 text-center font-weight-medium text-muted px-2 py-4">
                              {clientInfo.cus_company_name}
                            </td>
                            <td className="border-top-0 px-2 py-4">
                              <div className="d-flex no-block ">
                                <div className="">
                                  <h5 className="text-dark mb-0 font-16 font-weight-medium">
                                    {clientInfo.cus_managet_name}
                                  </h5>
                                  <span className="text-muted font-14">
                                    {clientInfo.cus_email}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="border-top-0 text-muted px-2 py-4 font-14 projectname">
                              <span>
                                <Link
                                  to={{
                                    pathname: `/admin/projectDetail/${clientInfo.pro_id}`,
                                  }}
                                >
                                  {clientInfo.pro_name}
                                </Link>
                              </span>{" "}
                            </td>

                            <td className="border-top-0 text-center font-weight-medium text-muted px-2 py-4">
                              {clientInfo.pro_startDate}
                            </td>
                            <td className="border-top-0 text-center font-weight-medium text-muted px-2 py-4">
                              {clientInfo.pro_status}
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
      </div>
    </>
  );
}

export default MainAdmin;