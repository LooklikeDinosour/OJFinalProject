import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);

function DataTest({id}) {
  const [serverData, setServerData] = useState([]);
  const [historicalData, setHistoricalData] = useState({});
  const chartRefs = useRef({});
  const [getSer,setGerSer]=useState([])
  const getServer=async()=>{
      const idGet={"id":id};
      const response = await axios.post("http://13.209.147.231:8888/api/main/engineer/getServer",idGet)
      setGerSer(response.data)
    }
    console.log(getSer)
  useEffect(() => {
    getServer()
    const fetchData = async () => {
      try {
        const response = await axios.get('http://13.209.147.231:8888/api/main/servers');
        const newServerData = response.data;
        console.log(newServerData)
        /* const servers = [
          {
              id: newServerData.id,
              name: 'cpu 사용량',
              cpuUsage:Math.floor(Math.random() * 30) +1,
              memoryUsage:Math.floor(Math.random() * 41) + 50,
              ramUsage:Math.floor(Math.random() * 41) + 50,
            },
          ] */
        const groupedData = newServerData.reduce((acc, server) => {
          const { id } = server;
          if (!acc[id]) {
            acc[id] = [];
          }
          acc[id].push(server);
          return acc;
        }, {});

        
        const currentTime = new Date().toLocaleTimeString();

        
        setHistoricalData((prevData) => {
          
          const newData = { ...prevData };

          
          Object.keys(groupedData).forEach((id) => {
            if (!newData[id]) {
              newData[id] = [];
            }
            
            const newDataPoints = groupedData[id].map((server) => ({
              ...server,
              time: currentTime,
            }));
            newData[id] = [...newData[id], ...newDataPoints];

            
            newData[id] = newData[id].slice(-5);
          });

          return newData;
        });

        setServerData(newServerData);
      } catch (error) {
        console.error('Error fetching server data:', error);
      }
    };

    fetchData(); 

    const interval = setInterval(() => {
      fetchData(); 
    }, 1500);

    return () => {
      clearInterval(interval); 
    };
  }, []);

  const chartDataByServer = Object.keys(historicalData).map((serverId) => {
    return {
      labels: historicalData[serverId].map((server) => server.time), 
      datasets: [
        {
          label: `CPU 사용량`,
          data: historicalData[serverId].map((server) => server.cpuUsage),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }
      ],
    };
  });
  const chartDataByServer1 = Object.keys(historicalData).map((serverId) => {
    return {
      labels: historicalData[serverId].map((server) => server.time), 
      datasets: [
        {
          label: `메모리 사용량`,
          data: historicalData[serverId].map((server) => server.memoryUsage),
          backgroundColor: '#3788d8',
          borderColor: '#3788d8',
          borderWidth: 1,
        }
      ],
    };
  });
  const chartDataByServer2 = Object.keys(historicalData).map((serverId) => {
    return {
      labels: historicalData[serverId].map((server) => server.time), 
      datasets: [
        {
          label: `램 사용량`,
          data: historicalData[serverId].map((server) => server.ramUsage),
          backgroundColor: 'rgb(42, 198, 97)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }
      ],
    };
  });
  const options = {
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 5, 
        },
        title: {
          display: true,
          text: '사용량(%)', 
        },
      },
    },
  };

  const changeServer = (event) => {
 
    const serverCharts = document.querySelectorAll(".serverChart");
    if(event.currentTarget.value === '서버선택'){
      document.querySelector('.serverChart').style.display = 'none';
      document.querySelector('.selecserver').style.display = '';
      return;
    }
    document.querySelector('.selecserver').style.display = 'none';
    setHistoricalData('');
    serverCharts.forEach((chart) => {
      chart.style.display = '';
    });
  }
  

  return (
    <div className='eng-servernow'>
      <h3 style={{marginBottom:'50px',display:'inline-block',color:'#525252'}}>실시간 서버 모니터링</h3> 
      <select className='eng-serversel' style={{marginLeft:'20px'}} onChange={changeServer}>
        <option>서버선택</option>
       
         {getSer &&
    getSer.map((item, index) => (
      <option key={index}>{item.server_name}</option>
    ))}
      </select>
      <p className='selecserver' style={{color:'#525252',marginTop:'100px',fontSize:'20px'}}>[서버를 선택해주세요]</p>
      <div className="row serverChart" style={{display:'none',width:"100%"}}>
        {Object.keys(historicalData).map((serverId, index) => (
          <div key={serverId} className='serverChart' style={{height: '300px',width:"33%"}}>
            <Line data={chartDataByServer[index]} ref={(ref) => (chartRefs.current[serverId] = ref)} options={options} />
          </div>
        ))}
         {Object.keys(historicalData).map((serverId, index) => (
          <div key={serverId} className='serverChart' style={{height: '300px',width:"33%"}}>
            <Line data={chartDataByServer1[index]} ref={(ref) => (chartRefs.current[serverId] = ref)} options={options} />
          </div>
        ))}
         {Object.keys(historicalData).map((serverId, index) => (
          <div key={serverId} className='serverChart' style={{ height: '300px',width:"33%"}}>
            <Line data={chartDataByServer2[index]} ref={(ref) => (chartRefs.current[serverId] = ref)} options={options} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataTest;