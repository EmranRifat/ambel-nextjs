// @ts-nocheck
import React from "react";
// import { BiCaretDown, BiDownArrow, BiPlusCircle } from "react-icons/bi";
import Toggle from "../../Toggle";
import { useState } from "react";
import Dropdown from "../../Dropdown";
import Modal from "../../Modal";
import AddReminderModal from "./AddReminderModal";
import { connect } from "react-redux";
import {
  getUserReminder,
  updateUserReminder,
} from "../../../store/actions/userReminder";
import { useEffect } from "react";
import ViewReminderModal from "./ViewReminderModal";
import Notification from "./Notification";

const Reminder = (props) => {
  const [addReminderModal, setAddReminderModal] = useState(false);
  const [view, setView] = useState(false);
  const [viewReminder, setViewReminder] = useState(null);

  useEffect(() => {
    props.getUserReminder();
  }, []);

  return (
    <>
      <div className="mb-10">
        {addReminderModal && (
          <Modal onClick={setAddReminderModal}>
            <AddReminderModal setAddReminderModal={setAddReminderModal} />
          </Modal>
        )}
        {view && (
          <Modal onClick={setView}>
            <ViewReminderModal setView={setView} viewReminder={viewReminder} />
          </Modal>
        )}
        <div className="flex justify-between items-center mt-3">
          <span className="text-[#5B5B5B] text-[32px] font-[700]">
            Reminder
          </span>
          <button
            onClick={() => setAddReminderModal(true)}
            className="w-[112px] h-[36px] bg-[#19525A] text-white rounded-[8px] text-[14px]"
          >
            Add Reminder
          </button>
        </div>
        <div className="bg-white rounded-md shadow-md">
          {props.userRemidnerData &&
            props.userRemidnerData.map((reminder, i) => (
              <div
                key={reminder._id}
                className="flex justify-between border-b-[2px] border-gray-400 px-5 mt-3"
              >
                <div className="flex p-5">
                  <span className="p-2 bg-[#C4DBCC] text-center h-[53px] w-[53px] rounded-full text-lg font-bold ">
                    {i + 1}
                  </span>
                  <div className="flex flex-col ml-5 mt-3">
                    <span className="text-[20px] text-[#195947]">
                      {reminder.name}
                    </span>
                    <span className="mt-3">
                      Send reminder before {reminder.reminderTime} mins of the
                      appointment
                    </span>
                    <span>System: {reminder.reminderSystem}</span>
                    <p>
                      Status :{" "}
                      <span className="text-[#00A811]">{reminder.status}</span>
                    </p>
                  </div>
                </div>
                <div className="mt-16">
                  <button
                    onClick={() => {
                      setView(true);
                      setViewReminder(reminder);
                    }}
                    className="w-[77.13px] h-[28px] text-[12px] bg-[#19525A] text-white rounded-[8px] mr-4"
                  >
                    View
                  </button>
                  <button className="w-[77.13px] h-[28px] text-[12px] bg-[#19525A] text-white rounded-[8px]">
                    Edit
                  </button>
                </div>
              </div>
            ))}
        </div>
        <Notification />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userRemidnerData: state?.userReminder?.info?.allUSerReminder,
    loading: state?.userReminder?.loading,
  };
};
export default connect(mapStateToProps, {
  getUserReminder,
  updateUserReminder,
})(Reminder);
