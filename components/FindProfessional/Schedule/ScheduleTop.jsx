import Image from "next/image";
import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import Modal from "../../Modal";
import ConflictModal from "./ConflictModal";
import CreateSchedule from "./CreateSchedule";
import Drawer from "./Drawer";
import RequestListDrawer from "./RequestListDrawer";
import ScheduleRejectModal from "./ScheduleRejectModal";
import ScheduleSettings from "./ScheduleSettings";
import WaitListDrawer from "./WaitListDrawer";

const ScheduleTop = () => {
  const [requestList, setRequestList] = useState(false);
  const [rejectList, setRejectList] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [waitList, setWaitList] = useState(false);
  const [conflict, setConflict] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  return (
    <React.Fragment>
      <Drawer isOpen={openCreate} setIsOpen={setOpenCreate}>
        <CreateSchedule
          setOpenCreate={setOpenCreate}
          setConflict={setConflict}
        />
      </Drawer>

      <Drawer isOpen={requestList} setIsOpen={setRequestList}>
        <RequestListDrawer
          setRequestList={setRequestList}
          rejectList={rejectList}
          setRejectList={setRejectList}
        />
      </Drawer>

      <Drawer isOpen={waitList} setIsOpen={setWaitList}>
        <WaitListDrawer setWaitList={setWaitList} />
      </Drawer>

      <Drawer isOpen={openSettings} setIsOpen={setOpenSettings}>
        <ScheduleSettings setOpenSettings={setOpenSettings} />
      </Drawer>
      
      {rejectList && (
        <Modal>
          <ScheduleRejectModal setRejectList={setRejectList} />
        </Modal>
      )}
      {conflict && (
        <Modal>
          <ConflictModal setConflict={setConflict} />
        </Modal>
      )}
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center ml-8">
          <span className="text-[#5B5B5B] text-[20px] font-[500] mr-3">
            Thur Sep 29 -Wed Oct 5, 2022
          </span>
          <Image
            src="/calendar.png"
            height={20}
            width={20}
            alt="calendar"
            className="cursor-pointer"
          />
        </div>
        <div className="flex items-center mr-5">
          
        </div>
      </div>
    </React.Fragment>
  );
};

export default ScheduleTop;
