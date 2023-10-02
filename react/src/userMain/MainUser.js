import axios from "axios";
import ChartComponent1 from "./ChartComponent1";
//import "normalize.css";
import "./client-main-pro.css";

import React, { useEffect, useState } from "react";

import { differenceInDays, parseISO } from 'date-fns';

import SwiperCore, { EffectCoverflow, Navigation, Pagination ,Scrollbar  , A11y, Mousewheel} from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from "react-router-dom";
import Modal from "react-modal"; 
// Import Swiper styles





function MainUser({state,userId}) {

    
    SwiperCore.use([EffectCoverflow, Navigation, Pagination]);

    const[mainProjectList , setMainProjectList] = useState([]);
    

    console.log(state);
    //const [ivedinspectionList,setIvedinspectionList] = useState([]);
    const [vo, setVo] = useState([]);
    const [periodic, setPeriodic] = useState([0]);
    const [disability, setDisability] = useState([0]);
    const [maintenance, setMaintenance] = useState([0]);

    useEffect(()=>{
      if(userId!=null){
      axios.get(`http://43.201.243.223:8888/api/main/user/${userId}`).then((response)=>{
        const data = response.data;
        console.log(data)
        // console.log(data2);
        const receivedvo = data.vo|| [];
        const receivemainProjectList = data.mainProjectList|| [];

        const receivedperiodic = data.periodic;
        const receiveddisability = data.disability;
        const receivedmaintenance = data.maintenance;

        setVo(receivedvo);
        setMainProjectList(receivemainProjectList);
        setPeriodic(receivedperiodic);
        setDisability(receiveddisability);
        setMaintenance(receivedmaintenance);

        console.log('state:',state)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    },[userId]);

    function calculateProgress(startDate, endDate) {
      const start = parseISO(startDate);
      const end = parseISO(endDate);
      const today = new Date();
    
      const totalDays = differenceInDays(end, start);
      const elapsedDays = differenceInDays(today, start);
    
      return (elapsedDays / totalDays) * 100;
    }

    console.log(mainProjectList)

    const [modalStates, setModalStates] = useState([]);
  const [alarmModals, setAlarmModals] = useState([]);
  useEffect(() => {
    axios
      .get("http://43.201.243.223:8888/api/main/alarm/getAlarmList", {
        params: { user_id: userId },
      })
      .then((response) => {
        const d = response.data;
        setAlarmModals(d);
        setModalStates(d.map(() => true));
      });
  }, [userId]);

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

      <div class="page-wrapper">

        
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
        <div class="container-fluid">
            <h4 class="listTitle text-dark font-weight-medium mb-1">
              프로젝트 진행 현황
            </h4>


         
     {mainProjectList.length > 0 ? (   
            <Swiper
                spaceBetween={30}
                slidesPerView={3}
                scrollbar={{ draggable: true }}
                navigation
         
              >
       <div id="projectList">
        {mainProjectList.map((data,index)=>(<SwiperSlide style={{marginLeft:'20px'}}>
            <div class="projectArea">
              <div class="project">
                <div class="projectInfo">
                  <table>
                    <tr>
                      <th>프로젝트명</th>
                      <td>{mainProjectList?.[index]?.pro_name}</td>
                    </tr>
                    <tr>
                      <th>기간</th>
                      <td>{mainProjectList?.[index]?.pro_startdate}~{mainProjectList?.[index]?.pro_enddate}</td>
                    </tr>
                    <tr>
                      <th>서버</th>
                      <td>{mainProjectList?.[index]?.server_name}</td>
                    </tr>
                    <tr>
                      <th>담당 엔지니어</th>
                      <td>{mainProjectList?.[index]?.eng_name}</td>
                    </tr>
                    <tr>
                      <th>정기점검일</th>
                      <td>{mainProjectList?.[index]?.pro_pi}</td>
                    </tr>
                  </table>
                  <Link to={{ 
                        pathname:`/user/prodetail/${data.pro_id}`, 
                        state: { detail: data } 
                      }}>
                    <figure>
                      <figcaption>자세히보기</figcaption>
                    </figure>
                  </Link>
                </div>
              </div>
              <progress value={calculateProgress(mainProjectList?.[index]?.pro_startdate, mainProjectList?.[index]?.pro_enddate)} max="100"></progress>
              <div class="progress-text">
                {calculateProgress(mainProjectList?.[index]?.pro_startdate, mainProjectList?.[index]?.pro_enddate).toFixed(0)}%
              </div>
            </div>
            </SwiperSlide>
              ))}
    
          </div>
     
      
      </Swiper>
      ): (
        <p>등록된 프로젝트가 없습니다<br/>
          <Link to="/user/apply">프로젝트 등록하러가기</Link>
        </p>
        
      )}
          <div id="totalChart">
            <div
              class="row"
              style={{ marginTop: "50px", float: "none", margin: "0 auto" }}
            >
              <div
                class="col-lg-10 col-md-12"
                style={{ float: "none", margin: "50px auto" }}
              >
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">프로젝트 별 점검상황</h4>

                    <div
                      id="chart-area"
                      style={{ width: "100%" }}
                      class="col-lg-6 col-md-12"
                    >

                      <ChartComponent1 
                        periodic={periodic}
                        disability={disability}
                        maintenance={maintenance}
                        mainProjectList={mainProjectList}
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
export default MainUser;
