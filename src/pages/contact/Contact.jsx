import React, { useState } from "react";
import {data} from '../../atom'
import { useRecoilState } from "recoil";
import style from './Contact.css'


function Contact() {
const [fromData,setFromData] = useRecoilState(data)
const[firstName,setFirstName] = useState("")
const[lastName,setLastName] = useState("")
const[email,setEmail] = useState("")
const [phoneNo,setPhoneNo] = useState("") 

// error for all Fields
 const [firstNameError, setFirstNameError] = useState(false)
 const [lastNameError, setLastNameError] = useState(false)
 const [emailError, setEmailError] = useState(false)
 const [phoneNoError, setPhoneNoError] = useState(false)


 const regexE = /[a-zA-Z0-9.-_]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/
 const regexP = /[0-9]{10,10}$/
 const emailCheck = (str)=> str.match(regexE)
 const phoneNoCheck = (str)=> str.match(regexP)

const handleFirstName =(e)=>{
setFirstName(e.target.value)
}
const handleLastName =(e)=>{
    setLastName(e.target.value)
}
const handleEmail =(e)=>{
    setEmail(e.target.value)
}
const handlePhoneNo =(e)=>{
    setPhoneNo(e.target.value)
}


const handleSubmit = (e) => {
    e.preventDefault()
    const datas= {
        firstName: firstName,
        lastName:lastName,
        email:email,
        phoneNo:phoneNo,    }
    if(firstName===''){
        alert('Please enter your name')
    } else if(lastName ===''){
        alert('Please enter your last name')
    } else if ( email === "" ){
        alert('Please enter your email')
    }else if(emailCheck(email)=== null){
      alert('Please enter a valid email')
    } else if(phoneNo === ''){
        alert('Please enter your phone number')
    } 
    else if (phoneNoCheck(phoneNo)===null){
      alert('Please enter a valid phone number')
    }else{
        setFromData([...fromData,datas ])
        alert(
        "Thank you for contacting us. We will get back to you as soon as possible."
        );
        setFirstName("")
        setLastName("")
        setEmail("")
        setPhoneNo("")
        localStorage.setItem("Datum", JSON.stringify(fromData) )
    }




      

console.log(fromData)

  };

  return (
    <div className="contactMainContainer">
    <div
     className="w-75 h-75 contactContainer"
    >
      <h1>Contact Us</h1>
      <form  className="fromContainer needs-validation"  noValidate onSubmit={handleSubmit}>
        <div className="formFliedBox">
          <label htmlFor="validationTooltip01" className="form-label">
            First name
          </label>
          <input
          onChange={handleFirstName}
            type="text"
            className="form-control"
            id="validationTooltip01"
            value={firstName}
            required
          />
          
          {firstNameError &&<div className="valid-tooltip color-error"> Fill the field</div>}
        </div>
        <div className="formFliedBox">
          <label htmlFor="validationTooltip02" className="form-label">
            Last name
          </label>
          <input
          onChange={handleLastName}

            type="text"
            className="form-control"
            id="validationTooltip02"
            value={lastName}
            required
          />
          <div className="valid-tooltip">Looks good!</div>
        </div>
        <div className="formFliedBox">
          <label htmlFor="validationTooltipUsername" className="form-label">
           Email Id
          </label>
          <div className="input-group has-validation">
            <span
              className="input-group-text"
              id="validationTooltipUsernamePrepend"
            >
              @
            </span>
            <input
            onChange={handleEmail}
            value={email}
              type="email"
              className="form-control"
              id="validationTooltipUsername"
              aria-describedby="validationTooltipUsernamePrepend"
              required
            />
            <div className="invalid-tooltip">
              Please choose a valid Email.
            </div>
          </div>
        </div>
       
     
        <div className="formFliedBox">
          <label htmlFor="validationTooltip05" className="form-label">
            Phone No.
          </label>
          <input
          onChange={handlePhoneNo}
          value={phoneNo}
            type="tel"
            className="form-control"
            id="validationTooltip05"
            required
          />
          <div className="invalid-tooltip">Please provide a Phone No.</div>
        </div>
        <div className="buttonFlied">
          <button className="btn btn-primary btn-sm" type="submit">
            Submit Details
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Contact;
