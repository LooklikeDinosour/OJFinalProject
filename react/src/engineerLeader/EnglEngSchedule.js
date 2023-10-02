import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import "./EngLeader.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css"; // Calendar 스타일
// 캘린더를 생성하기 위해 tui-calendar 객체와 스타일 코드 삽입

import Loading from '../loding/Loding';


function EnglEngSchedule() {
  const { eng_enid } = useParams();



  useEffect(()=>{
    axios.get(`http://43.201.243.223:8888/api/main/engleader/getEngInfo/${eng_enid}`)
    .then(response => console.log(response.data))

    setLoading(false);
  },[])


  const schedules = [
    {
      id: "1",
      calendarId: "1",
      title: "Sample Event",
      category: "time",
      dueDateClass: "",
      start: "2023-09-12T10:00:00+09:00",
      end: "2023-09-13T12:00:00+09:00",
    },
    // 추가적인 이벤트 데이터 추가 가능
  ];

  const calendarOptions = {
    defaultView: "month",
    taskView: false,
    useCreationPopup: true,
    useDetailPopup: true,
    template: {
      monthDayname: "ddd",
      monthScheduleTitle: "HH:mm",
      weekTime: "HH:mm",
    },
  };

  const [events, setEvents] = useState([
    // 초기 이벤트 데이터 배열
    {
      title: "정기점검",
      start: "2023-09-02",
      end: "2023-09-06",
      description: {
        점검종류: "정기점검",
        점검내용: "이러이런거 했습니다",
        "프로젝트 명": "프로젝트 이름",
      },
    },
    {
      title: "장애대응",
      start: "2023-09-05",
      end: "2023-09-07",
      color: "rgb(240 102 102)",
    },
    {
      title: "수정생일",
      start: "2023-11-10",
      end: "2023-11-13",
    },
    // 기존 이벤트 데이터 추가
  ]);

  const Click = (e) => {
    alert("내용내용");
  };

  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    description: {
      점검종류: "",
      점검내용: "",
      "프로젝트 명": "",
    },
  });

  return (
    <>

            {/* {loading ? <Loading /> : null} */}
      <div className='page-wrapper englschedule'>


        <div>
          <h3>담당 서버 리스트</h3>
        </div>

        <div className="englCalendar">
          <h3>일정 확인</h3>
          <div id="calendar" style={{ height: "800px" }}>
            {/* <button onClick={openAddEventModal} style={{ backgroundColor: "rgb(42, 198, 97)" }}>일정 추가</button> */}
            {/* <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={Click}
          /> */}
            <div>
              <Calendar schedules={schedules} options={calendarOptions} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EnglEngSchedule;
