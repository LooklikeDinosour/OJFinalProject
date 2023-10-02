import { useEffect, useState } from "react";
import "../enMain/EnMain.css";

import "../enMain/EnTeam.css";
import axios from "axios";
import "./EngLeader.css";
import { Link, useParams } from "react-router-dom";
import EnglTeamassign from "./EnglTeamassign";
import "./EngLeader.css";

function EnglProjectDetail() {
  const { pro_id } = useParams();
  const [info, setInfo] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    axios
      .get(`http://43.201.243.223:8888/api/main/engleader/projectDetail/${pro_id}`)
      .then((response) => {
        console.log(response);
        setInfo(response.data);
        setList(response.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const assignEmer = () => {
    const engid = "tnwjd2580";
    const serverId = "21ff55ca-4c9d-11ee-acdc-8cb0e993c4ae";
    axios
      .post("http://43.201.243.223:8888/alarm/assignEmer", { engid: engid, serverId: serverId })
      .catch((err) => {
        alert("실패" + err);
      });
  };

  return (
    <>
      <div className="page-wrapper engl-all-proli">
        <div className="page-breadcrumb">
          <div className="col-7 align-self-center header-div-engl">
            <h4 className="info-head8" style={{ color: "rgb(61 61 61)" }}>
              프로젝트 상세 정보
            </h4>
            {/* <h4 className="info-head3" style={{ color: 'rgb(44, 117, 70)' }}>
                프로젝트 정보
              </h4>
              <h4 className="info-head2" style={{ color: 'rgb(44, 117, 70)' }}>
                서버 정보
              </h4> */}
          </div>
        </div>

        <div className="card cardpd info-engl-new englcard1">
          <div className="card-body info-engl-new3 engl-prolistcus">
            <div className="col-12">
              <div className="form-group mb-3 req-info head-info">
                <div className="request-user">회사명</div>
                <p
                  className="infoUser-answer request-user2"
                  style={{ margin: "0" }}
                >
                  {info.CUS_COMPANY_NAME}
                </p>
              </div>
            </div>

            <div className="col-12">
              <div className="form-group mb-3 req-info">
                <div className="request-user">대표자명</div>
                <p className="infoUser-answer request-user2">{info.CUS_BOSS}</p>
              </div>

              <div className="col-12">
                <div className="form-group mb-3 req-info">
                  <div className="request-user">회사 전화번호</div>
                  <p className="infoUser-answer request-user2">
                    {info.CUS_COMPANY_PH}
                  </p>
                </div>
              </div>

              <div className="col-12">
                <div className="form-group mb-3 req-info">
                  <div className="request-user">사업자 등록번호</div>
                  <p className="infoUser-answer request-user2">
                    {info.CUS_BUSINESS_ID}
                  </p>
                </div>
              </div>

              <div className="col-12">
                <div className="form-group mb-3 req-info">
                  <div className="request-user">사업자 주소</div>
                  <p className="infoUser-answer request-user2">
                    {info.CUS_POSTAL_CODE}
                  </p>
                  <p className="infoUser-answer request-user2">
                    {info.CUS_ADDRESS1} {info.CUS_ADDRESS2}
                  </p>
                </div>
              </div>

              <div className="col-12">
                <div className="form-group mb-3 req-info">
                  <div className="request-user">계약기간</div>
                  <p className="infoUser-answer request-user2">
                    {info.PRO_STARTDATE}~
                  </p>
                </div>
              </div>

              <div className="col-12">
                <div className="form-group mb-3 req-info">
                  <div className="request-user">담당자</div>
                  <p className="infoUser-answer request-user2">
                    {info.CUS_MANAGET_NAME}
                  </p>
                </div>
              </div>

              <div className="col-12">
                <div className="form-group mb-3 req-info">
                  <div className="request-user">담당자 연락처</div>
                  <p className="infoUser-answer request-user2">
                    {info.CUS_PHONE_NUMBER}
                  </p>
                </div>
              </div>

              <div className="col-12">
                <div className="form-group mb-3 req-info">
                  <div className="request-user">담당자 이메일</div>
                  <p className="infoUser-answer request-user2">
                    {info.CUS_EMAIL}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-body info-engl-new3 right-engl-new">
            <div className="col-12">
              <div className="form-group mb-3 req-info">
                <div className="request-user">프로젝트명</div>
                <p
                  className="infoUser-answer request-user2"
                  style={{ margin: "0" }}
                >
                  {info.PRO_NAME}
                </p>
              </div>
            </div>

            <div className="col-12">
              <div className="form-group mb-3 req-info">
                <div className="request-user">프로젝트 시작일</div>
                <p className="infoUser-answer request-user2">
                  {info.PRO_STARTDATE}
                </p>
              </div>

              <div className="col-12">
                <div className="form-group mb-3 req-info">
                  <div className="request-user">프로젝트 종료일</div>
                  <p className="infoUser-answer request-user2">
                    {info.PRO_ENDDATE}
                  </p>
                </div>
              </div>

              <div className="col-12">
                <div className="form-group mb-3 req-info">
                  <div className="request-user">프로젝트 담당자</div>
                  <p className="infoUser-answer request-user2">
                    {info.PRO_REP}
                  </p>
                </div>
              </div>

              <div className="col-12">
                <div className="form-group mb-3 req-info">
                  <div className="request-user">요청 정기점검일</div>
                  <p className="infoUser-answer request-user2">{info.PRO_PI}</p>
                </div>
              </div>

              <div className="col-12">
                <div className="form-group mb-3 req-info">
                  <div className="request-user">프로젝트 정보</div>
                  <p className="infoUser-answer request-user2">
                    {info.PRO_INFO}~
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="col-12">
            <div className="server-tab ser-tab1">
              <table className="ser-tab">
                <thead>
                  <tr>
                    <th>서버 이름</th>
                    <th>아이피주소</th>
                    <th>운영체제</th>
                    <th>cpu정보</th>
                    <th>ram용량</th>
                    <th>디스크용량</th>
                    <th>담당엔지니어</th>
                    <th>작업내역</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((data, key) => (
                    <tr key={key}>
                      <td>{data.server_name}</td>
                      <td>{data.ip_address}</td>
                      <td>{data.operating_system}</td>
                      <td>{data.cpu}</td>
                      <td>{data.ram} GB</td>
                      <td>{data.disk_capacitygb} GB</td>
                      <td>
                        {data.eng_enid ? (
                          data.eng_name // 데이터가 있으면
                        ) : (
                          <EnglTeamassign
                            pro_id={info.PRO_ID}
                            server_id={data.server_id}
                            check={false}
                          />
                        )}
                      </td>
                      <td>
                        {data.eng_enid ? (
                          <Link
                            className="toworkinfobtn"
                            to={{
                              pathname: `/engineerleader/workinfo/${data.server_id}`,
                            }}
                          >
                            <button>내역확인</button>{" "}
                          </Link> // 데이터가 있으면
                        ) : (
                          "X"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EnglProjectDetail;
