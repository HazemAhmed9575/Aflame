import React, { useState } from 'react'
import emailjs from '@emailjs/browser';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { sendContact, setEmail, setMessage, setSubject } from '../redex/slices/contactSlice';
function CpntactUs() {
  const {email,subject,message}= useSelector((state)=>state.contact)
  const dispatch = useDispatch()
//   const [email,setEmail]=useState("")
//   const [subject,setSubject]=useState("")
// const [message,setMessage]=useState("")

// const sandMassage = async(e)=>{
//   e.preventDefault();
//   // Emailjs ServiceId,TemplateId,PublicKey
// const ServiceId = "service_0z22nzp" 
// const TemplateId ="template_qkh5fsj"
// const PublicKey = "HtLpd-4BjARfGKd7a"
// // Obj thet contains dynamic template params
// const templateparams ={
//   to_name : "aflame",
//   frmo_email : email,
//   frmo_subject : subject,
//   message:message,

// }

// const data ={
//   service_id:ServiceId,
//   template_id:TemplateId,
//   user_id:PublicKey,
//   template_params:templateparams
// }

// try{
//   const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send",data)
//   console.log(res.data);
// setEmail("")
// setSubject("")
// setMessage("")


// }catch(e) {
//   console.log(e.message);
  
// }



// }





  return (
    <div className='h-screen w-full flex flex-col items-center gap-6 bg-[#212529] pt-10'>

<div className="text-center p-5">
  <h1 className="text-[#0dcaf0] text-[1.75rem]" >Contact with the Website developer!</h1>
</div>

<form onSubmit={(e)=>{e.preventDefault(),dispatch(sendContact())}} className='flex flex-col gap-8 p-4 w-1/4 shadow-[0_0_20px_20px_rgba(0,0,0,0.3)] text-white' >


  <div className="flex flex-col gap-2">
  <label className='font-bold text-lg' >Email address</label>
  <input value={email} onChange={(e)=>dispatch(setEmail(e.target.value))} type="text" className='bg-[#212529]  text-[#0dcaf0] border-[#0dcaf0] border-2 rounded-md p-2 focus:outline-none focus:shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)]' />
  </div>

<div className="flex flex-col gap-2">
<label className='font-bold text-lg'> Your Subject</label>
<input value={subject} onChange={(e)=>dispatch(setSubject(e.target.value))}  type="text" className='bg-[#212529] text-[#0dcaf0] border-[#0dcaf0] border-2 rounded-md p-2 focus:outline-none focus:shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)]' />
</div>

<div className="flex flex-col gap-2">
<label className='font-bold text-lg' > Your Message</label>
<textarea value={message} onChange={(e)=>dispatch(setMessage(e.target.value))}  name="massage" rows="4" className='bg-[#212529] p-3 text-[#0dcaf0] border-[#0dcaf0] border-2 rounded-md focus:outline-none focus:shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)]'></textarea>
</div>



<div className='flex justify-center  w-full'>
<button type='submit' className="py-1.5 px-10 text-base  text-[#0dcaf0] border-2 rounded-md border-[#0dcaf0] hover:bg-[#0dcaf0] hover:text-black ">

    Sudmit</button>
</div>

</form>











    </div>
  )
}

export default CpntactUs