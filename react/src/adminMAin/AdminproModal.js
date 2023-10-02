import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./Admin.css";
import axios from "axios";

function AdminproModal(props) {
  const pro_id = props.pro_id; //값 넘어옴
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [teamLeader, setTeamLeader] = useState([]);
  const [teamMember, setTeamMember] = useState([]);
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);

  const handleMouseEnter = (e) => {
    setSubMenuVisible(false);
  };

  const handleMouseLeave = (e) => {
    setSubMenuVisible(true);
  };

  const customStyles = {
    content: {
      top: "55%",
      left: "60%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "100%", // Adjust the width as needed

      maxHeight: "85%", // Adjust the height as needed
      overflow: "auto", // Enable scrolling if content overflows
      backgroundColor: "#f9f9fd",
      zIndex: "0",
    },
  };

  useEffect(() => {
    axios.get("http://43.201.243.223:8888/api/main/admin/getTeam").then((response) => {
      setTeamLeader(response.data.teamLeader);
      setTeamMember(response.data.teamMember);
    });
  }, []);

  function submit() {
    axios
      .post("http://43.201.243.223:8888/api/main/admin/inputTeamNum", inputData, {
        headers: {
          "Content-Type": "application/json", // 또는 다른 올바른 Content-Type
        },
      })
      .then((response) => {
        alert("팀 배정 완료");
        setModalIsOpen(false);
        // formData.forEach((value, key) => {
        //   console.log("작성완료"+key, value);
        // });
        console.log(inputData);
      })
      .catch((err) => {
        console.log("에러발생" + err);
      });
  }

  const [inputData, setInputData] = useState({pro_id: '', team_num: ''})
  const formData = new FormData();
  //formData.append("pro_id", pro_id);

  function handleCheckboxChange(e) {
    const checkboxValue = e.target.value;
    
    if (e.target.checked) {
     // formData.append("team_num", checkboxValue);
      setInputData({pro_id: pro_id, team_num: checkboxValue, pro_status: '계약승인'})
      //console.log("체크된 값:", checkboxValue);
    } //else {
     // formData.delete("team_num");
      //console.log("체크 해제된 값:", checkboxValue);
   // }
  //  // formData.forEach((value, key) => {
  //     console.log(key, value);
  //   });
  }

  return (
    <>
      <button onClick={() => setModalIsOpen(true)}>{props.name}</button>
      <Modal
        /* className="modal-content"
        overlayClassName="modal-overlay" */
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <div className="detail_modal_container team-check">
          <h2>팀 배정하기</h2>
          <hr />
          <span style={{justifyContent:'center', alignItems:'center', display:'flex'}}>팀 리스트</span>
          <br />
          <div style={{marginBottom:'20px'}}>
            <ul className="ver-menu" style={{display:'inline'}}>
              {teamLeader &&
                teamLeader.map((team) => (
                  <li 
                  // style={{display:'inline'}}
                    key={team.team_num}
                    className="ver-mid"
                    style={{width: '400px', margin: '0 auto'}}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                     >
                    <input
                      type="checkbox"
                      value={team.team_num}
                      onChange={handleCheckboxChange}
                    />
                    <span>{team.team_id}</span>
                    <span>팀장 {team.eng_name}</span>

                    {/* <ul
                      className={`ver-sub ${isSubMenuVisible ? "visible" : ""}`}
                      key={team.team_num}
                    >
                      {teamMember
                        .filter((member) => member.team_num === team.team_num)
                        .map((filteredMember) => (
                          <li key={filteredMember.team_num}>
                            <span>{filteredMember.eng_name}</span>
                          </li>
                        ))}
                    </ul> */}
                  </li>
                ))}
            </ul>
          </div>

          <div className="detail_modal_container_inner">
            <div className="detail_modal_button">
              <input
                type="button"
                value="배정하기"
                className="detail_modal_button_print"
                onClick={submit}
              />
              <input
                type="button"
                value="취소"
                className="detail_modal_button_close"
                onClick={() => setModalIsOpen(false)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AdminproModal;
