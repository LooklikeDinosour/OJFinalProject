import { Route, Router, Routes, useLocation } from "react-router-dom";
import EnMain from "./enMain/EnMain";
import HeaderFooterAd from "./component/HeaderFooterAd";
import HeaderFooterUs from "./component/HeaderFooterUs";

import HeaderFooterEn from "./component/HeaderFooterEn";

import Main from "./main/Main";
import MainInfo from "./main/MainInfo";

import UserApply from "./userMain/UserApply";
import UserInQurylist from "./userMain/UserInQurylist";
import UserAnnoList from "./userMain/UserAnnoList";

import UserProjectDetailList from "./userMain/UserProjectDetailList";
import UserProjectDetailModal from "./userMain/UserProjectDetailModal";
import UserProjectDetailModal2 from "./userMain/UserProjectDetailModal2";

import EnEngineerList from "./enMain/EnEngineerList";
import Login_join from "./main/Login_join";
import EnCalendar from "./enMain/EnCalendar";

import MainUser from "./userMain/MainUser";
import "./userMain/client-main-pro.css";

import NoticeWrite from "./adminMain/NoticeWrite";
import UserInQuryWrite from "./userMain/UserInQuryWrite";
import UserInQuryDetail from "./userMain/UserInQuryDetail";

import MainAdmin from "./adminMain/MainAdmin";
import EnAnnoList from "./enMain/EnAnnoList";
import EnInQuryDetail from "./enMain/EnInQuryDetail";
import EnInQuryWrite from "./enMain/EnInQuryWrite";
import EnInQurylist from "./enMain/EnInQurylist";
import AdminInQurylist from "./adminMain/AdminInQurylist";
import AdminInQuryDetail from "./adminMain/AdminInQuryDetail";
import AdminAnnoList from "./adminMain/AdminAnnoList";
import EnAnnoDetail from "./enMain/EnAnnoDetail";
import AdminAnnoDetail from "./adminMain/AdminAnnoDetail";
import UserAnnoDetail from "./userMain/UserAnnoDetail";
import ProjectDetail from "./adminMain/ProjectDetail";

import AdUserList from "./adminMain/AdUserList";
import AdProjectList from "./adminMain/AdProjectList";
import EnWorkDetail from "./enMain/EnWorkDetail";

import EnInspectionList from "./enMain/EnInspectionList";

import EnL_newProject from "./enMain/EnL_newProject";
import EnL_newProjectDetail from "./enMain/EnL_newProjectDetail";
import EnL_TeamassingmentModal from "./enMain/EnL_TeamassginmentModal";
import base64 from "base-64";
import UserProList from "./userMain/UserProList";
import UserDetailPro from "./userMain/UserDetailPro";
import PrivateRoute from "./checkRole/PrivateRoute";
import PrivateRouteAd from "./checkRole/PrivateRouteAd";
import PrivateRouteEn from "./checkRole/PrivateRouteEn";
import PrivateRouteMa from "./checkRole/PrivateRouteMa";
import PrivateRouteLogin from "./checkRole/PrivateRouteLogin";
import { useEffect, useState } from "react";
import axios from "axios";

import PrivateRouteEnl from "./checkRole/PrivateRouteEnl";
import HeaderFooterEnl from "./component/HeaderFooterEnl";
import EngLeadMain from "./engineerLeader/EngLeadMain";
import RequestDetail from "./engineerLeader/RequestDetail";
import EnglProjectList from "./engineerLeader/EnglProjectList";
import EnglProjectDetail from "./engineerLeader/ProjectDetail";
import EnglWorkInfo from "./engineerLeader/EnglWorkInfo";
import EnglClientList from "./engineerLeader/EnglClientList";
import EnglEngineerList from "./engineerLeader/EnglEngineerList";
import EnglClientDetail from "./engineerLeader/EnglClientDetail";
import EnglEngDetail from "./engineerLeader/EnglEngDetail";
import EnglAllSchedule from "./engineerLeader/EnglAllSchedule";

import EnLeaderAnnoDetail from "./engineerLeader/EnLeaderAnnoDetail";
import EnLeaderAnnoList from "./engineerLeader/EnLeaderAnnoList";
import EnLeaderInQurylist from "./engineerLeader/EnLeaderInQurylist";
import EnLeaderInQuryWrite from "./engineerLeader/EnLeaderInQuryWrite";
import EnLeaderInQuryDetail from "./engineerLeader/EnLeaderInQuryDetail";

import EnglInsRequestList from "./engineerLeader/EnglInsRequestList";

import AdminproModal from "./adminMain/AdminproModal";


import ProjectDetailChart from "./userMain/ProjectDetailChart";

import AdEngineerList from "./adminMain/AdEngineerList";
import InspectionList from "./enMain/InspectionList";
import EnEngDetail from "./enMain/Calendar";


function App() {

  
  const location = useLocation();

  const token = localStorage.getItem("token");
  const [info, setInfo] = useState({});
  
  function checkPermission() {
    if (!token) {
      return null;
    }
    let payload = token.substring(
      token.indexOf(".") + 1,
      token.lastIndexOf(".")
    );
    let dec = JSON.parse(base64.decode(payload));
    if (dec == null) {
      return;
    }
    return dec;
  }


  const Info = async () => {
    if (checkPermission() == null) {
        setInfo({})
      return;
    }
    if (checkPermission().role === "ROLE_USER") {
      const cus_id = checkPermission().sub;
      const response1 = await axios.get(`http://13.209.147.231:8888/api/main/getInfo?cus_id=${cus_id}`);
      setInfo(response1.data);
    }
    if (checkPermission().role === "ROLE_ENGINEER") {
      const eng_id = checkPermission().sub;
      const response2 = await axios.get(`http://13.209.147.231:8888/api/main/getInfoEng?eng_id=${eng_id}`);
      setInfo(response2.data);
    }
    if (checkPermission().role === "ROLE_ENGLEADER") {
      const engL_id = checkPermission().sub;
      //const response3 = await axios.get(`/api/main/getInfoEngL?engL_id=${engL_id}`);
      //setInfo(response3.data);
    }

    return;
  };

  useEffect(() => {
    Info();
  }, []);

  const token2 = localStorage.getItem("token");
  const [userId,setUserId] = useState('');
  useEffect(()=>{
      
      const permission = checkPermission(); 
      if(permission!==null){
        const id = permission.sub;
        setUserId(id);
      }
  },[token2])


  return (
    <Routes>
      <Route element={<PrivateRouteMa />}>
        <Route element={<Main />}>
          <Route path="/" element={<MainInfo />} />
        </Route>
      </Route>
      <Route
        element={<PrivateRouteLogin checkPermission={checkPermission()} />}
      >
        <Route path="/login_join" element={<Login_join />} />
      </Route>

      <Route element={<PrivateRouteEn checkPermission={checkPermission()} />}>
        <Route
          element={
            <HeaderFooterEn checkPermission={checkPermission()} state={info} userId={userId} />
          }
        >
          {/* 엔지니어 페이지 */}

          <Route
            path="/engineer"
            element={
              <EnMain checkPermission={checkPermission()} state={info} />
            }
          />

          <Route
            path='/engineer/engDetail/:eng_enid'
            element={<EnEngDetail checkPermission={checkPermission()} />}
          />
          <Route
            path="/engineer/engineerList"
            element={<EnEngineerList checkPermission={checkPermission()} />}
          />
          <Route
            path="/engineer/inQurylist"
            element={<EnInQurylist checkPermission={checkPermission()} />}
          />
          <Route
            path="/engineer/inQurywrite"
            element={<EnInQuryWrite checkPermission={checkPermission()} />}
          />
          <Route
            path="/engineer/inQuryDetail"
            element={<EnInQuryDetail checkPermission={checkPermission()} />}
          />
          <Route
            path="/engineer/annoList"
            element={<EnAnnoList checkPermission={checkPermission()} />}
          />
          <Route
            path="/engineer/annoDetail"
            element={<EnAnnoDetail checkPermission={checkPermission()} />}
          />

          <Route
            path="/engineer/inspectionList"
            element={<InspectionList checkPermission={checkPermission()} />}
          />

          <Route
            path="/engineer/workDetail"
            element={<EnWorkDetail checkPermission={checkPermission()} />}
          />

          <Route
            path="/engineer/newList"
            element={<EnL_newProject checkPermission={checkPermission()} />}
          />
          <Route
            path="/engineer/newProjectDetail/:pro_id"
            element={
              <EnL_newProjectDetail checkPermission={checkPermission()} />
            }
          />
          <Route
            path="/engineer/newProjectDetail2"
            element={
              <EnL_TeamassingmentModal checkPermission={checkPermission()} />
            }
          />
        </Route>
      </Route>
      {/* $ npm install react-js-pagination */}

      <Route element={<PrivateRouteEnl checkPermission={checkPermission()} />} >
        < Route element={<HeaderFooterEnl checkPermission={checkPermission()} userId={userId} />}>
          <Route path='/engineerleader' element={<EngLeadMain userId={userId}/>} />
          <Route path='/engineerleader/requestDetail/:pro_id' element={<RequestDetail userId={userId}/>} />
          <Route path='/engineerleader/projectList' element={<EnglProjectList userId={userId}/>} />
          <Route path='/engineerleader/projectDetail/:pro_id' checkPermission={checkPermission()} element={<EnglProjectDetail userId={userId} />} />
          <Route path='/engineerleader/workinfo/:server_id' element={<EnglWorkInfo userId={userId} />} />
          <Route path='/engineerleader/clientList' element={<EnglClientList userId={userId}/>} />
          <Route path='/engineerleader/engineerList' element={<EnglEngineerList userId={userId}/>} />
          <Route path='/engineerleader/clientDetail/:cus_id' element={<EnglClientDetail userId={userId}/>} />
          <Route path='/engineerleader/engDetail/:eng_enid' element={<EnglEngDetail/>}userId={userId} />
          <Route path='/engineerleader/allSchedule' element={<EnglAllSchedule userId={userId}/>}/>  
          {/* 이예지 점검 요청 목록 추가 */}
          <Route path='/engineerleader/insRequestList' element={<EnglInsRequestList userId={userId}/>} />       
          {/* 백승용 추가 사항~!~!!~! */}
          <Route path='/engineerleader/annoList' element={<EnLeaderAnnoList checkPermission={checkPermission()}/>} />
          <Route path='/engineerleader/annoDetail' element={<EnLeaderAnnoDetail checkPermission={checkPermission()}/>} />
          <Route path='/engineerleader/inQuryDetail' element={<EnLeaderInQuryDetail checkPermission={checkPermission()}/>} />
          <Route path='/engineerleader/inQurylist' element={<EnLeaderInQurylist checkPermission={checkPermission()}/>} />
          <Route path='/engineerleader/inQurywrite' element={<EnLeaderInQuryWrite checkPermission={checkPermission()}/>} />
           {/* 여기까지!@~!!~~~@#!~ */}

          {/* <Route path='/engineerleader/engDetail/:eng_enid' element={<EnglEngCalendar/>}/> */}
        </Route>
      </Route>


      <Route element={<PrivateRoute checkPermission={checkPermission()} />}>

        <Route element={ <HeaderFooterUs checkPermission={checkPermission()} state={info}  userId={userId}/> } >

          <Route path="/user" element={<MainUser state={info} userId={userId}/>} />
          <Route path="/user/list" element={<UserProList checkPermission={checkPermission()} state={info} userId={userId}/>} />
          <Route path="/user/apply" element={<UserApply checkPermission={checkPermission()} state={info} userId={userId}/>} />
          <Route path="/user/inQurylist" element={<UserInQurylist checkPermission={checkPermission()}  />} />
          <Route path="/user/inQurywrite" element={<UserInQuryWrite checkPermission={checkPermission()} />} />
          <Route  path="/user/inQuryDetail" element={<UserInQuryDetail checkPermission={checkPermission()} />}/>
          <Route path="/user/annoList" element={<UserAnnoList checkPermission={checkPermission()} />}/>
          <Route path="/user/annoDetail" element={<UserAnnoDetail checkPermission={checkPermission()} />}/>
          <Route path="/user/prodetail/:pro_id" element={<UserDetailPro checkPermission={checkPermission()} />}/>
          <Route path="/user/projectDetailList" element={ <UserProjectDetailList checkPermission={checkPermission()} info={info} /> } />
          <Route path="/user/projectDetail"  element={ <UserProjectDetailModal checkPermission={checkPermission()} />}/>
          <Route path="/user/projectDetail2" element={<UserProjectDetailModal2 checkPermission={checkPermission()} />}/>
        </Route>
      </Route>

      <Route element={<PrivateRouteAd checkPermission={checkPermission()} />}>
        <Route element={<HeaderFooterAd checkPermission={checkPermission()} userId={userId} />}>
          {/* 관리자 페이지; */}
          <Route  path="/admin" element={<MainAdmin checkPermission={checkPermission()} userId={userId}/>} />
          <Route path="/admin/noticeWrite" element={<NoticeWrite checkPermission={checkPermission()} />} />
          <Route path="/admin/projectDetail/:pro_id" element={<ProjectDetail checkPermission={checkPermission()} />}/>
          <Route path="/admin/inQurylist" element={<AdminInQurylist checkPermission={checkPermission()} />}/>
          <Route path="/admin/inQuryDetail" element={<AdminInQuryDetail checkPermission={checkPermission()} />} />
          <Route path="/admin/annoList" element={<AdminAnnoList checkPermission={checkPermission()} />}/>
          <Route path="/admin/annoDetail" element={<AdminAnnoDetail checkPermission={checkPermission()} />}/>
          <Route path="/admin/userList" element={<AdUserList checkPermission={checkPermission()} />}/>
          <Route  path="/admin/projectList" element={<AdProjectList checkPermission={checkPermission()} />}/>
          <Route  path="/admin/engineerList" element={<AdEngineerList checkPermission={checkPermission()} />}/>
          <Route path="/admin/adminProModal" element={<AdminproModal checkPermission={checkPermission()} />}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
