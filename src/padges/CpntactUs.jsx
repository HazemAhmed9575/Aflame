import React from 'react'

function CpntactUs() {
  return (
    <div className='h-screen w-full flex flex-col items-center gap-6 bg-[#212529] pt-10'>

<div className="text-center p-5">
  <h1 className="text-[#0dcaf0] text-[1.75rem]" >Contact with the Website developer!</h1>
</div>

<div className='flex flex-col gap-8 p-4 w-1/4 shadow-[0_0_20px_20px_rgba(0,0,0,0.3)] text-white' >


  <div className="flex flex-col gap-2">
  <label className='font-bold text-lg' >Email address</label>
  <input type="text" className='bg-[#212529]  text-[#0dcaf0] border-[#0dcaf0] border-2 rounded-md p-2 focus:outline-none focus:shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)]' />
  </div>

<div className="flex flex-col gap-2">
<label className='font-bold text-lg'> Your Subject</label>
<input type="text" className='bg-[#212529] text-[#0dcaf0] border-[#0dcaf0] border-2 rounded-md p-2 focus:outline-none focus:shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)]' />
</div>

<div className="flex flex-col gap-2">
<label className='font-bold text-lg' > Your Message</label>
<textarea name="massage" rows="4" className='bg-[#212529] p-3 text-[#0dcaf0] border-[#0dcaf0] border-2 rounded-md focus:outline-none focus:shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)]'></textarea>
</div>



<div className='flex justify-center  w-full'>
<button className="py-1.5 px-10 text-base  text-[#0dcaf0] border-2 rounded-md border-[#0dcaf0] hover:bg-[#0dcaf0] hover:text-black ">

    Sudmit</button>
</div>

</div>











    </div>
  )
}

export default CpntactUs