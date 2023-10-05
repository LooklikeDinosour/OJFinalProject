import { useEffect, useState } from "react";
import "../enMain/EnMain.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserApply({ state }) {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [allChecked, setAllChecked] = useState(false);
  const [serverFields, setServerFields] = useState([]);

  const handleCheck = (e) => {
    const isChecked = e.target.checked;
    setAllChecked(isChecked);
    const checkboxes = document.querySelectorAll(".custom-control-input");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
  };

  const addServerField = (e) => {
    setServerFields([
      ...serverFields,
      { serverName: "", ipAddress: "", os: "", cpu: "", ram: "", disk: "" },
    ]);
    e.preventDefault();
  };

  const removeServerField = (index, e) => {
    e.preventDefault();
    const updatedServerFields = [...serverFields];
    updatedServerFields.splice(index, 1);
    setServerFields(updatedServerFields);
  };

  const day = [
    "",
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
  ];

  //클라이언트 정보 불러오기
  //const [cusData, setCusData] = useState([]);

  //프로젝트 정보 입력하기
  const [proInfo, setProInfo] = useState({
    pro_name: "",
    pro_rep: "",
    pro_startdate: "",
    pro_pi: "",
    pro_info: "",
  });

  //서버 정보 입력하기
  const [serverInfo, setServerInfo] = useState([
    {
      server_name: "",
      ip_address: "",
      operating_system: "",
      cpu: "",
      ram: "",
      disk_capacitygb: "",
    },
  ]);

  // // 클라이언트 정보 불러오기
  // const clientInfo = async()=>{
  //   if(state.cus_id!=undefined){

  //     const response= await axios.get('/api/main/user/apply')
  //     setCusData(response.data)
  //     console.log(response.data);
  //   }else{
  //     console.log(state.cus_id);
  //     return;
  //   }
  //  }

  // useEffect( () => {
  //  clientInfo()
  // }, [])

  //프로젝트 정보 저장
  const handleChangePro = (e) => {
    setProInfo({
      ...proInfo,
      [e.target.name]: e.target.value,
    });
  };

  //서버 정보 저장
  const handleChangeServer = (e, index) => {
    const updatedServerInfo = [...serverInfo];
    updatedServerInfo[index] = {
      ...updatedServerInfo[index],
      [e.target.name]: e.target.value,
    };
    setServerInfo(updatedServerInfo);
  };

  const updateServerInfo = (index, fieldName, value) => {
    const updatedServerInfo = [...serverInfo];
    updatedServerInfo[index][fieldName] = value;
    setServerInfo(updatedServerInfo);
  };

  // 입력 필드의 onChange 핸들러
  const handleInputChange = (e, index, fieldName) => {
    const updatedServerFields = [...serverFields]; // 배열 복사
    const server = { ...updatedServerFields[index] }; // 해당 인덱스의 서버 정보 복사
    server[fieldName] = e.target.value; // 선택한 필드 업데이트
    updatedServerFields[index] = server; // 업데이트된 서버 정보 다시 배열에 저장
    setServerFields(updatedServerFields); // 상태 업데이트
  };

  const handleApply = async (e) => {
    e.preventDefault(); // 폼 제출 이벤트의 기본 동작을 막습니다 (페이지 새로고침 방지)

    //폼 데이터를 서버에 전송하기 위해 필요한 데이터를 변수에 저장합니다.
    const formData = {
      proInfo: {
        pro_name: proInfo.pro_name,
        pro_rep: proInfo.pro_rep,
        pro_startdate: proInfo.pro_startdate,
        pro_pi: proInfo.pro_pi,
        pro_info: proInfo.pro_info,
      }, // 프로젝트 정보 상태
      serverInfo: serverFields.map((server, index) => ({
        server_name: server.server_name,
        ip_address: server.ip_address,
        operating_system: server.operating_system,
        cpu: server.cpu,
        disk_capacitygb: server.disk_capacitygb,
        ram: server.ram,
      })), // 서버 정보 상태
      cus_id: state.cus_id,
    };
    console.log(formData);

    try {
      // Axios를 사용하여 서버에 POST 요청을 보냅니다.
      const response = await axios.post("http://13.209.147.231:8888/api/main/applyForm", formData);

      // 서버에서 반환한 응답을 확인합니다.
      if (response.status === 200) {
        const checkboxes = document.querySelectorAll(".custom-control-input");

        // 하나라도 체크되어 있지 않은지 확인하는 변수
        let isAnyUnchecked = false;

        checkboxes.forEach((checkbox) => {
          if (!checkbox.checked) {
            isAnyUnchecked = true;
          }
        });

        if (isAnyUnchecked) {
          // 하나라도 체크되어 있지 않은 경우에 실행할 코드
          alert("약관에 전부 동의하셔야 등록이 완료됩니다");
          return;
        }

        // 요청이 성공한 경우
        const data = response.data;

        alert("등록되었습니다");

        navigate("/user/list");
      } else {
        // 요청이 실패한 경우
        alert("등록되지 않았습니다. 다시 확인해주시기 바랍니다");
        return;
      }
    } catch (error) {
      // 오류 처리
      console.error("서버 요청 오류:", error);
    }
  };

  return (
    <>

      <div className="page-wrapper">

        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-7 align-self-center">
              <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
                프로젝트(서버 유지보수) 계약 신청
              </h4>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleApply}>
                    <div className="form-body" id="regist-form">
                      <div className="row">
                        <div className="col-md-2">
                          <div className="form-group mb-3">
                            <div className="infoUser">회사명</div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="가입정보 불러오기"
                              value={state.cus_company_name}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-2">
                          <div className="form-group mb-3">
                            <div className="infoUser">회사 담당자명</div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="담당자명"
                              value={state.cus_managet_name}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-2">
                          <div className="form-group mb-3">
                            <div className="infoUser">담당자 전화번호</div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="(-)없이 표기"
                              value={state.cus_phone_number}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-2">
                          <div className="form-group mb-3">
                            <div className="infoUser">담당자 이메일</div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="abc@gmail.com"
                              value={state.cus_email}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-2">
                          <div className="form-group mb-3">
                            <div className="infoUser">사업자 등록번호</div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="가입정보 불러오기"
                              value={state.cus_business_id}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-2">
                          <div className="form-group mb-3">
                            <div className="infoUser">회사 주소</div>
                          </div>
                        </div>

                        <div className="col-md-2 col-md-2-1">
                          <div className="form-group mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="(우편번호)"
                              value={state.cus_postal_code}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="가입정보 불러오기"
                              value={state.cus_address1}
                            />
                          </div>
                        </div>

                        <div className="col-md-2">
                          <div className="form-group mb-3">
                            <div className="infoUser">프로젝트명</div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="프로젝트명"
                              name="pro_name"
                              value={proInfo.pro_name}
                              onChange={handleChangePro}
                            />
                          </div>
                        </div>

                        <div className="col-md-2">
                          <div className="form-group mb-3">
                            <div className="infoUser">프로젝트 담당자</div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="프로젝트 담당자 성명"
                              name="pro_rep"
                              value={proInfo.pro_rep}
                              onChange={handleChangePro}
                            />
                          </div>
                        </div>

                        <div className="col-md-2">
                          <div className="form-group mb-3">
                            <div className="infoUser">
                              계약 시작일 지정 <p style={{textAlign: "left"}}>(계약은 1년 단위 입니다)</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4">
                          <div>
                            <div className="form-group">
                              <input
                                type="date"
                                className="form-control"
                                name="pro_startdate"
                                value={proInfo.pro_startdate}
                                onChange={handleChangePro}
                              />
                              <p style={{textAlign: "left"}}>시작일은 오늘 이후로의 날짜로 지정해주세요.</p>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-2">
                            <div className="form-group mb-3">
                              <div className="infoUser">정기점검날짜</div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group mb-3 select-day">
                              <p>매월</p>
                              <select
                                className="select-op"
                                name="pro_pi"
                                value={proInfo.pro_pi}
                                onChange={handleChangePro}
                              >
                                {day.map((day, index) => (
                                  <option key={index}>{day}</option>
                                ))}
                              </select>
                              <p>일</p>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-2">
                            <div className="form-group mb-3">
                              <div className="infoUser">프로젝트정보</div>
                            </div>
                          </div>
                          <div className="col-md-4 projec-info">
                            <textarea
                              className="info-txt"
                              name="pro_info"
                              value={proInfo.pro_info}
                              onChange={handleChangePro}
                            >
                              ex 웹 애플리케이션을 개발하여 새로운 기능을
                              추가하고 버그를 수정합니다.
                            </textarea>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-2"></div>
                          <div className="col-md-8">
                            <div className="infoUser infoServer">
                              서버 정보(하나의 서버 정보는 필수입니다.)
                            </div>
                            <button
                              className="sevaddbtn"
                              onClick={addServerField}
                            >
                              서버추가하기
                            </button>
                          </div>
                        </div>
                        {/* <div className="row all-server">
                          <div className="col-md-8 all-server-info">
                            <p className='sever-n'>서버 1</p>
                            <div></div>
                            <div className="form-group server-info-list">
                              <div className="server" >서버이름</div>
                              <input type="text" className="form-control server-info-input" placeholder="서버 이름 입력" name="server_name" value={serverInfo.server_name}  onChange={handleChangeServer}/>


                            </div>
                            <div className="form-group server-info-list">
                              <div className="server" >IP주소</div>
                              <input type="text" className="form-control server-info-input" placeholder="IP 주소 입력" name="ip_address" value={serverInfo.ip_address} onChange={handleChangeServer}/>


                            </div>
                            <div className="form-group server-info-list">
                              <div className="server" >운영체제</div>
                              <input type="text" className="form-control server-info-input" placeholder="운영체제 입력" name="operating_system" value={serverInfo.operating_system} onChange={handleChangeServer}/>


                            </div>
                            <div className="form-group server-info-list">
                              <div className="server" >CPU</div>
                              <input type="text" className="form-control server-info-input" placeholder="CPU 정보 입력" name="cpu" value={serverInfo.cpu} onChange={handleChangeServer}/>
                            </div>
                            <div className="form-group server-info-list">
                              <div className="server" >RAM</div>
                              <input type="text" className="form-control server-info-input" placeholder="RAM 용량 입력" name="ram" value={serverInfo.ram} onChange={handleChangeServer}/>
                            </div>
                            <div className="form-group server-info-list">
                              <div className="server" >디스크</div>
                              <input type="text" className="form-control server-info-input" placeholder="디스크 용량 입력" name="disk_capacitygb" value={serverInfo.disk_capacitygb} onChange={handleChangeServer}/>
                            </div>
                          </div>
                       

                        </div> */}
                        {serverFields.map((server, index) => (
                          <div className="row all-server" style={{margin:"10px"}} key={index}>
                            <div className="col-md-8 all-server-info">
                              <div>
                                <p className="sever-n">서버 {index + 1}</p>
                                <button
                                  className="sevdelbtn"
                                  onClick={(e) => removeServerField(index, e)}
                                >
                                  x
                                </button>
                              </div>
                              <div className="form-group server-info-list">
                                <div className="server">서버이름</div>
                                <input
                                  type="text"
                                  className="form-control server-info-input"
                                  placeholder="서버 이름 입력"
                                  name="server_name"
                                  value={server.server_name}
                                  onChange={(e) =>
                                    handleInputChange(e, index, "server_name")
                                  }
                                />
                              </div>
                              <div className="form-group server-info-list">
                                <div className="server">IP주소</div>
                                <input
                                  type="text"
                                  className="form-control server-info-input"
                                  placeholder="IP 주소 입력"
                                  name="ip_address"
                                  value={server.ip_address}
                                  onChange={(e) =>
                                    handleInputChange(e, index, "ip_address")
                                  }
                                />
                              </div>
                              <div className="form-group server-info-list">
                                <div className="server">운영체제</div>
                                <input
                                  type="text"
                                  className="form-control server-info-input"
                                  placeholder="운영체제 입력"
                                  name="operating_system"
                                  value={server.operating_system}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      index,
                                      "operating_system"
                                    )
                                  }
                                />
                              </div>
                              <div className="form-group server-info-list">
                                <div className="server">CPU</div>
                                <input
                                  type="text"
                                  className="form-control server-info-input"
                                  placeholder="CPU 정보 입력"
                                  name="cpu"
                                  value={server.cpu}
                                  onChange={(e) =>
                                    handleInputChange(e, index, "cpu")
                                  }
                                />
                              </div>
                              <div className="form-group server-info-list">
                                <div className="server">RAM</div>
                                <input
                                  type="text"
                                  className="form-control server-info-input"
                                  placeholder="RAM 용량 입력"
                                  name="ram"
                                  value={server.ram}
                                  onChange={(e) =>
                                    handleInputChange(e, index, "ram")
                                  }
                                />
                              </div>
                              <div className="form-group server-info-list">
                                <div className="server">디스크</div>
                                <input
                                  type="text"
                                  className="form-control server-info-input"
                                  placeholder="디스크 용량 입력"
                                  name="disk_capacitygb"
                                  value={server.disk_capacitygb}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      index,
                                      "disk_capacitygb"
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* <div className="col-md-4">
                            <div className="form-group mb-3">
                              <input type="text" className="form-control" placeholder="관리하실 대상의 OS 종류를 입력해주세요. (ex:Windowns, Linux, HPUX 등)" />
                            </div>
                          </div>



                          <div className="col-md-4">
                            <div className="form-group mb-3">
                              <input type="text" class="form-control" placeholder="사용자의 대표 공인 IP 주소를 입력해주세요. (확인방법 : 네이버 접속 > 내 IP 확인 검색)" />
                            </div>
                          </div> */}

                        <div className="row rowCheck">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              value="checkall"
                              id="customCheck1"
                              onClick={
                                handleCheck
                              } /* onclick="checkALL(this)" */
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck1"
                            >
                              {" "}
                              기업 회원 가입 전체 약관에 동의합니다.{" "}
                            </label>
                          </div>

                          <hr />
                          <div className="custom-control custom-checkbox1">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              value="checkall"
                              id="customCheck1" /* onclick="checkALL(this)" */
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck1"
                            >
                              {" "}
                              기업 회원 가입 약관에 동의합니다.{" "}
                            </label>
                            <label>
                              <a href="#">자세히보기</a>
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox1">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              value="checkall"
                              id="customCheck1" /* onclick="checkALL(this)" */
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck1"
                            >
                              {" "}
                              기업 정보 및 이용에 동의합니다.
                            </label>
                            <label>
                              <a href="#">자세히보기</a>
                            </label>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-info">
                          계약 상담 신청하기
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserApply;