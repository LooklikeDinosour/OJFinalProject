import { useEffect, useState } from 'react';
import './workInfo.css';
import axios from 'axios';
import { useParams } from 'react-router';

function EnglWorkInfo() {

  const { server_id } = useParams();
  const [list, setList] = useState([]);
  useEffect(() => {
    axios.get('http://43.201.243.223:8888/api/main/engleader/getWorkInfo', {
      params: { server_id: server_id }
    })
      .then(response => {
        const data = response.data
        setList(data);
      })
  }, server_id)

  function formatDateWithoutTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <div className='page-wrapper' >
        <div className='timeline-wrapper'>
          <h3>서버 작업 내역</h3>
          {list.length === 0 ? (
            <>
              <p style={{marginTop:'100px'}}>아직 등록된 내역이 없습니다.</p>
            </>
          ) : (
            <ul className="timeline2">
              {list.map((data, index) => {
                if (index % 2 === 0) {
                  return (
                    <li key={index}>
                      <div className="direction-r">
                        <div className="flag-wrapper">
                          <span className="flag workinfoo">{data.work_division}</span>
                          <span className="time-wrapper">
                            <span className="work-time">{formatDateWithoutTime(data.work_date)}</span>
                          </span>
                        </div>
                        <div className="desc workdetaill">{data.work_note}</div>
                      </div>
                    </li>
                  );
                } else {
                  return (
                    <li key={index}>
                      <div className="direction-l">
                        <div className="flag-wrapper">
                          <span className="flag workinfoo">{data.work_division}</span>
                          <span className="time-wrapper">
                            <span className="work-time">{formatDateWithoutTime(data.work_date)}</span>
                          </span>
                        </div>
                        <div className="desc workdetaill">{data.work_note}</div>
                      </div>
                    </li>
                  );
                }
              })}
            </ul>
          )}
        </div>
      </div>

    </>
  )

}
export default EnglWorkInfo