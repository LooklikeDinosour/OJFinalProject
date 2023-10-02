import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import moment from 'moment';
import Modal from "react-modal";
import './EngLeader.css';
import { Link } from "react-router-dom";

function EnglAllSchedule(props) {
  
  const [scheList, setScheList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [serverList, setServerList] = useState([]);
  const initialCustomStyles = {
    content: {
      width: "250px",
      top: "40%",
      left: "88%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxHeight: "85%",
      overflow: "auto",
      backgroundColor: "white",
      // borderTop: "3px solid rgb(255, 115, 115)",
      zIndex: 9999,
    },
    overlay: {
      backgroundColor: 'none'
    } 
  };
  const [customStyles, setCustomStyles] = useState(initialCustomStyles);



  useEffect(() => {
    if (props.userId !== null) {
    axios.get('http://43.201.243.223:8888/api/main/engleader/getAllSche',{
      params:{userId:props.userId}
    })
      .then(response => {
        setScheList(response.data);
        console.log(response.data)
      });
    }
  }, [props.userId]);
  
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    console.log(scheList)
    // scheList가 변경될 때 events 업데이트
    const updatedEvents = scheList.map(item => {
      let color = "";
  
      if (item.sche_name === "정기점검") {
        color = "red";
      } else if (item.sche_name === "장애대응") {
        color = "yellow";
      } else if (item.sche_name === "유지보수") {
        color = "#b0cddb";
      }
  
      const startDate = moment(item.sche_startdate).format("YYYY-MM-DD");
      const endDate = moment(item.sche_enddate).format("YYYY-MM-DD");
  
      return {
        title: item.sche_name,
        start: item.sche_startdate,
        end: item.sche_enddate,
        color: color,
        pro_name: item.pro_name,
        server_name: item.server_name,
        pro_id: item.pro_id,
        eng_enid:item.eng_enid,
        eng_name: item.eng_name,
        eng_phone:item.eng_phone,
        sche_num:item.sche_num
      };
    });
  
    setEvents(updatedEvents);
  }, [scheList]);

  

  const handleEventClick = async(event) => {
    setSelectedEvent(event.event);
    console.log(event.event)
    const sche_num={"sche_num":event.event.extendedProps.sche_num}
    const response=await axios.post("http://43.201.243.223:8888/api/main/engineer/getScheInfo",sche_num)
    console.log(response)
    setServerList(response.data)
    // 모달 스타일 업데이트
    if (event.event.borderColor) {
      const updatedStyles = {
        ...initialCustomStyles,
        content: {
          ...initialCustomStyles.content,
          borderTop: `3px solid ${event.event.borderColor}`,
        },
      };

      setCustomStyles(updatedStyles);
    }
    setModalIsOpen(true);
  };

  return (
    <> 
      <div className="page-wrapper englschedule">
        <div className="englCalendar">
          <h3 style={{ color: '#746a60' }}>전체 일정 확인</h3>
          <div id="calendar" style={{ height: "800px" }}>
            <FullCalendar
             displayEventTime={false}
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={events}
              eventClick={(event) => handleEventClick(event)}
            />
            {selectedEvent && (
              <Modal
             
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{ ...customStyles, borderTop: `3px solid ${selectedEvent.color}` }}
              >
                <div className="sche_modal">
                  <p style={{ fontSize: '15px' }}>작업 종류 : {selectedEvent.title}</p>
                  <p style={{ fontSize: '15px' }}>프로젝트 이름 :
                    <Link to={`/engineerleader/projectDetail/${serverList.pro_id}`}>
                      {serverList.pro_name}
                    </Link>
                  </p>
                  <p style={{ fontSize: '14px' }}>서버이름 : {serverList.server_name} </p>
                  <p>{moment(selectedEvent.start).format("YYYY-MM-DD")} {selectedEvent.end ? `~ ${moment(selectedEvent.end).format("YYYY-MM-DD")}` : ''}</p>
                  <p>{selectedEvent.eng_name}</p>
                  <p>담당엔지니어 : 
                    <Link to={`/engineerleader/engDetail/${selectedEvent.extendedProps.eng_enid}`}>
                      {selectedEvent.extendedProps.eng_name}
                    </Link>
                  </p>
                  <p>엔지니어 연락처 : {selectedEvent.extendedProps.eng_phone}</p>
                </div>
              </Modal>
            )}
          </div>
        </div>
      </div>
      
    </>
  );
}

export default EnglAllSchedule;