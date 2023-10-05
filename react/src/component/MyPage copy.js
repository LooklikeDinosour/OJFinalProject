import React, { useRef, useState } from "react";
import Modal from "react-modal";
import "../enMain/EnMain.css";
import "../userMain/User.css";
import axios from "axios";

function MyPage(info) {
    const [formInputData, setFormData] = useState({
        cus_id:info.state.cus_id,
        cus_company_name: info.state.cus_company_name,
        cus_address1: info.state.cus_address1,
        cus_address2: info.state.cus_address2,
        cus_company_ph: info.state.cus_company_ph,
        cus_boss: info.state.cus_boss,
        cus_managet_name: info.state.cus_managet_name,
        cus_email: info.state.cus_email,
        cus_num:info.state.cus_num
    })
    
    const [mPagemodalIsOpen, setModalIsOpen] = useState(false);

    const fileInputRef = useRef(null);

    const [tempImage, setTempImage] = useState(info.poto.file_path);

    const [profileImg, setProfileImg] = useState({});
    const handleFileChange = (e) => {
        
        const selectedImage = e.target.files[0];
        if(selectedImage){
            const imageUrl = URL.createObjectURL(selectedImage);
            console.log(imageUrl)
            setProfileImg(selectedImage)
            setTempImage(imageUrl);
        }
     

    };
    const [input, setInput] = useState(false);
    const upload = () => {
        document.querySelector(".myPageModal").style.width = "700px"

        setInput(true)
    }


    async function saveChanges(e) {
        console.log(profileImg)

        if (profileImg.size / 1000000 > 50) {
            alert("파일은 최대 50MB이하만 허용됩니다");
            return;
        }
        if (profileImg) {
            const fileName = profileImg.name;
            const validExtensions = ['jpg', 'jpeg', 'png'];
            if (!fileName || !fileName.includes('.')) {
                alert("올바른 파일을 선택해 주세요.");
                return;
            }
            const fileExtension = fileName.split('.').pop().toLowerCase();

            // 파일 확장자가 유효한지 확인합니다.
            if (validExtensions.includes(fileExtension)) {

                const userId = info.state.cus_id;
                const fileId=info.poto.file_id;
                let formData = new FormData();
                formData.append('file_data', profileImg);
                formData.append('userId', userId);
                formData.append('fileId', fileId);

                console.log(formInputData)
                await axios.post('http://13.209.147.231:8888/api/main/updateInfo', formInputData)
                const response = await axios.post('http://13.209.147.231:8888/api/main/cloudUpload', formData)
                // setProfileImg(response.data)
                console.log(response)
                alert("변경완료되었습니다.")
                e.stopPropagation();
                window.location.reload()
            } else {
                // 유효하지 않은 파일 확장자인 경우 사용자에게 알립니다.
                alert('jpg, jpeg, png 파일만 업로드 가능합니다.');
                // 선택한 파일을 초기화합니다.
            }
        }


    }



    const changMyImg = (e) => {
        console.log(1)
        e.stopPropagation();
        console.log(fileInputRef.current)
        upload()
        fileInputRef.current.click();

    }

    const handleInputChange=e=>{

        const {name,value}=e.target;
        setFormData({
            ...formInputData,
            [name]:value
        })

    }

    return (
        <>
            <button onClick={() => {
                setModalIsOpen(true)
                document.body.style.overflow = 'hidden';
                return () => {
                    document.body.style.overflow = 'unset';
                };
            }
            } style={{width:'100%',textAlign:'left',paddingLeft:'10px',color:'#85869b',fontSize:'15px',fontWeight:'700'}}>프로필 보기</button>
            <Modal
                className="myPageModal"
                overlayClassName="myPageModalOverlay"
                isOpen={mPagemodalIsOpen}
                onRequestClose={() => {
                    setModalIsOpen(false)
                    setTempImage(null)
                    setInput(false)
                }}
            >
                <div className="detail_modal_container1">
                    <h2>회원 정보</h2>
                    <div className="detail_modal_container_inner">
                        <table className="detail_modal_table">

                            <tr>
                                <div className="me-3 circle-image" style={{ margin: '15px 20px 15px 7px' }}>
                                   <img src={tempImage}alt="Temporary Preview"
                                        className="rounded-circle profileImage" /> 
                                    <div class="cross-icon"  onClick={changMyImg}>    
                                    <input type="file" ref={fileInputRef}id="file-input" style={{ display: 'none' }} onChange={handleFileChange} />
                                    </div>
                                </div>
                            </tr>
                            <tr>
                                <th>회사 명</th>
                                <td>
                                    {input ? <input type="text" placeholder={info.state.cus_company_name} name="cus_company_name" value={input.cus_company_name} onChange={handleInputChange} style={{ width: '280px' }} /> : <p> {info.state.cus_company_name}</p>}
                                </td>
                            </tr>
                            <tr>
                                <th>회사 전화 번호</th>
                                <td>
                                    {input ? <input type="text" placeholder={info.state.cus_company_ph} name="cus_company_ph" value={input.cus_company_ph} onChange={handleInputChange} style={{ width: '280px' }} /> : <p> {info.state.cus_company_ph}</p>}
                                </td>
                            </tr>
                            <tr>
                                <th>대표 명</th>
                                <td>
                                    {input ? <input type="text" placeholder={info.state.cus_boss} name="cus_boss" value={input.cus_boss} onChange={handleInputChange}style={{ width: '280px' }} /> : <p> {info.state.cus_boss}</p>}
                                </td>
                            </tr>
                            <tr>
                                <th>주소</th>
                                <td>
                                    {input ? <input type="text" placeholder={info.state.cus_address1} name="cus_address1" value={input.cus_address1} onChange={handleInputChange}style={{ width: '280px' }} /> : <p> {info.state.cus_address1}</p>}
                                    {input ? <input type="text" placeholder={info.state.cus_address2} name="cus_address2" value={input.cus_address2} onChange={handleInputChange}style={{ width: '280px' }} /> : <p> {info.state.cus_address2}</p>}

                                </td>
                            </tr>
                            <tr>
                                <th>담당자 이름</th>
                                <td>
                                    {input ? <input type="text" placeholder={info.state.cus_managet_name} name="cus_managet_name" value={input.cus_managet_name} onChange={handleInputChange}style={{ width: '280px' }} /> : <p> {info.state.cus_managet_name}</p>}
                                </td>
                            </tr>
                            <tr>
                                <th>담당자 이메일</th>
                                <td>
                                    {input ? <input type="text" placeholder={info.state.cus_email}name="cus_email"  value={input.cus_email}onChange={handleInputChange}style={{ width: '280px' }} /> : <p> {info.state.cus_email}</p>}
                                </td>
                            </tr>
                        </table>

                        <div className="detail_modal_button" style={{ marginTop: "40px" }}>

                           {input?<button className="detail_modal_button_print" onClick={saveChanges} style={{ fontSize: "20px" }}>수정 완료</button>:<button className="detail_modal_button_print" onClick={upload} style={{ fontSize: "20px" }}>수정하기</button>} 

                            <button className="detail_modal_button_close" onClick={() => setModalIsOpen(false)} style={{ fontSize: "20px" }} >닫기</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default MyPage;
