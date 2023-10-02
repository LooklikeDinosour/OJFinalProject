import { useEffect, useState } from "react";
import "../enMain/EnMain.css";

import "../enMain/EnTeam.css";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

function EnL_newProjectDetail() {
  //쿼리파라미터 값

  const { pro_id } = useParams();

  const location = useLocation();
  const [list, setList] = useState([]);
  // console.log(location);

  // const pageDetail = async () => {
  //   const response = await
  // };

  useEffect(() => {
    axios
      .get(`http://43.201.243.223:8888/api/main/engineer/newProjectDetail/${pro_id}`)
      .then((response) => {
        console.log(response.data);
        setList(response.data.list);
      })
      .catch((err) => {
        console.log("에러" + err);
      });
  }, []);

  return (
    <>
      <div className="page-wrapper">
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-7 align-self-center">
              <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
                프로젝트 세부
              </h4>
            </div>
          </div>
        </div>

        <div className="container-fluid ">
          <div className="row">
            <div className="col-12">
              <div className="card1">
                <div className="card-body">
                  <div className="form-body">
                    <div className="row">
                      <div className="col-md-2">
                        <div className="form-group mb-3">
                          <div className="infoUser">회사명</div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <p className="infoUser-answer">
                            {location.state.project.cus_company_name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-2">
                        <div className="form-group mb-3">
                          <div className="infoUser">대표자명</div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <p className="infoUser-answer">
                            {location.state.project.cus_boss}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-2">
                        <div className="form-group mb-3">
                          <div className="infoUser">회사 전화번호</div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <p className="infoUser-answer">
                            {location.state.project.cus_company_ph}
                          </p>
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
                          <p className="infoUser-answer">
                            {location.state.project.cus_business_id}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-2">
                        <div className="form-group mb-3">
                          <div className="infoUser">사업자 주소
                          </div>
                        </div>
                      </div>

                      <div className="col-md-2 col-md-2-1 wid2">
                        <div className="form-group mb-3">
                          <p className="infoUser-answer">
                            {location.state.project.cus_address1}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <p className="infoUser-answer">
                            {location.state.project.cus_address2}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="form-group mb-3">
                          <div className="infoUser">계약기간
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-4">
                        <div>
                          <div className="form-group">
                            <p className="infoUser-answer">
                              {location.state.project.pro_startdate} -{" "}
                              {location.state.project.pro_enddate}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-2">
                          <div className="form-group mb-3">
                            <div className="infoUser">정기점검일</div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group mb-3">
                            <p className="infoUser-answer">
                              {location.state.project.pro_pi}
                            </p>
                          </div>
                        </div>
                      </div>

                      
                      <div className="row">
                        <div className="col-md-2">
                          <div className="form-group mb-3">
                            <div className="infoUser">담당자</div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group mb-3">
                            <p className="infoUser-answer">
                              {location.state.project.pro_rep}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-2">
                          <div className="form-group mb-3">
                            <div className="infoUser">담당자 연락처</div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group mb-3">
                            <p className="infoUser-answer">
                              {location.state.project.cus_phone_number}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-md-2">
                          <div className="form-group mb-3">
                            <div className="infoUser">담당자 이메일</div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group mb-3">
                            <p className="infoUser-answer">
                              {location.state.project.cus_email}
                            </p>
                          </div>
                        </div>

                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="col-12">
            <div
              className="server-tab ser-tab1"
              style={{ marginTop: "-170px" }}
            >
              <table className="ser-tab">
                <thead>
                  <tr>
                    <th>서버 이름</th>
                    <th>아이피주소</th>
                    <th>운영체제</th>
                    <th>cpu정보</th>
                    <th>ram용량</th>
                    <th>디스크용량</th>
                   
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

export default EnL_newProjectDetail;