import React from "react";
import { Spinner } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { sendContact, setEmail, setMessage, setSubject } from "../redex/slices/contactSlice";


function CpntactUs() {
  const {
    email,
    subject,
    message,
    loading,
    errEmail,
    errsubject,
    errmessage,
  } = useSelector((state) => state.contact);
  const dispatch = useDispatch();

  return (
    <div className="w-full flex flex-col items-center gap-6 bg-[#212529] p-10">
      <div className="text-center p-5">
        <h1 className="text-[#0dcaf0] text-[1.75rem]">
          Contact with the Website developer!
        </h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(sendContact()); // Trigger the email send
        }}
        className="flex flex-col  gap-8 p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 shadow-[0_0_20px_20px_rgba(0,0,0,0.3)] text-white"
      >
        <div className="flex flex-col gap-2">
          <label className={`font-bold text-lg ${errEmail && "text-red-600"}`}>
            {errEmail ? "Invalid Email address" : "Email address"}
          </label>
          <input
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            type="text"
            className="bg-[#212529] text-[#0dcaf0] border-[#0dcaf0] border-2 rounded-md p-2 focus:outline-none focus:shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={`font-bold text-lg ${errsubject && "text-red-600"}`}>
            {errsubject ? "Invalid Subject" : "Your Subject"}
          </label>
          <input
            value={subject}
            onChange={(e) => dispatch(setSubject(e.target.value))}
            type="text"
            className="bg-[#212529] text-[#0dcaf0] border-[#0dcaf0] border-2 rounded-md p-2 focus:outline-none focus:shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className={`font-bold text-lg ${errmessage && "text-red-600"}`}>
            {errmessage ? "Invalid Message" : "Your Message"}
          </label>
          <textarea
            value={message}
            onChange={(e) => dispatch(setMessage(e.target.value))}
            name="message"
            rows="4"
            className="bg-[#212529] p-3 text-[#0dcaf0] border-[#0dcaf0] border-2 rounded-md focus:outline-none focus:shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)]"
          ></textarea>
        </div>

        <div className="flex justify-center  w-full">
          <button
            type="submit"
            className={`py-1.5 px-10 text-base  text-[#0dcaf0] border-2 rounded-md border-[#0dcaf0] hover:bg-[#0dcaf0] hover:text-black ${
              loading && "pointer-events-none bg-gray-700"
            }`}
          >
            {loading ? <Spinner /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CpntactUs;
