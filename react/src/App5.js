import React, { useState } from "react";
import crypto from "crypto-js";
import axios from "axios";
import Base64 from 'crypto-js/enc-base64';
function App() {

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

    const change=(e)=>{
        
        const copy ={...form,[e.target.name]: crypto.AES.encrypt(e.target.value, process.env.REACT_APP_SECRET_KEY).toString()}
        setForm(copy)
    }
    const handleSubmit=async()=>{
        console.log(process.env.REACT_APP_SECRET_KEY)
        console.log(form)
        const response=await axios.post("http://43.201.243.223:8888/api/main/test",form)
    }
  return (
    <div>
      <input
        type="text"
        placeholder="아이디"
        name="username"
        onChange={change}
      />
      <input
        type="password"
        placeholder="비밀번호"
        name="password"
        onChange={change}
      />
      <button onClick={handleSubmit}>전송</button>
    </div>
  );
}

export default App;
