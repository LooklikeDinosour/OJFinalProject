import { useEffect, useState } from 'react';
import './Login_join.css'
import { Link, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import GoBack from '../img/GoBack';
import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';
import base64 from 'base-64';
import axios from "axios";
import "./Modal.css";
import {SHA256} from 'crypto-js';
function Login_join(props) {

    const [obj, setObj] = useSearchParams();
    const [bellModal, setbellModalIsOpen] = useState(false);

    useEffect(() => {

        const container = document.getElementById('container');
        setTimeout(() => {

            if (obj === null) {
                return;
            }
            if (obj.get("class") === "sing-in") {
                container.classList.toggle('sign-in');
            } else {
                container.classList.toggle('sign-up');
            }
        }, 200)
    }, [])
    const toggle = () => {
        setFormData({
            cus_id: '',
            cus_pw: '',
            cus_pw_check: '',
            cus_company_name: '',
            cus_postal_code: '',
            cus_address1: '',
            cus_address2: '',
            cus_managet_name: '',
            cus_phone_number: '',
            cus_email: '',
            cus_business_id: '',
            cus_boss: '',
            cus_company_ph: ''
        });
        setSingIn({
            username: '',
            password: '',
        })
        setLoginS(false)
        const container = document.getElementById('container');
        container.classList.toggle('sign-in');
        container.classList.toggle('sign-up');
    };
    const idSearch = () => {
        setEmailCf("")
        setEmailCfErr("")
        setIdGetCus("")
        setIdIn({
            cus_managet_name: '',
            cus_email: '',
            emailNum: '',
            cus_business_id: '',
            cus_id: '',
        });
        const searchId = document.getElementById('seachId');
        const searchPw = document.getElementById('seachPw');
        const singIn = document.getElementById('singIn');
        searchId.style.transform = 'scale(1)'
        searchPw.style.transform = 'scale(0)';
        singIn.style.transform = 'scale(0)';
        singIn.style.transition = '.7s ease-in-out';
        searchId.style.transition = '.7s ease-in-out';
        searchPw.style.transition = '.7s ease-in-out';
    }

    const pwSearch = () => {
        setEmailCf("")
        setEmailCfErr("")
        setIdGetCus("")
        setIdIn({
            cus_managet_name: '',
            cus_email: '',
            emailNum: '',
            cus_business_id: '',
            cus_id: '',
        });
        const searchId = document.getElementById('seachId');
        const searchPw = document.getElementById('seachPw');
        const singIn = document.getElementById('singIn');
        searchId.style.transform = 'scale(0)';
        singIn.style.transform = 'scale(0)';
        searchPw.style.transform = 'scale(1)';
        singIn.style.transition = '.7s ease-in-out';
        searchId.style.transition = '.7s ease-in-out';
        searchPw.style.transition = '.7s ease-in-out';
    }

    const [formData, setFormData] = useState({
        cus_id: '',
        cus_pw: '',
        cus_pw_check: '',
        cus_company_name: '',
        cus_postal_code: '',
        cus_address1: '',
        cus_address2: '',
        cus_managet_name: '',
        cus_phone_number: '',
        cus_email: '',
        cus_business_id: '',
        cus_boss: '',
        cus_company_ph: ''
    });
    const [errForm, setErrForm] = useState({
        cus_id: '',
        cus_pw: '',
        cus_pw_check: '',
        cus_company_name: '',
        cus_postal_code: '',
        cus_address1: '',
        cus_address2: '',
        cus_managet_name: '',
        cus_phone_number: '',
        cus_email: '',
        cus_business_id: '',
        cus_boss: '',
        cus_company_ph: ''
    });
    const handleChange = (e) => {
        const copy = { ...formData, [e.target.name]: e.target.value };

        setFormData(copy);
        const copy1 = { ...errForm, [e.target.name]: '' }
        setErrForm(copy1)
    }
    // const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [extraAddress, setExtraAddress] = useState('');
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';
        const { addressType, bname, buildingName } = data
        if (addressType === 'R') {
            if (bname !== '') {
                extraAddress += bname;
            }
            if (buildingName !== '') {
                extraAddress += `${extraAddress !== '' && ', '}${buildingName}`;
            }
            fullAddress += `${extraAddress !== '' ? ` ${extraAddress}` : ''}`;
        }
        //fullAddress -> 전체 주소반환
        setAddress(fullAddress);
        setExtraAddress(data.zonecode);
        const copy = { ...formData, cus_postal_code: data.zonecode, cus_address1: fullAddress };
        setFormData(copy)
        setbellModalIsOpen(false)
    }
    const [loginS, setLoginS] = useState(false);
    const [loginGo, setLoginGo] = useState(false);
    // 로그인 버튼+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const handleLogin = async () => {
        const id_check = document.querySelector("#id_check");
        const businessCh = document.querySelector("#businessCh");
        const email_check = document.querySelector("#email_check")
        if (id_check.value === '중복확인') {
            setCheck({ id_check: '중복체크 해주세요' })
            return;
        }
        if (businessCh.value === '인증하기') {
            setBusinessCh({ error: '인증 해주세요' })
            return;
        }
        if (email_check.value == "중복확인") {
            setEmailMassage("이메일 인증을 해주세요")
            return;
        }
        const data = formData
        const response = await axios.post("http://43.201.243.223:8888/api/main/sing-up", data)
        setErrForm({
            cus_id: response.data.cus_id,
            cus_pw: response.data.cus_pw,
            cus_pw_check: response.data.cus_pw_check,
            cus_company_name: response.data.cus_company_name,
            cus_postal_code: response.data.cus_postal_code,
            cus_address1: response.data.cus_address1,
            cus_address2: response.data.cus_address2,
            cus_managet_name: response.data.cus_managet_name,
            cus_phone_number: response.data.cus_phone_number,
            cus_email: response.data.cus_email,
            cus_business_id: response.data.cus_business_id,
            cus_boss: response.data.cus_boss,
            cus_company_ph: response.data.cus_company_ph
        })
      
        if (response.data === '잘못된 접근 입니다.') {
            alert(response.data)
        } else if (response.data === '로그인 성공') {
            setLoginS(true)
        }
    }
    const myFunction = async () => {
        const cus_pw = document.querySelector(".cus_pw");
        const cus_pw_check = document.querySelector(".cus_pw_check");
        if (cus_pw.value === '') {
            return;
        }
        cus_pw_check.readOnly = false;
        const check = {
            'cus_pw_check': cus_pw_check.value,
            'cus_pw': cus_pw.value
        };
        const response = await axios.post('http://43.201.243.223:8888/api/main/pw_check', check);
        setPwCheck({ pw_check: response.data.pw_check })
    }
    const [check, setCheck] = useState({
        id_check: '',
        id_massage: '중복확인',

    })
    const [emailCheckM, setEmailCheckM] = useState({
        email_check: '',
        email_massage: '중복확인',

    })
    const [pw_check, setPwCheck] = useState({
        pw_check: ''
    })
    const pwCheck = async () => {
        const cus_pw = document.querySelector(".cus_pw");
        const cus_pw_check = document.querySelector(".cus_pw_check");
        if (cus_pw_check.value === '' || cus_pw.value === '') {
            return;
        }
        const check = {
            'cus_pw_check': cus_pw_check.value,
            'cus_pw': cus_pw.value
        };
        const response = await axios.post('http://43.201.243.223:8888/api/main/pw_check', check);
        setPwCheck({ pw_check: response.data.pw_check })
    }
    const idhandleChange = (e) => {
        const copy = { ...formData, [e.target.name]: e.target.value };
        setCheck({ id_massage: '중복확인' })
        setFormData(copy);
        const copy1 = { ...errForm, [e.target.name]: '' }
        setErrForm(copy1)
    }
    const idCheck = async (e) => {
        const cus_id = { "cus_id": document.querySelector("#cus_id").value };
        const response = await axios.post("http://43.201.243.223:8888/api/main/idCheck", cus_id)
        if (response.data.message !== undefined) {
            const copy = { ...check, id_massage: response.data.message }
            setCheck(copy)
            return;
        }
        const copy = { ...check, id_check: response.data.error }
        setCheck(copy)
    }
    const [emailMassage, setEmailMassage] = useState('');
    //이메일 중복 검사

    const emailhandleChange = (e) => {
        const copy = { ...formData, [e.target.name]: e.target.value };
        setEmailCheckM({ email_massage: '중복확인' })
        setFormData(copy);

        setEmailMassage('')
    }
    const cusEmailCheck = async (e) => {
        console.log(document.querySelector("#cus_email").value)
        try {

            const cus_email = { "cus_email": document.querySelector("#cus_email").value };
            const response = await axios.post("http://43.201.243.223:8888/api/main/EmailCheck", cus_email)
            setEmailMassage(response.data)
            const copy = { ...check, email_massage: "이메일 사용 가능" }
            setEmailCheckM(copy)
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setEmailMassage(error.response.data)
                const copy = { ...check, email_massage: "중복 확인" }
                setEmailCheckM(copy)
            } else {
                console.error(error)
            }
        }
    }
    //사업자 등록번호 확인
    const [businessCh, setBusinessCh] = useState({
        error: '',
        message: '인증하기'
    })
    const businessCheck = async () => {
        const cus_business_id = { "cus_business_id": document.querySelector("#cus_business_id").value };
        const response = await axios.post("http://43.201.243.223:8888/api/main/businessCheck", cus_business_id)
        if (response.data.message !== undefined) {
            const copy = { ...businessCh, message: response.data.message, error: '' }
            setBusinessCh(copy)
            return;
        }
        const copy = { ...businessCh, message: "인증하기", error: response.data.error }
        setBusinessCh(copy)
    }
    const buhandleChange = (e) => {
        const copy = { ...formData, [e.target.name]: e.target.value };
        setBusinessCh({ message: "인증하기" })
        setFormData(copy);
        const copy1 = { ...errForm, [e.target.name]: '' }
        setErrForm(copy1)
    }
    const [singIn, setSingIn] = useState({
        username: '',
        password: '',
    })
    const handleSingInChange = (e) => {
        setSingIn({
            ...singIn,
            [e.target.name]: e.target.value
        })
    }
    const [message, setMessage] = useState('');
    const history = useNavigate();
    const handleSingIn = async (e) => {
        try {
            const response = await axios.post('http://43.201.243.223:8888/api/main/login', singIn);

            if (response.status == 200) {


                localStorage.setItem('token', response.data);

                const token = localStorage.getItem('token');
                let payload = token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'));
                let dec = JSON.parse(base64.decode(payload));


                if (dec.role === 'ROLE_USER') {
                    history('/user', {
                        state: {
                            role: 'ROLE_USER'
                        }
                    });

                    window.location.reload();

                    
                } else if (dec.role === 'ROLE_ENGINEER') {

                    history('/engineer', {
                        state: {
                            role: 'ROLE_ENGINEER'
                        }
                    });
                    window.location.reload();
                } else if (dec.role === 'ROLE_ADMIN') {
                    history('/admin', {
                        state: {
                            role: 'ROLE_ADMIN'
                        }
                    });
                    window.location.reload();
                } else if (dec.role === "ROLE_ENGLEADER") {
                    history('/engineerleader', {
                        state: {
                            role: 'ROLE_ENGLEADER'
                        }
                    });
                    window.location.reload();
                }
            } else {
                // 로그인 실패한 경우
                // response.data에 서버에서 반환한 메시지가 들어있습니다.\
                console.log(response)
                alert(response.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Bad Request 응답을 받은 경우
                // error.response.data에 서버에서 반환한 메시지가 들어있습니다.
                setMessage(error.response.data)
            } else {
                // 다른 오류인 경우 처리
                console.error(error);
            }
        }
    }
    const [idIn, setIdIn] = useState({
        cus_managet_name: '',
        cus_email: '',
        emailNum: '',
        cus_business_id: '',
        cus_id: '',
    });
    const [emailCf, setEmailCf] = useState('')
    const [emailCfErr, setEmailCfErr] = useState('')
    const eamilInput = (e) => {
        setIdGetCus("")
        const copy = { ...idIn, [e.target.name]: e.target.value }
        setIdIn(copy)
    }
    const emailCheck = async () => {
        try {

            const response = await axios.post("http://43.201.243.223:8888/api/main/emailCheck", idIn)
            console.log(response.data)
            if (response.data == "ok") {
                setEmailCf("인증번호가 발송되었습니다.")
                setEmailCfErr("")
                const email = idIn.cus_email;
                const response = await axios.post("http://43.201.243.223:8888/api/main/emailSend", { email })
            } else {
                // 로그인 실패한 경우
                // response.data에 서버에서 반환한 메시지가 들어있습니다.\
                console.log(response)
                alert(response.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setEmailCfErr(error.response.data)
                setEmailCf("")
            } else {
                console.error(error)
            }
        }
    }
    const emailPwCheck = async () => {
        try {

            const response = await axios.post("http://43.201.243.223:8888/api/main/emailPwCheck", idIn)
            console.log(response.data)
            if (response.data == "ok") {
                setEmailCf("인증번호가 발송되었습니다.")
                setEmailCfErr("")
                const email = idIn.cus_email;
                const response = await axios.post("http://43.201.243.223:8888/api/main/emailSend", { email })
            } else {
                // 로그인 실패한 경우
                // response.data에 서버에서 반환한 메시지가 들어있습니다.\
                console.log(response)
                alert(response.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setEmailCfErr(error.response.data)
                setEmailCf("")
            } else {
                console.error(error)
            }
        }
    }
    const [idGetCus, setIdGetCus] = useState('');
    const idGet = async () => {//아이디 찾기 버튼~!~!
        try {

            const response = await axios.post("http://43.201.243.223:8888/api/main/idGet", idIn)
            setIdGetCus(response.data);
            setEmailCf("")
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setIdGetCus(error.response.data);
            } else {
                console.error(error)
            }
        }
    }

    const pwReset = async () => {
        try {
            const response = await axios.post("http://43.201.243.223:8888/api/main/PwReset", idIn)
            if (response.data === 'ok') {

                const seachPw = document.getElementById('seachPw');
                const pwView = document.querySelector('.pwReset');
                const searchPw = document.querySelector('.searchPw');
                pwView.classList.toggle('pwView')
                searchPw.classList.toggle('pwView')
                seachPw.style.height = "250px";
                seachPw.style.transition = '.3s ease-in-out';
            }
        } catch (error) {
            if (error.response && error.response.status == 400) {

                setIdGetCus(error.response.data)
            }


        }
    }

    const CheckLoginGo=()=>{
        setIdIn({
            cus_managet_name: '',
            cus_email: '',
            emailNum: '',
            cus_business_id: '',
            cus_id: '',
        });
        const searchId = document.getElementById('seachId');
        const searchPw = document.getElementById('seachPw');
        const singIn = document.getElementById('singIn');
        searchId.style.transform = 'scale(0)';
        singIn.style.transform = 'scale(1)';
        searchPw.style.transform = 'scale(0)';
        singIn.style.transition = '.7s ease-in-out';
        searchId.style.transition = '.7s ease-in-out';
        searchPw.style.transition = '.7s ease-in-out';
    }
    const CheckLogin = async () => {
        try{
            const response = await axios.post('http://43.201.243.223:8888/api/main/pw_check', formData);
            if(response.data.pw_check!==""){
                
                console.log(response.data)
                setPwCheck({ pw_check: response.data.pw_check })
                return;
            }

        }catch(error){
            if (error.response && error.response.status == 400) {

                setIdGetCus(error.response.data)
            }
        }


        try {
            
        const copy={...formData,cus_id:idIn.cus_id};
         
        const response = await axios.post("http://43.201.243.223:8888/api/main/passwordReset", copy)
        console.log(response.data)
        if(response.data==='ok'){
            setLoginGo(true)
        }

    } catch (error) {
        if (error.response && error.response.status == 400) {
            console.log(error.response.data)
            setIdGetCus(error.response.data)
        }
    }
    }
    const CheckLoginGoGo=()=>{
        setLoginGo(false)
        const searchId = document.getElementById('seachId');
        const seachPw = document.getElementById('seachPw');
        const singIn = document.getElementById('singIn');
        const pwView = document.querySelector('.pwReset');
        const searchPw = document.querySelector('.searchPw');
        searchPw.classList.toggle('pwView')
        pwView.classList.toggle('pwView')
        singIn.style.transform = 'scale(1)';
        searchId.style.transform = 'scale(0)'
        seachPw.style.transform = 'scale(0)';
        seachPw.style.height = "400px";
        singIn.style.transition = '.7s ease-in-out';
        searchId.style.transition = '.7s ease-in-out';
        seachPw.style.transition = '.7s ease-in-out';
        
    }
    const handleEnterKeyPress = (event) => {
        if (event.key === 'Enter') {
          // Enter 키를 눌렀을 때 실행할 동작을 여기에 추가
          // 예를 들어, 버튼 클릭 함수를 호출할 수 있습니다.
          handleSingIn();
        }
      };
      const adminSingIn=async()=>{
        const adminSingIn={
            username: 'cloud200',
            password: 'cloud200!',
        }
        const response = await axios.post('http://13.124.230.133:8888/api/main/login', adminSingIn);
        if (response.status == 200) {


            localStorage.setItem('token', response.data);

            const token = localStorage.getItem('token');
            let payload = token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'));
            let dec = JSON.parse(base64.decode(payload));


            if (dec.role === 'ROLE_USER') {
                history('/user', {
                    state: {
                        role: 'ROLE_USER'
                    }
                });
                
                  
                
            } else if (dec.role === 'ROLE_ENGINEER') {

                history('/engineer', {
                    state: {
                        role: 'ROLE_ENGINEER'
                    }
                });
                
            } else if (dec.role === 'ROLE_ADMIN') {
                history('/admin', {
                    state: {
                        role: 'ROLE_ADMIN'
                    }
                });
                
            } else if (dec.role === "ROLE_ENGLEADER") {
                history('/engineerleader', {
                    state: {
                        role: 'ROLE_ENGLEADER'
                    }
                });
                
            }
        }


    }
    const engLSingIn=async()=>{
        const engLSingIn={
            username: 'eng03',
            password: 'eng12345!',
        }
        const response = await axios.post('http://13.124.230.133:8888/api/main/login', engLSingIn);
        if (response.status == 200) {


            localStorage.setItem('token', response.data);

            const token = localStorage.getItem('token');
            let payload = token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'));
            let dec = JSON.parse(base64.decode(payload));


            if (dec.role === 'ROLE_USER') {
                history('/user', {
                    state: {
                        role: 'ROLE_USER'
                    }
                });
                
                  
                
            } else if (dec.role === 'ROLE_ENGINEER') {

                history('/engineer', {
                    state: {
                        role: 'ROLE_ENGINEER'
                    }
                });
                
            } else if (dec.role === 'ROLE_ADMIN') {
                history('/admin', {
                    state: {
                        role: 'ROLE_ADMIN'
                    }
                });
                
            } else if (dec.role === "ROLE_ENGLEADER") {
                history('/engineerleader', {
                    state: {
                        role: 'ROLE_ENGLEADER'
                    }
                });
                
            }
        }

    }
    const engSingIn=async()=>{
        const engSingIn={
            username: 'engL3',
            password: 'engl123!',
        }
        const response = await axios.post('http://13.124.230.133:8888/api/main/login', engSingIn);
        if (response.status == 200) {


            localStorage.setItem('token', response.data);

            const token = localStorage.getItem('token');
            let payload = token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'));
            let dec = JSON.parse(base64.decode(payload));


            if (dec.role === 'ROLE_USER') {
                history('/user', {
                    state: {
                        role: 'ROLE_USER'
                    }
                });
                
                  
                
            } else if (dec.role === 'ROLE_ENGINEER') {

                history('/engineer', {
                    state: {
                        role: 'ROLE_ENGINEER'
                    }
                });
                
            } else if (dec.role === 'ROLE_ADMIN') {
                history('/admin', {
                    state: {
                        role: 'ROLE_ADMIN'
                    }
                });
                
            } else if (dec.role === "ROLE_ENGLEADER") {
                history('/engineerleader', {
                    state: {
                        role: 'ROLE_ENGLEADER'
                    }
                });
                
            }
        }

    }
    return (
        <>
            <div id="container" className="container1">
                <Link to="/" className="go_back">
                    홈으로<GoBack />
                </Link>
                <Link to="/" className="go_backRight">
                    홈으로<GoBack />
                </Link>
                <div className="row logjoin">
                    <div className="col align-items-center flex-col sign-up">
                        <div className="form-wrapper align-items-center">
                            <div className="form sign-up">
                                <div className="lj_input-group">
                                    <i className='bx bx-mail-send'></i>
                                    <div className="input-button-wrapper" style={{ display: 'flex', textAlign: 'center', alignItems: 'center' }}>
                                        <input type="text" placeholder="아이디" style={{ color: 'black', fontWeight: '900' }} onChange={idhandleChange} name="cus_id" value={formData.cus_id} id='cus_id' />
                                        <input type="button" value={check.id_massage} className="button_check" id="id_check" onClick={idCheck}
                                            style={{ marginLeft: '7px', color: '#757575', width: 'calc(45%)', border: '1px solid #757575', textAlign: 'center', fontWeight: '800', height: '44px', lineHeight: '10px' }} />
                                    </div>
                                    {check.id_check !== 'undefined' || check.id_check !== '' ? <p className='errCheck'>{check.id_check}</p> : <></>}
                                    {errForm.cus_id !== 'undefined' || errForm.cus_id !== '' ? <p className='errCheck'>{errForm.cus_id}</p> : <></>}
                                </div>
                                <div className="lj_input-group">
                                    <i className='bx bxs-lock-alt'></i>
                                    <input type="password" placeholder="비밀번호" style={{ color: 'black', fontWeight: '900' }} className="cus_pw" onBlur={myFunction} onChange={handleChange} name="cus_pw" value={formData.cus_pw} />
                                </div>
                                {errForm.cus_pw !== 'undefined' || errForm.cus_pw !== '' ? <p className='errCheck'>{errForm.cus_pw}</p> : <></>}
                                <div className="lj_input-group">
                                    <i className='bx bxs-lock-alt'></i>
                                    <input type="password" placeholder="비밀번호 확인" style={{ color: 'black', fontWeight: '900' }} name="cus_pw_check" className="cus_pw_check" onBlur={pwCheck} onChange={handleChange} value={formData.cus_pw_check} readOnly={true} />
                                    {pw_check.pw_check !== 'undefined' || pw_check.pw_check !== '' ? <p className='errCheck'>{pw_check.pw_check}</p> : <></>}
                                </div>
                                <div className="lj_input-group">
                                    <i className='bx bx-mail-send'></i>
                                    <input type="text" className="corporate_name" style={{ color: 'black', fontWeight: '900' }} placeholder="회사명" name="cus_company_name" onChange={handleChange} value={formData.cus_company_name} />
                                </div>
                                {errForm.cus_company_name !== 'undefined' || errForm.cus_company_name !== '' ? <p className='errCheck'>{errForm.cus_company_name}</p> : <></>}
                                <div className="lj_input-group">
                                    <i className='bx bx-mail-send'></i>
                                    <input type="text" className="corporate_ph" style={{ color: 'black', fontWeight: '900' }} placeholder="회사 전화번호" name="cus_company_ph" onChange={handleChange} value={formData.cus_company_ph} />
                                </div>
                                {errForm.cus_company_ph !== 'undefined' || errForm.cus_company_ph !== '' ? <p className='errCheck'>{errForm.cus_company_ph}</p> : <></>}
                                <div className="lj_input-group">
                                    <i className='bx bx-mail-send'></i>
                                    <input type="text" className="ceo_name" style={{ color: 'black', fontWeight: '900' }} placeholder="대표명" name="cus_boss" onChange={handleChange} value={formData.cus_boss} />
                                </div>
                                {errForm.cus_boss !== 'undefined' || errForm.cus_boss !== '' ? <p className='errCheck'>{errForm.cus_boss}</p> : <></>}
                                <div className="lj_input-group">
                                    <i className='bx bx-mail-send'></i>
                                    <div className="input-button-wrapper" style={{ display: 'flex', textAlign: 'center', alignItems: 'center' }}>
                                        <input type="text" className="business_registration_number" style={{ color: 'black', fontWeight: '900' }} placeholder="사업자등록번호  XXX-XX-XXXXX" onChange={buhandleChange} id="cus_business_id" name="cus_business_id" value={formData.cus_business_id} />
                                        <input type="button" value={businessCh.message} className="button_check" onClick={businessCheck} id="businessCh"
                                            style={{ marginLeft: '5px', color: '#757575', width: 'calc(45%)', border: '1px solid #757575', textAlign: 'center', fontWeight: '800', height: '44px', lineHeight: '10px' }} />
                                    </div>
                                    {businessCh.error !== 'undefined' || businessCh.error !== '' ? <p className='errCheck'>{businessCh.error}</p> : <></>}
                                    {errForm.cus_business_id !== 'undefined' || errForm.cus_business_id !== '' ? <p className='errCheck'>{errForm.cus_business_id}</p> : <></>}
                                </div>
                                <div className="lj_input-group">
                                    <div className='row'>
                                        <input type="text" placeholder="우편번호" style={{ color: 'black', fontWeight: '900', width: '50%' }} value={extraAddress} readOnly />
                                        <button onClick={() => setbellModalIsOpen(true)} style={{ width: '50%' }} >우편번호 찾기</button>
                                        <input type="text" placeholder="주소" value={address} readOnly style={{ color: 'black', fontWeight: '900', width: "253px" }} />
                                    </div>
                                    <input type="text" placeholder="상세 주소 입력" style={{ color: 'black', fontWeight: '900' }} name="cus_address2" onChange={handleChange} value={formData.cus_address2} />
                                    <Modal className="post-modal" overlayClassName="bell-overlay" isOpen={bellModal} onRequestClose={() => setbellModalIsOpen(false)}> <DaumPostcode onComplete={handleComplete} autoClose
                                        animation className="post-code" /></Modal>
                                </div>
                                {errForm.cus_address2 !== 'undefined' || errForm.cus_address2 !== '' ? <p className='errCheck'>{errForm.cus_address2}</p> : <></>}
                                <div className="lj_input-group">
                                    <i className='bx bx-mail-send'></i>
                                    <input type="text" className="contact_name" style={{ color: 'black', fontWeight: '900' }} placeholder="담당자 이름" name="cus_managet_name" onChange={handleChange} value={formData.cus_managet_name} />
                                </div>
                                {errForm.cus_managet_name !== 'undefined' || errForm.cus_managet_name !== '' ? <p className='errCheck'>{errForm.cus_managet_name}</p> : <></>}
                                <div className="lj_input-group">
                                    <i className='bx bx-mail-send'></i>
                                    <input type="email" className="contact_email" style={{ color: 'black', fontWeight: '900', width: "253px" }} placeholder="담당자 이메일" id="cus_email" name="cus_email" onChange={emailhandleChange} value={formData.cus_email} />
                                    <input type="button" value={emailCheckM.email_massage} className="button_check" id="email_check" onClick={cusEmailCheck}
                                        style={{ marginLeft: '7px', color: '#757575', width: '120px', border: '1px solid #757575', textAlign: 'center', fontWeight: '800', height: '44px', lineHeight: '10px' }} />
                                </div>
                                {errForm.cus_email !== 'undefined' || errForm.cus_email !== '' ? <p className='errCheck'>{errForm.cus_email}</p> : <></>}<p style={{ fontSize: "15px", color: "red" }}>{emailMassage}</p>
                                <div className="lj_input-group">
                                    <i className='bx bx-mail-send'></i>
                                    <input type="tel" className="contact_phonenumber" style={{ color: 'black', fontWeight: '900' }} placeholder="담당자 연락처 000-0000-0000 양식으로 작성" name="cus_phone_number" onChange={handleChange} value={formData.cus_phone_number} />
                                </div>
                                {errForm.cus_phone_number !== 'undefined' || errForm.cus_phone_number !== '' ? <p className='errCheck'>{errForm.cus_phone_number}</p> : <></>}
                                <button style={{ color: 'white' }} onClick={handleLogin} >
                                    가입하기
                                </button>

                                <p>
                                    <span style={{ fontSize: '15px', color: '#7c7c7c' }}>
                                        이미 계정이 있으신가요?
                                    </span>
                                    <b style={{ fontSize: '15px', color: '#7c7c7c' }} onClick={toggle} className="pointer">
                                        로그인하러가기
                                    </b>
                                    <Modal
                                        className="modal-login"
                                        overlayClassName="login-modal-container"
                                        isOpen={loginS}
                                        onRequestClose={() => {
                                            setLoginS(false)
                                            toggle()
                                        }}>

                                        <div className='loginSuccess'>
                                            <p>환영합니다!</p>
                                        </div>
                                        <div className='row'>
                                            <div className="successBtn">

                                                <button className="scBtn" onClick={toggle}>로그인</button></div>
                                            <div className="successBtn">
                                                <Link className="scBtn" to="/" onClick={() => setLoginS(false)}>홈으로</Link>
                                            </div>
                                        </div>
                                    </Modal>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col align-items-center flex-col sign-in">
                        <div className="form-wrapper align-items-center">
                            <div className="form sign-in" id="singIn">
                                <div className="lj_input-group">
                                    <i className='bx bxs-user'></i>
                                    <input type="text" placeholder="아이디" style={{ color: 'black', fontWeight: '900' }} name='username' value={singIn.username} onChange={handleSingInChange} />
                                </div>
                                <div className="lj_input-group">
                                    <i className='bx bxs-lock-alt'></i>
                                    <input type="password" placeholder="비밀번호" name='password' style={{ color: 'black', fontWeight: '900' }}onKeyPress={handleEnterKeyPress} value={singIn.password} onChange={handleSingInChange} />
                                </div>

                                <button style={{ height: "48px", margin: 0, padding: 0 }} onClick={handleSingIn}>
                                    로그인하기
                                </button>
                                <button style={{ height: "48px", margin: "10px 0 ", padding: 0 }} onClick={adminSingIn}>
                                    관리자로 로그인하기
                                </button>
                                <button style={{ height: "48px", margin: "10px 0 ", padding: 0 }} onClick={engLSingIn}>
                                   엔지니어 리더로 로그인하기
                                </button>
                                <button style={{ height: "48px", margin: "10px 0 ", padding: 0 }} onClick={engSingIn}>
                                   엔지니어로 로그인하기
                                </button>
                                <h2 style={{ fontSize: '20px', color: '#f24242' }}>{message}</h2>
                                <p>
                                    <b onClick={idSearch} className="pointer" style={{ marginLeft: '10px', fontSize: '17px', color: '#4b4a4a' }}>
                                        아이디 찾기
                                    </b>
                                    <b onClick={pwSearch} className="pointer" style={{ marginLeft: '15px', fontSize: '17px', color: '#4b4a4a' }}>
                                        비밀번호 찾기
                                    </b>
                                </p>
                                <p>
                                    <span style={{ fontSize: '17px', color: 'rgb(129 129 129)' }}>
                                        계정이 없으신가요?
                                    </span>
                                    <b onClick={toggle} className="pointerSingUp" style={{ fontSize: '17px', color: 'rgb(129 129 129)' }}>
                                        가입하러가기
                                    </b>
                                </p>
                            </div>
                            <div className="form sign-in" id="seachId">
                                <div className="lj_input-group">
                                    <i className='bx bxs-user'></i>
                                    <input type="text" placeholder="담당자 이름" name='cus_managet_name' value={idIn.cus_managet_name} onChange={eamilInput} />
                                </div>
                                <div className="lj_input-group">
                                    <div className="row">
                                        <input type="email" className="serEmail" placeholder="담당자 이메일" name='cus_email' value={idIn.cus_email} onChange={eamilInput} />
                                        <button className="emailCheck" onClick={emailCheck}>인증번호 받기</button>
                                    </div>
                                </div>
                                <p style={{ color: '#876fef', margin: '0', fontSize: '15px' }}>{emailCf}</p>
                                <p style={{ color: 'red', margin: '0', fontSize: '15px' }}>{emailCfErr}</p>
                                <div className="lj_input-group">
                                    <i className='bx bxs-user'></i>
                                    <input type="text" placeholder="인증번호 입력" name="emailNum" value={idIn.emailNum} onChange={eamilInput} />
                                <p style={{ color: 'red', margin: '10px 0 0 0', fontSize: '15px',position:"absolute",  top:' 57px' ,left:"25%"}}> {idGetCus}</p>
                                </div>
                                <button style={{ color: 'white',marginTop:"64px" }} onClick={idGet}>
                                    아이디 찾기
                                </button>
                                <p>
                                    <b onClick={CheckLoginGo} className="pointer" style={{ marginLeft: '10px' }}>
                                        로그인 하기
                                    </b>
                                    <b onClick={pwSearch} className="pointer" style={{ marginLeft: '15px' }}>
                                        비밀번호 찾기
                                    </b>
                                </p>
                            </div>
                            <div className="form sign-in" id="seachPw">
                                <span className="searchPw">
                                    <div className="lj_input-group">
                                        <i className='bx bxs-user'></i>
                                        <input type="text" placeholder="아이디를 입력하세요" name='cus_id' value={idIn.cus_id} onChange={eamilInput} />
                                    </div>
                                    <div className="lj_input-group">
                                        <i className='bx bxs-user'></i>
                                        <input type="text" placeholder="사업자 번호를 입력하세요" name='cus_business_id' value={idIn.cus_business_id} onChange={eamilInput} />
                                    </div>
                                    <div className="lj_input-group">
                                        <div className="row">
                                            <input type="email" className="serEmail" placeholder="이메일을 입력하세요" name='cus_email' value={idIn.cus_email} onChange={eamilInput} />
                                            <button className="emailCheck" onClick={emailPwCheck}>인증번호 받기</button>
                                        </div>
                                    </div>
                                    <p style={{ color: '#876fef', margin: '0', fontSize: '15px' }}>{emailCf}</p>
                                    <p style={{ color: 'red', margin: '0', fontSize: '15px' }}>{emailCfErr}</p>
                                    <div className="lj_input-group">
                                        <i className='bx bxs-user'></i>
                                        <input type="text" placeholder="인증번호 입력" name="emailNum" value={idIn.emailNum} onChange={eamilInput} />
                                    <p style={{ color: 'red', margin: '10px 0 0 0', fontSize: '15px',position:"absolute",  top:' 57px' ,left:"25%" }}> {idGetCus}</p>
                                    </div>
                                    <button style={{ color: 'white' ,marginTop:"64px"}} onClick={pwReset}>
                                        확인
                                    </button>
                                    <p>
                                        <b onClick={CheckLoginGo} className="pointer" style={{ marginLeft: '10px' }}>
                                            로그인 하기
                                        </b>
                                        <b onClick={idSearch} className="pointer" style={{ marginLeft: '15px' }}>
                                            아이디 찾기
                                        </b>
                                    </p>
                                </span>
                                <div className="pwView pwReset">
                                    <div className="lj_input-group">
                                        <input type="password" placeholder="비밀번호 입력" name="cus_pw" value={formData.cus_pw} className="cus_pw_Check" onChange={handleChange} />
                                    </div>
                                    <div className="lj_input-group">
                                        
                                        <input type="password" className="cus_pw_ReCheck" name="cus_pw_check" value={formData.cus_pw_check} onChange={handleChange} placeholder="비밀번호 재입력" />
                                    </div>

                                    {pw_check.pw_check !== 'undefined' || pw_check.pw_check !== '' ? <p className='errCheck'>{pw_check.pw_check}</p> : <></>}
                                    <button style={{ color: 'white' }} onClick={CheckLogin}>
                                        비밀번호 재설정 하기
                                    </button>
                                    <p style={{ color: 'red', margin: '10px 0 0 0', fontSize: '15px' }}> {idGetCus}</p>
                                    <Modal
                                        className="modal-login1"
                                        overlayClassName="login-modal-container1"
                                        isOpen={loginGo}
                                        onRequestClose={() => {
                                            setLoginGo(false)
                                        }}>

                                        <div className='loginSuccess'>
                                            <p>비밀번호가 재설정 되었습니다!</p>
                                            <p>다시 로그인 해주세요!</p>
                                        </div>
                                        <div className='row'>
                                            <div className="successBtn">

                                                <button className="scBtn" onClick={CheckLoginGoGo}>로그인</button></div>
                                            <div className="successBtn">
                                                <Link className="scBtn" to="/" onClick={() => setLoginGo(false)}>홈으로</Link>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                        <div className="form-wrapper">
                        </div>
                    </div>
                </div>
                <div className="row logjoin content-row">
                    <div className="col align-items-center flex-col">
                        <div className="text sign-in">
                            <h2 style={{ color: 'white' }}>
                                Welcome
                            </h2>
                        </div>
                        <div className="img sign-in">
                        </div>
                    </div>
                    <div className="col align-items-center flex-col">
                        <div className="img sign-up">
                        </div>
                        <div className="text sign-up">
                            <h2 style={{ color: 'white' }}>
                                가입하기
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login_join;