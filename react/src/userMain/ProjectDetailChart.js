import React, { useEffect, useState } from "react";
import "./Timeline.css";
import { Link, useParams } from "react-router-dom";
import UserProjectDetailModal2 from "./UserProjectDetailModal2";
import axios from "axios";



function ProjectDetailChart({ pro_id , server_id }) {

  useEffect(() => {
    if (!pro_id) {
      console.error('pro_id is undefined');
      return;
    }
  
    // Rest of the useEffect
  }, []);
  

  // VARIABLES
  const elH = document.querySelectorAll(".timeline li > div");

  // START
  window.addEventListener("load", init);

  function init() {
    setEqualHeights(elH);
  }

  // SET EQUAL HEIGHTS
  function setEqualHeights(el) {
    let counter = 0;
    for (let i = 0; i < el.length; i++) {
      const singleHeight = el[i].offsetHeight;

      if (counter < singleHeight) {
        counter = singleHeight;
      }
    }

    for (let i = 0; i < el.length; i++) {
      el[i].style.height = `${counter}px`;
    }
  }
  const [ProjectDetailList, setProjectDetailList] = useState([]);

  useEffect(() => {
    const getProjectDetailList = async () => {
      try {
        const response = await axios.get(`http://13.209.147.231:8888/api/main/user/projectDetailChart/${pro_id}/${server_id}`);

        setProjectDetailList(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response) {
           // The request was made and the server responded with a status code
           console.log('Data:', error.response.data);
           console.log('Status:', error.response.status);
           console.log('Headers:', error.response.headers);
        } else if (error.request) {
           // The request was made but no response was received
           console.log('Request:', error.request);
        } else {
           // Something happened in setting up the request and triggered an error
           console.log('Error:', error.message);
        }
      }
      }
    getProjectDetailList(); // Call the function to fetch data
  }, []);

  return (
    <>

      <section className="timeline">
        <ol>
          {ProjectDetailList.map((list, index) => (
            <li key={index}>
              <div>
                <time>{list.work_date}</time>
                <UserProjectDetailModal2 projectDetailList={list} />
              </div>
              <li></li>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

export default ProjectDetailChart;
