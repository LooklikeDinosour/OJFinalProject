import { Link } from "react-router-dom";

import FolderPlusIcon from "../img/FolderPlusIcon";
import FolderIcon from "../img/FolderIcon";
import UsersIcon from "../img/UserIcon";



import ChartComponent1 from "../userMain/ChartComponent1"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from "react"
import axios from "axios"
import EnglChartComponent from "./EnglChartComponent"
import Modal from "react-modal";


function EngLeadMain(props) {

  const [vo, setVo] = useState([]);
  const [list, setList] = useState([]);
  const [periodic, setPeriodic] = useState([]);
  const [disability, setDisability] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [userId, setUserId] = useState(props.userId);
  console.log(props.userId);
  useEffect(() => {
    // props.userId가 null이 아닌 경우에만 axios 요청을 보냅니다.
    // if (props.userId !== undefined && props.userId != null && props.userId!=='') {
      axios.get('http://13.209.147.231:8888/api/main/engleader/main',{
        params: { userId: props.userId }
      })
        .then(response => {
          const data2 = response.data;
          const receivedvo = data2.vo;
          const receivedlist = data2.list;
          const receivedperiodic = data2.periodic;
          const receiveddisability = data2.disability;
          const receivedmaintenance = data2.maintenance;
          setVo(receivedvo);
          setList(receivedlist);
          setPeriodic(receivedperiodic);
          setDisability(receiveddisability);
          setMaintenance(receivedmaintenance);
        });
    //}
  }, [props.userId]); // props.userId가 변경될 때마다 useEffect를 실행합니다.
  const data = {
    labels: ["신규계약", "계약종료"],
    datasets: [
      {
        data: [vo.thisMonthStart, vo.thisMonthEnd],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const [modalStates, setModalStates] = useState([]);
  const [alarmModals, setAlarmModals] = useState([]);
  useEffect(() => {
    axios
      .get("http://13.209.147.231:8888/api/main/alarm/getAlarmList", {
        params: { user_id: props.userId },
      })
      .then((response) => {
        const d = response.data;
        setAlarmModals(d);
        setModalStates(d.map(() => true));
      });
  }, [props.userId]);

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

  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <>

      <div className="page-wrapper" >

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
          <div className="row l-main-pa">
            <div className="engl-card">
              <div className="card border-end cardpd ">
                <div className="card-body ">
                  <div className="d-flex align-items-center">
                    <div>
                      <div className="d-inline-flex ">
                        <h2 className=" mb-1 font-weight-medium change-color-engl">

                          <Link className="movetoengl" to={'/engineerleader/engineerList'}> {vo.teamCount}명</Link></h2>

                      </div>

                      <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                        팀원수{" "}
                      </h6>
                    </div>
                    <div className="ms-auto mt-md-3 mt-lg-0 ">
                      <span className="opacity-7 text-muted">
                        <UsersIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" engl-card">
              <div className="card border-end cardpd">
                <div className="card-body">
                  <div className="d-flex ">
                    <div>
                      <div className="d-inline-flex ">
                        <h2 className=" mb-1 font-weight-medium change-color-engl">

                          <Link className="movetoengl" to={'/engineerleader/projectList'}>{vo.projectCount}개</Link></h2>

                      </div>

                      <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                        진행중인프로젝트{" "}
                      </h6>
                    </div>
                    <div className="ms-auto mt-md-3 mt-lg-0 engl-main-icon">
                      <span className="opacity-7 text-muted">
                        <FolderIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="engl-card">
              <div className="card border-end cardpd">
                <div className="card-body">
                  <div className="d-flex ">
                    <div>
                      <div className="d-inline-flex ">
                        <h2 className=" mb-1 font-weight-medium change-color-engl">
                          {vo.serverCount}개
                        </h2>
                      </div>

                      <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                        관리중인 서버수
                      </h6>
                    </div>
                    <div className="ms-auto mt-md-3 mt-lg-0 engl-main-icon">
                      <span className="opacity-7 text-muted">
                        <FolderPlusIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row row-here">
            <div className=" reqsize" style={{ margin: "0 10px" }}>
              <div
                className="col-lg-3 engl-main-car"
                style={{
                  float: "none",
                  margin: "0 10px",
                  display: "inline-block",
                  width: "600px",
                }}
              >
                <div className="card cardpd engl-mian-car">
                  <div className="card-body engl-cardBody">
                    <div className=" listclient mb-4">
                      <h4
                        className="card-title"
                        style={{ display: "inline-block" }}
                      >
                        새로 배정된 프로젝트 리스트
                      </h4>
                      <span
                        style={{
                          marginLeft: "13px",
                          color: "rgb(129 132 135)",
                        }}
                      >
                        (빠르게 엔지니어 배정 해주세요)
                      </span>
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
                    <div className="">
                      <table className="table v-middle mb-0 tablesize">
                        <thead>
                          <tr className="border-0">
                            <th className="border-0 font-14 font-weight-medium text-muted">
                              클라이언트
                            </th>
                            <th className="border-0 font-14 font-weight-medium text-muted px-2">
                              프로젝트명
                            </th>

                            <th
                              className="border-0 font-14 font-weight-medium text-muted "
                              style={{ paddingLeft: "10px" }}
                            >
                              계약시작일
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((data, index) => (
                            <tr key={index}>
                              <td className="">
                                <div className="">
                                  <div className="">{data.pro_rep}</div>
                                </div>
                              </td>


                              <td className="" style={{ padding: '6px' }}><Link className="engl-main-a" to={{
                                pathname: `/engineerleader/requestDetail/${data.pro_id}`,
                                state: {
                                  id: data.pro_id
                                },
                              }} >{data.pro_name}</Link></td>

                              <td
                                className="">
                                {data.pro_startdate}
                              </td>

                              <td className="">{data.pro_startDate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card cardpd " style={{ width: "380px" }}>
              <h4
                className="card-title engl-condition"
                style={{
                  display: "inline-block",
                  padding: "20px",
                  paddingBottom: "0",
                  fontSize: "16px",
                }}
              >
                이달의 팀 계약 현황
              </h4>
              <div
                className="engl-main-chart card-body engl-cardBody"
                style={{ width: "100%" }}
              >
                <Doughnut data={data} />
              </div>
            </div>
          </div>

          <div id="totalChart">
            <div
              class="row"
              style={{ marginTop: "0px", float: "none", margin: "0 auto" }}
            >
              <div
                class="col-lg-10 col-md-12"
                style={{ float: "none", margin: "0px auto" }}
              >
                <div class="card cardpd">
                  <div class="card-body">
                    <h4 class="card-title">월별 점검상황</h4>

                    <div
                      id="chart-area"
                      style={{ width: "100%" }}
                      class="col-lg-6 col-md-12"
                    >
                      <EnglChartComponent
                        periodic={periodic}
                        disability={disability}
                        maintenance={maintenance}
                      />
                    </div>
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

export default EngLeadMain;
