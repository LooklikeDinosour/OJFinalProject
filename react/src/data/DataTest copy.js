import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);

function DataTest() {
  const [serverData, setServerData] = useState([]);
  const [historicalData, setHistoricalData] = useState({});
  const chartRefs = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://43.201.243.223:8888/api/main/servers');
        const newServerData = response.data;
        console.log(newServerData);
        const servers = [
          {
              id: newServerData.id,
              name: 'cpu 사용량',
              cpuUsage:Math.floor(Math.random() * 30) +1,
              memoryUsage:Math.floor(Math.random() * 41) + 50,
              ramUsage:Math.floor(Math.random() * 41) + 50,
            },
          ]
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
        },
        {
          label: `메모리 사용량`,
          data: historicalData[serverId].map((server) => server.memoryUsage),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: `RAM 사용량`,
          data: historicalData[serverId].map((server) => server.ramUsage),
          backgroundColor: 'rgba(255, 205, 86, 0.2)',
          borderColor: 'rgba(255, 205, 86, 1)',
          borderWidth: 1,
        },
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
    console.log('온다');
 
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
        <option>서버1</option>
        <option>서버2</option>
      </select>
      <p className='selecserver' style={{color:'#525252',marginTop:'100px',fontSize:'20px'}}>[서버를 선택해주세요]</p>
      <div className="row serverChart" style={{display:'none',marginLeft:'120px'}}>
        {Object.keys(historicalData).map((serverId, index) => (
          <div key={serverId} className='serverChart' style={{ width: '48%', height: '200px',margin:'0 auto' }}>
            <Line data={chartDataByServer[index]} ref={(ref) => (chartRefs.current[serverId] = ref)} options={options} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataTest;