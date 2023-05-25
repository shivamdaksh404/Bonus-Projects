import React from "react";
import style from "./Home.module.css";
import { data } from "../../atom";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { useEffect } from "react";

function Home() {
  const [isTableShow,setIsTableShow] = useState(false)
  const [fromData, setFromData] = useRecoilState(data);
  const [datas, setDatas] = useState([]);
  const [isShowClear,setIsShowClear] =useState(true)
  

  useEffect(() => {
    let newLocalData = localStorage.getItem("Datum");
 
    if (newLocalData) {
      let value = JSON.parse(newLocalData);
      setDatas(value);
      setFromData(value);
    }

  }, [data]);

const handleClear = ()=>{
  localStorage.removeItem("Datum")
  alert("Are you sure you want to clear")
  setFromData([])
  setDatas([])
  // setIsShowClear(true)
}
  

  return (
    <div className={style.mainContainer}>
      <div className={style.wrapperContainer}>
        <h1>Welcome to Home Page </h1>
      </div>

      <div
        className={style.tableDiv}
      >
        <table>
          <thead>
            <td>First Name</td>
            <td>Last Name</td>
          </thead>
          <tbody>
            {datas && datas.length > 0
              ? datas.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                      </tr>
                    </>
                  );
                  
                })
              : null}
          </tbody>
        </table>


      </div>
      <div className={style.button}>

 <button  onClick={handleClear}
  type='button' className='btn btn-sm btn-danger '>Clear Data</button>

      </div>
    </div>
  );
}

export default Home;
