import React from 'react';
import cookie from "js-cookie";
import axios from '../../../utils/axios';
import { useState } from 'react';

const CaseModal = ({ setShowCaseModal, receiptFor, practitioner, onSendMessage, senderName }) => {

  const [creating, setCreating] = useState(false);

  const handleCase = async (e) => {
    e.preventDefault();
    setCreating(true)
    const data = {
      caseFor: receiptFor,
      caseCreator: practitioner,
      caseName: e.target.caseInput.value
    }
    try {
      const res = await axios.post('/case/createCase', data, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${cookie.get("jwt")}` },
      });
      console.log(res)
      if (res.status === 200 || res.status === 201) {
        const payload = {
          defaultPrevented: true,
          target: {
            case: res.data.result?._id,
            messageType: "case",
            message: "New case created",
            caseName: e.target.caseInput.value,
            created: Date.now(),
            fullName: senderName
          },
        }
        onSendMessage(payload)
        setCreating(false)
        setShowCaseModal(false)
      }
    } catch (error) {
      setCreating(false);
      setShowCaseModal(false);
    }
  }

  return (
    <div className="relative w-[420px] max-h-[208px] mt-24 text-[#5B5B5B] bg-[#FFFFFF] rounded-[4px] border-[0.5px]">
      <div className="absolute top-2 right-2">
        <span
          onClick={() => setShowCaseModal(false)}
          className="text-xl text-gray-600 cursor-pointer"
        >
          ✖
        </span>
      </div>
      <div className="p-2 border-b bg-[#C8C8C833]">
        <h3 className="text-lg">Create a New Case</h3>
      </div>

      <form
        onSubmit={handleCase}
      >
        <div className='flex flex-col px-[20px] mt-[12px]'>
          <label htmlFor="caseInput  text-[#5B5B5B] text-[16px]">Case Name</label>
          <input
            name="caseInput"
            required
            className='border-[#19525A] mt-[7px] border-[0.5px] rounded-[4px] p-[7px] focus:border-[0.5px] focus:border-[#19525A] outline-none'
            placeholder='Write the case name' type="text" id="caseInput" />
        </div>
        {/* divider  */}
        <div className='bg-[#19525A] h-[0.5px] w-full mt-[30px]'></div>
        <div className='flex justify-end mt-[8px] pr-5'>
          <button className='bg-[#19525A] text-[#fff] rounded-[4px] px-[16px] py-[2px] text-[14px] '>Create</button>
        </div>
      </form>
    </div>
  );
};

export default CaseModal;