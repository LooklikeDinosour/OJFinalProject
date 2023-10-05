import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../enMain/EnMain.css";
// import "../enMain/EnTeam.css";
import "./EngLeader.css";
import axios from "axios";
import { Link } from "react-router-dom";

function EnglTeamassign(props) {
  const [data, setData] = useState([]);
  const pro_pi = props.pro_pi;
  const pro_id = props.pro_id;
  const server_id = props.server_id;
  const leader_id = props.leader_id;

 


  useEffect(() => {
    // props.leaderid가 null이 아닌 경우에만 axios.post 요청을 보냅니다.
    if (props.userId !== null) {

      axios.get('http://13.209.147.231:8888/api/main/engleader/getTeamEngList',{
         params: {
          leader_id: props.leader_id,
          pro_pi: pro_pi
        }
      })

        .then(response => {

          setData(response.data);

        })
        .catch((error) => {
          // 요청에 대한 오류 처리를 수행합니다.
        });
    }
  }, [props.userId]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

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
      padding: "30px",
    },
  };

  const assign = (e) => {
    const checklist = document.querySelectorAll(".eng-assign-check");
    let count = 0;
    let checkedEng = "";
    for (let i = 0; i < checklist.length; i++) {
      if (checklist[i].checked) {
        checkedEng = checklist[i];
        count++;
        if (count > 1) {
          alert("한 서버에는 한명의 엔지니어만 배정이 가능합니다");
          for (let i = 0; i < checklist.length; i++) {
            checklist[i].checked = false;
          }
          return;
        }
      }
    }
    if (count === 0) {
      alert("한명의 엔지니어 선택은 필수입니다.");
      return;
    }

    var eng_enid = checkedEng.previousElementSibling.value;


    axios.post('http://13.209.147.231:8888/api/main/engleader/assignEng', { eng_enid: eng_enid, pro_id: pro_id, server_id: server_id })
      .then(response => {

        console.log(response);
        if (response.data === "ok") {
            axios.get('http://13.209.147.231:8888/api/main/engleader/updatePro')
          setModalIsOpen(false);
          const classname = props.server_id;
          const btn_change = document.querySelector(
            `[class="${classname}"]`
          ).previousElementSibling;
          console.log(btn_change);
          btn_change.style.backgroundColor = "rgb(101 98 98)";
          btn_change.innerHTML = "팀원배정완료";
          alert("해당 서버에 팀원을 배정 했습니다");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // const engId = '김철수';
    // const cusId = 'tnwjd5622';
    // axios.post('/alarm/assignEngineer', { engId: engId, cusId: cusId })
    //   .then(response => { console.log(response) })
    //   .catch(err => { console.log('실패' + err) })
    // alert('배정 완료');
    // setModalIsOpen(false);
  };

  return (
    <>

      {props.check === true ? <button type="button" className="assingment-btn ok-bbtn" style={{backgroundColor:'rgb(101 98 98)'}}>팀원배정완료</button> : <button type="button" className="assingment-btn" onClick={()=>setModalIsOpen(true)}>팀원배정</button>}

      <input type="hidden" className={server_id}></input>

      {/* <button type="button" className="assingment-btn" onClick={() => setModalIsOpen(true)}>팀원배정</button> */}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <div className="team-table">
          <div className="team-select">
            <table className="team-select-table">
              <thead>
                <tr>
                  <th scope="col">NO</th>
                  <th scope="col">이름</th>
                  {/* <th scope="col">직급</th>
                  <th scope="col">소속</th> */}
                  <th scope="col">전화번호</th>
                  <th scope="col">선택</th>
                </tr>
              </thead>
              <tbody>
                {data.map((list, key) => (
                  <tr key={key}>
                    <th scope="row">{key + 1}</th>
               
                     
                        <div className="team-member-name">

                          <td>
                            <Link to={`/engineerleader/engDetail/${list.eng_enid}`}>{list.eng_name}</Link>
                            
                          </td>

                        </div>
                      
                    
                    <td>{list.eng_phone}</td>

                    <td>
                      <input type="hidden" value={list.eng_enid}></input>{" "}
                      <input type="checkbox" className="eng-assign-check" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="detail_modal_btn btn-assign-zone">
              <input
                type="button"
                value="배정"
                className="detail_modal_btn_show btn-assign-eng"
                style={{ backgroundColor: "rgb(44, 117, 70)" }}
                onClick={assign}
              />
              <input
                type="button"
                value="취소"
                className="detail_modal_btn_close btn-assign-eng"
                style={{ backgroundColor: "rgb(44, 117, 70)" }}
                onClick={() => setModalIsOpen(false)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default EnglTeamassign;
