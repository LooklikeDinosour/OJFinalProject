import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import moment from 'moment';

import Modal from "react-modal";
import '../engineerLeader/EngLeader.css';
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function EnEngDetail({checkPermission}) {
  

  const [serverList, setServerList] = useState([]);

  const [scheList, setScheList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const initialCustomStyles = {
    content: {
      width: "250px",
      top: "40%",
      left: "83%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxHeight: "85%",
      backgroundColor: "white",
      overflow: 'none',
      zIndex: 9999,
    },
    overlay: {
      backgroundColor: 'none'
    }
  };
  const [customStyles, setCustomStyles] = useState(initialCustomStyles);

  const eng_enid = checkPermission.sub;
 

  useEffect(() => {

    axios.get(`http://13.209.147.231:8888/api/main/engleader/getEngInfo/${eng_enid}`)
      .then(response => {
        setScheList(response.data.scheList);
        console.log(response.data)
      });
  }, [eng_enid]);

  useEffect(() => {
    // scheList가 변경될 때 events 업데이트
    const updatedEvents = scheList.map(item => {
      let color = "";

      if (item.sche_name === "정기 점검") {
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
        // time:'123123',
        start: item.sche_startdate,
        end: item.sche_enddate,
        color: color,
        pro_name: item.pro_name,
        server_name: item.server_name,
        pro_id: item.pro_id,
        sche_num: item.sche_num,
      };
    });
    console.log(updatedEvents)
    setEvents(updatedEvents);
  }, [scheList]);

  const [events, setEvents] = useState([]);

  const handleEventClick = async(event) => {
    setSelectedEvent(event.event);
    const sche_num={"sche_num":event.event.extendedProps.sche_num}
    const response=await axios.post("http://13.209.147.231:8888/api/main/engineer/getScheInfo",sche_num)
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
  const [scheNum,setScheNum] = useState([]);
  const handleChangeSche = (event) => {
    const parent = event.currentTarget.parentElement;
    const sche_num = parent.firstChild.value;
    const datePicker = event.currentTarget.nextSibling;
    setStartDate(null);
    setEndDate(null);
    setScheNum(sche_num);
    datePicker.style.display = 'block'
  }

  const [startDate, setStartDate] = useState(null); // 선택된 날짜 상태
  const [endDate, setEndDate] = useState(null); // 선택된 날짜 상태
  const handleDateChange1 = (date) => {
    setStartDate(date); // 선택된 날짜를 업데이트합니다.
  };
  const handleDateChange2 = (date) => {
    setEndDate(date); // 선택된 날짜를 업데이트합니다.
  };

  const changeSche = (event) => {
    
    const currentDate = new Date(); 
    if (startDate < currentDate) {
      alert('시작 날짜는 오늘보다 이전일 수 없습니다.');
    }else if (startDate && endDate && startDate > endDate) {
      alert('시작 날짜는 종료 날짜보다 늦을 수 없습니다.');
    } else {
  
      const isConfirmed = window.confirm('일정을 수정하시겠습니까?');

      if (isConfirmed) {
        const requestData = {
          sche_startdate: startDate,
          sche_enddate: endDate,
          sche_num: scheNum,
        };
        axios.post('http://13.209.147.231:8888/api/main/engineer/editSchedule', requestData)
        .then(response => {
          console.log('일정 수정 요청이 성공했습니다.');
          axios.get(`http://13.209.147.231:8888/api/main/engleader/getEngInfo/${eng_enid}`)
          .then(response => {          
          setScheList(response.data.scheList);
          setModalIsOpen(false);
        
          });
        })
        .catch(error => {
          console.error('일정 수정 요청이 실패했습니다.', error);   
        });
        
      }

    }


  }

  const cancelSche = (event) => {
    document.querySelector('.editSchedule').style.display = 'none'
    setStartDate(null);
    setEndDate(null);
  }

  return (
    <>


      <div id="myCalendar" className="englCalendar engCalendar">
        <h3 style={{ color: '#746a60' }}>일정 확인</h3>
        <div id="calendar" style={{ height: "800px" }}>
          <FullCalendar
           displayEventTime={false}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={(event) =>{ console.log(event);handleEventClick(event)}}
          />
          {selectedEvent && (
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              style={{ ...customStyles, borderTop: `3px solid ${selectedEvent.color}` }}
            >
              <div className="sche_modal">
                <input type="hidden" value={selectedEvent.extendedProps.sche_num}></input>
                <p style={{ fontSize: '15px' }}>작업 종류 : {selectedEvent.title}</p>
                <p style={{ fontSize: '15px' }}>프로젝트 이름 :{serverList.pro_name}
                  {/* <Link to={`/engineer/newProjectDetail/${serverList.pro_id}`}>
                    {serverList.pro_name}
                  </Link> */}
                </p>
                <p style={{ fontSize: '14px' }}>서버이름 : {serverList.server_name} </p>
                <p>{moment(selectedEvent.start).format("YYYY-MM-DD")} {selectedEvent.end ? `~ ${moment(selectedEvent.end).format("YYYY-MM-DD")}` : ''}</p>
                <button className="change-sche" onClick={handleChangeSche} style={{ background: '#ffced7' }}>일정수정하기</button>
                <div className="editSchedule" style={{ display: 'none' }}>
                  <p>시작날짜</p>
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange1}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="날짜를 선택하세요"
                  />
                  <button style={{ float: 'right', background: '#d9edf7' }} onClick={cancelSche} className="cancelSche">취소</button>
                  <p style={{ marginTop: '5px' }}>종료날짜</p>
                  <DatePicker
                    selected={endDate}
                    onChange={handleDateChange2}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="날짜를 선택하세요"
                  />
                  <button style={{ float: 'right', background: '#d9edf7' }} onClick={changeSche}>수정</button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>


    </>
  );
}


export default EnEngDetail;

