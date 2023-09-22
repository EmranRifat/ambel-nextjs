// @ts-nocheck
import React from "react";
import { useState } from "react";
import { updatePassword, signOut, sendMail } from '../../../StatelessAPI/userApiCalls';
import { toast } from 'react-toastify';


const ChangePasswordModal = (props) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [check, setCheck] = useState(false);
  const [mailsend, setMainSend] = useState(false);
  const [loading, setLoading] = useState(false);


  const handlePasswordSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword === confirmPassword) {
      const data = await updatePassword(oldPassword, newPassword);
      if (data) {
        if (mailsend) {
          const rest = await sendMail(props.user.email, "Change Password", "<p>Your password has changed successfully.</p>");
          if (rest) {
            toast("Check mail please");
          }
        }
        if (check) {
          const res = await signOut();

          if (res) {
            props.setOpenChangePassword(false);
            toast("Successfully updated");
            props.router.push('/user-dashboard');
          }
          else {
            toast("Can not signout from all devices.");
          }
        }

      }
      else {
        toast("Can not update password");
      }
    }

    else {
      toast("New Password and confirm password should be matched!");
    }

    setLoading(false);
  }
  return (
    <React.Fragment>
      {" "}

      <div className="w-[440px] z-50 bg-white my-[10%] py-4 shadow m-auto rounded-md">
        <div className="w-full flex flex-col items-center bg-white rounded-md">
          {/* all fields... */}

          <div className="w-full flex border-b-[1px] pb-4 border-[#76767680] justify-center text-[#19525A] text-[20px]">
            <span>Change Password</span>
          </div>
          <div className="w-full flex flex-col justify-center items-center p-3">
            <div className="flex flex-col mb-3">
              <span className="text-[16px] text-[#5B5B5B]">Old Password</span>
              <input
                type="text"
                value={oldPassword}
                className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-lg"
                onChange={e => setOldPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-3">
              <span className="text-[16px] text-[#5B5B5B]">New Password</span>
              <input
                type="text"
                value={newPassword}
                className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-lg"
                onChange={e => setNewPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[16px] text-[#5B5B5B]">
                Confirm Password
              </span>
              <input
                type="text"
                value={confirmPassword}
                className="w-[410px] h-[40px] text-[16px] px-2 outline-none border-[1px] border-[#19525A80] mt-1 rounded-md shadow-lg"
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="w-full flex justify-start items-center mt-4">
              <input
                id="default-checkbox"
                type="checkbox"
                checked={check}
                className="w-[16px] h-[16px] text-blue-600 bg-gray-100 rounded mr-2 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
                onChange={e => setCheck(e.target.checked)}
              />
              <span className="text-[12px] text-[#5B5B5B]">
                All devices will be required to sign in with new password
              </span>
            </div>

            <div className="w-full justify-start flex flex-col mt-5">
              <div className="flex items-center">
                <input
                  type="radio"
                  className="h-[16px] w-[16px] checked:bg-[#01261C] cursor-pointer"
                />
                <span className="text-[12px] text-[#5B5B5B] ml-3">
                  Send text message-****1913
                </span>
              </div>
              <div className="flex items-center mt-3">
                <input
                  type="radio"
                  checked={mailsend}
                  className="h-[16px] w-[16px] checked:bg-[#01261C] cursor-pointer"
                  onClick={e => setMainSend(!mailsend)}
                />
                <span className="text-[12px] text-[#5B5B5B] ml-3">
                  Send email-******am96@gmail.com
                </span>
              </div>
            </div>
            <div className="w-full flex justify-end items-end px-3 pt-10">
              <button
                onClick={() => props.setOpenChangePassword(false)}
                className="h-[32px] w-[80px] text-[16px] border-[1px] border-gray-500 bg-white rounded-[8px] mr-4"
              >
                Cancel
              </button>
              {!loading && <button
                className="h-[32px] w-[80px] text-[16px]  bg-[#1A535B] rounded-[8px] text-white item-center"
                onClick={handlePasswordSave}
              >
                Save

              </button>}
              {loading && <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-3 border-[#19525A] self-center"></div>}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChangePasswordModal;
