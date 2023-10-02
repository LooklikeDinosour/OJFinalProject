import axios from "axios";
import { valHooks } from "jquery";
import { useCallback, useState } from "react"

function Search({setSearchValue,style,categori,select,order,writer}){
  const [input1 , setInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const value1=e.target.value
    setInput(value1)
   
  }

  const handleClick =async () => {
   
    if(input1!=''){
    const response = await axios.get(`http://43.201.243.223:8888/api/main/SearchInfo?table=${categori}&value=${input1}&columm=${select}&order=${order}&cs_writer=${writer}`)
    const newArray=response.data.map((obj)=>{
        const newObj={};
        for(const key in obj){
            if(obj.hasOwnProperty(key)){
                newObj[key.toLowerCase()]=obj[key];
            }
        }
        return newObj
    })
    setSearchValue(newArray)
    
   
    // setTotal(response.data[response.data.length-1].count)
    
    }else{
      window.location.reload()
        return
    }
    };

  


  return(

    <>
       <label style={{ display: 'flex;' }}>
          <span style={{ transform: 'translateY(5px)', paddingRight: '10px', width: '40px' }}>Search:</span>
           <input type="search" value={input1} className="form-control form-control-sm"
            placeholder aria-controls="zero_config" style={{ width: '200px' }} onChange={handleChange}/>
            <input type="button" value={'검색하기'}style={{ background: 'white', color:'black'}} className="inqurylist-search" onClick={handleClick}/>
           
        </label>

    </>
  )
}

export default Search