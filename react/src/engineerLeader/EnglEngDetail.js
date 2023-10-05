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


function EnglEngDetail() {
  const [loading, setLoading] = useState(true);

  const { eng_enid } = useParams();
  const [serverList, setServerList] = useState([]);
  const [scheList, setScheList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

    axios.get(`http://13.209.147.231:8888/api/main/engleader/getEngInfo/${eng_enid}`)
      .then(response => {
        setServerList(response.data.serverList);
        setScheList(response.data.scheList);
        console.log(response.data)
      });
  }, [eng_enid]);

  useEffect(() => {
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
        pro_id: item.pro_id
      };
    });

    setEvents(updatedEvents);
  }, [scheList]);

  const [events, setEvents] = useState([]);

  const handleEventClick = (event) => {

    setSelectedEvent(event.event);
    console.log(event.event)

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
        <div>
          <h3 style={{ color: 'black',marginBottom:'30px',marginLeft:'120px',fontSize:'18px' }}>담당 서버 리스트</h3>
        </div>
        <div style={{width:'1000px'}}>
        <table className="table englprolisttable englprolisttable2 englcuslist englserverlIst">
                <thead>
                  <tr>
                    <th scope="col" style={{width:'8px'}}>NO</th>
                    <th scope="col" >서버이름</th>
                    <th scope="col" style={{width:'35px'}}>운영체제</th>
                    <th scope="col">아이피주소</th>
                    <th scope="col" style={{width:'40px'}}>CPU</th>
                    <th scope="col">RAM</th>
                    <th scope="col">디스크용량</th>
                  </tr>
                </thead>
                <tbody>
                  {serverList.map((data, key) => (
                    <tr key={key}>
                      <th scope="row" className="col1st">{key+1}</th>
                      <th>{data.server_name}</th>
                      <td>{data.operating_system}</td>
                      <td>{data.ip_address}</td>
                      <td>{data.cpu}</td>
                      <td>{data.ram}</td>
                      <td>{data.disk_capacitygb}</td>
                    </tr>
                  ))}

                </tbody>
              </table>
         
          
        </div>
        <div className="englCalendar">
          <h3 style={{ color: '#746a60' }}>일정 확인</h3>
          <div id="calendar" style={{ height: "800px" }}>
            <FullCalendar
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
                    <Link to={`/engineerleader/projectDetail/${selectedEvent.extendedProps.pro_id}`}>
                      {selectedEvent.extendedProps.pro_name}
                    </Link>
                  </p>
                  <p style={{ fontSize: '14px' }}>서버이름 : {selectedEvent.extendedProps.server_name} </p>
                  <p>{moment(selectedEvent.start).format("YYYY-MM-DD")} {selectedEvent.end ? `~ ${moment(selectedEvent.end).format("YYYY-MM-DD")}` : ''}</p>

                </div>
              </Modal>
            )}
          </div>
        </div>
      </div>
      <div className="">
        {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <div className="sche_modal">
          내용~
        </div>
      </Modal> */}

      </div>
    </>
  );
}

export default EnglEngDetail;
