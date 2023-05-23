import React from 'react'
import style from './Home.module.css'
import {data } from '../../atom'
import { useRecoilValue } from 'recoil'
import { useState } from 'react'
import { useEffect } from 'react'

function Home() {
  const [isTableShow,setIsTableShow] = useState(false)
const fromData = useRecoilValue(data) 
const{firstName,lastName} = fromData
// console.log(fromData[0].firstName)
useEffect(()=>{
  // if(firstName && lastName === null || undefined){
  if(fromData === {}){
    setIsTableShow(false)
  }else{
    setIsTableShow(true)
  }
  

},[])

  return (


    <div className={style.mainContainer}>
    <div className={style.wrapperContainer}>



<h1>Welcome to Home Page </h1>
    </div>
    

    <div style={isTableShow ? {} : {display:"none"}}  className={style.tableDiv}>
    <table >
      <thead >
        <td>First Name</td>
        <td>Last Name</td>
      </thead>
      <tbody>
      
{fromData.map((item,index)=>{
  if(item.firstName == null || undefined && item.lastName== null || undefined){
    return <h1>No Data Found</h1>
  }else{
  return (
        <tr key={index}>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
        </tr>
        )
  }
})}
      </tbody>
    </table>
    </div>
  

   

    </div>
  )
}

export default Home