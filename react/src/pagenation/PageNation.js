import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'







const PageNation = ({ currentPage, totalPosts,postsPerPage, onPageChange ,style}) => {
    const first=useRef();
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const [pageNation, setPageNation] = useState({})

    
    useEffect(() => {
      
        pageChange(1)
    }, [])


    const pageChange = async (e) => {
        if (token == null) {
            return;
        }

        try {
            const response = await axios.get(`http://13.209.147.231:8888/api/pagenation?bno=${e}&amount=${postsPerPage}&total=${totalPosts}`, config)

            setPageNation(response.data)

        } catch (error) {
            window.alert(error);
        }
        onPageChange(e);
    }
  

// if (loading) {

//     return  <Background>
//     <LoadingText>잠시만 기다려 주세요.</LoadingText>
//     <img src='/img/loding.gif' alt="로딩중" width='5%'/>
//   </Background>
// }

return (

    <div style={{ textAlign: 'center' }}>
        <ul className="pagination" >




            <li className="page-item ">
                <Link className="page-link" style={{color:style.color}}onClick={() => pageChange(1)} ref={first} >
                    맨 앞
                </Link>
            </li>
            {pageNation.prev != false ?
                <li className="page-item ">
                    <Link className="page-link"  style={{color:style.color}}onClick={() => pageChange(pageNation.start - 1)} >
                        이전
                    </Link>
                </li>
                : null}

            {pageNation.pageList ? ( // pageNation.pageList가 정의되어 있을 때에만 처리
                pageNation.pageList.map((data, index) => (
                    <li className="page-item" key={index}>
                        <Link  style={{color:style.color}}
                           
                            onClick={() => pageChange(data)}   className={data === currentPage ? 'active' : 'page-link'}
                            href="#"
                        >
                            {data}
                        </Link>
                    </li>
                ))
            ) : null}

            {pageNation.next != false ?
                <li className="page-item ">
                    <Link className="page-link"  style={{color:style.color}} onClick={() => pageChange(pageNation.end + 1)}>
                        뒤로 가기
                    </Link>
                </li>
                : null}

            <li className="page-item ">
                <Link className="page-link"  style={{color:style.color}} onClick={() => pageChange(pageNation.realEnd)} >
                    맨 뒤
                </Link>
            </li>






        </ul>

    </div>




)
}

export default PageNation