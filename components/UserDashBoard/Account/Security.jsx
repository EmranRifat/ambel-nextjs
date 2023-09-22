import React, { useState } from "react";
import Modal from "../../Modal";
import Toggle from "../../Toggle";
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import ChangePasswordModal from "./ChangePasswordModal";
import SecurtyQuesModal from "./SecurtyQuesModal";
import { findUserByUsername, updateUsername } from '../../../StatelessAPI/userApiCalls';
import { RxCross1 } from 'react-icons/rx';
import { BsCheckLg } from 'react-icons/bs';

const Security = (props) => {
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openSecurityModal, setOpenSecurityModal] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [found, setFound] = useState(-1);
  const [verificationChecked, setVerificationChecked] = useState(true);
  const [messageChecked, setMessageChecked] = useState(true);
  const [emailChecked, setEmailChecked] = useState(true);

  const updateDebounceText = debounce(async (text) => {
    const user = await findUserByUsername(text);
    if (user) {
      setFound(user.found);
      setLoading(false);
    }
  }, 500)


  function debounce(cb, delay = 1000) {
    let timeout

    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        cb(...args)
      }, delay)
    }
  }


  const onChangeValue = async (e) => {

    setFound(-1);
    setLoading(true);
    let val = e.target.value;

    setUsername(val);
    if (val.length > 0) {
      updateDebounceText(val);
    }
    else {
      setFound(-1)
      setLoading(false)
    }



  }

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const data = await updateUsername(username);

    if (data) {
      toast("Successfully updated username");
    }
  }

  return (
    <React.Fragment>
      <div className="pb-8 flex flex-col">
        {openChangePassword && (
          <Modal onClick={setOpenChangePassword}>
            <ChangePasswordModal
              setOpenChangePassword={setOpenChangePassword}
              user={props.user?.user}
              router={props.router}
            />
          </Modal>
        )}
        {openSecurityModal && (
          <Modal onClick={setOpenSecurityModal}>
            <SecurtyQuesModal setOpenSecurityModal={setOpenSecurityModal} />
          </Modal>
        )}
        <div className="flex justify-between">
          <span className="text-[#5B5B5B] text-[32px] font-[700]">
            Security
          </span>
        </div>
        <div className="bg-white py-2 flex flex-col w-full rounded-lg shadow-md mt-5 pb-8">
          <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">Username</span>
            <div className="flex items-center">
              <div className="flex items-center rounded-[8px] border-2 py-2 px-4 mr-1">
                <input
                  type="text"
                  name="username"
                  onChange={onChangeValue}
                  value={username}
                  autoComplete="off"
                  required
                  placeholder="Username"
                  className="text-[14px] w-[159px] h-[20px] outline-none mr-1"
                />
                {loading && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#19525A]"></div>}
                {found === 1 && <RxCross1 className="text-[red]" />}
                {found === 0 && <BsCheckLg className="text-[green]" />}
              </div>
              {(username.length > 0 && found === 0) &&
                <button
                  onClick={handleUpdateUser}
                  className="w-[112px] h-[36px] bg-[#19525A] rounded-[8px] text-white text-[14px]"
                >
                  Change
                </button>
              }
            </div>
          </div>

          <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">Change Password</span>
            <button
              onClick={() => setOpenChangePassword(true)}
              className="w-[112px] h-[36px] bg-[#19525A] rounded-[8px] text-white text-[14px]"
            >
              Change
            </button>
          </div>
          <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">
              Security Questions
            </span>
            <button
              onClick={() => setOpenSecurityModal(true)}
              className="w-[112px] h-[36px] bg-[#19525A] rounded-[8px] text-white text-[14px]"
            >
              Setup
            </button>
          </div>
          <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">
              Enable two step verification
            </span>
            <Toggle
              checked={verificationChecked}
              setChecked={setVerificationChecked}
            />
          </div>
          <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">Text message</span>
            <Toggle
              checked={messageChecked}
              setChecked={setMessageChecked}
            />
          </div>
          <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">Email passcode</span>
            <Toggle
              checked={emailChecked}
              setChecked={setEmailChecked}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state?.auth?.isAuthenticated,
    user: state.user.info,
    authUser: state?.auth?.authUser,
  };
};
export default connect(mapStateToProps)(Security);
