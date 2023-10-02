
import $ from 'jquery';
import './EnMain.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import EnCalendar from "./EnCalendar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Calendar from "./Calendar"
import Loading from '../loding/Loding';
import DataTest from '../data/DataTest';
import Modal from "react-modal"; 
import axios from 'axios';

function EnMain({checkPermission}) {
  const [loading, setLoading] = useState(true);


  const [isToggled, setToggled] = useState(true);

  const toggleButton = () => {
    setToggled(!isToggled);
  };

  const [modalStates, setModalStates] = useState([]);
  const [alarmModals, setAlarmModals] = useState([]);
  const eng_enid = checkPermission.sub;
  useEffect(() => {
    axios
      .get("http://43.201.243.223:8888/api/main/alarm/getAlarmList", {
        params: { user_id: eng_enid },
      })
      .then((response) => {
        const d = response.data;
        setAlarmModals(d);
        setModalStates(d.map(() => true));
      });
  }, [eng_enid]);

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
      {/* {loading ? <Loading /> : null} */}
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
        <div className='eng-main-cal'>
          <div className='row tog-btn'>
            <b>
              <button onClick={toggleButton} className='tog-btn'>
                {isToggled ? '일정 확인하기' : '서버상태 확인하기'} <FontAwesomeIcon style={{ fontSize: '37px', color: 'rgb(42, 198, 97)' }} icon={isToggled ? faToggleOn : faToggleOff} />
              </button>

            </b>
          </div>
          {isToggled ? <Calendar checkPermission={checkPermission} /> : <DataTest id={checkPermission.sub}/>}
        </div>
      </div>



    </>

  )

}

export default EnMain