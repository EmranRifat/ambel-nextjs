import React, { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Dropdown from "../../../Dropdown";
import Modal from "../../../Modal";
import AddTaskModal from "./AddTaskModal";
import DragAndDropContainer from "./DragAndDropContainer";
const Task = () => {
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [date, setDate] = useState('');
  const [search, setSearch] = useState('');
  const [dateSelect, setDateSelect] = useState(false);
  const [searhSelect, setSearchSelect] = useState(false);
  const [tasks, setTasks] = useState({
    processing: [],
    revision: [],
    completed: [],
  });
  const [prev, setPrev] = useState({
    processing: [],
    revision: [],
    completed: [],
  });
  const [dateRes, setDateRes] = useState({
    processing: [],
    revision: [],
    completed: [],
  });
  const [searchRes, setSearchRes] = useState({
    processing: [],
    revision: [],
    completed: [],
  });

  const handleTaskSearch = e => {
    let val = e.target.value;
    setSearch(val);
    setSearchSelect(true)

    setPrev(prevtask => {
      let pro = [], re = [], com = [];
      if (dateSelect) {
        // console.log("DateRes", dateRes)
        pro = dateRes.processing.filter(p => p.name.toLowerCase().includes(val));
        re = dateRes.revision.filter(p => p.name.toLowerCase().includes(val));
        com = dateRes.completed.filter(p => p.name.toLowerCase().includes(val));
      }
      else {
        pro = tasks.processing.filter(p => p.name.toLowerCase().includes(val));
        re = tasks.revision.filter(p => p.name.toLowerCase().includes(val));
        com = tasks.completed.filter(p => p.name.toLowerCase().includes(val));
      }

      setSearchRes({
        processing: pro,
        revision: re,
        completed: com,
      })



      return {
        processing: pro,
        revision: re,
        completed: com,
      }
    })


  }

  const handleDateSearch = e => {
    let val = e.target.value;
    setDate(val);
    setDateSelect(true)

    setPrev(prevtask => {
      let d = new Date(val).getTime();
      let pro = [], re = [], com = [];
      if (searhSelect) {
        pro = searchRes.processing.filter(p => new Date(p.dueDate).getTime() === d);
        re = searchRes.revision.filter(p => new Date(p.dueDate).getTime() === d);
        com = searchRes.completed.filter(p => new Date(p.dueDate).getTime() === d);
      }
      else {
        pro = tasks.processing.filter(p => new Date(p.dueDate).getTime() === d);
        re = tasks.revision.filter(p => new Date(p.dueDate).getTime() === d);
        com = tasks.completed.filter(p => new Date(p.dueDate).getTime() === d);
      }
      setDateRes({
        processing: pro,
        revision: re,
        completed: com,
      })


      return {
        processing: pro,
        revision: re,
        completed: com,
      }
    })


  }

  const resetAllTasks = e => {
    e.preventDefault();
    setPrev({ ...tasks });
    setDateSelect(false);
    setSearchSelect(false);
    setDate('');
    setSearch('');
    setDateRes({
      processing: [],
      revision: [],
      completed: [],
    });
    setSearchRes({
      processing: [],
      revision: [],
      completed: [],
    });

  }


  return (
    <div className="min-w-[720px]">
      <div className="w-full flex justify-between">
        {openTaskModal && (
          <Modal onClick={setOpenTaskModal}>
            <AddTaskModal setOpenTaskModal={setOpenTaskModal} />
          </Modal>
        )}
        <span className="text-[32px] font-[700] text-[#5B5B5B]">Task </span>
        <button
          onClick={() => setOpenTaskModal(true)}
          className="text-[20px] w-[120px] h-[40px] bg-[#19525A] text-white rounded-[8px]"
          type="button"
        >
          New Task
        </button>
      </div>
      <div className="w-full flex justify-between bg-[#F0F3FC] shadow-lg shadow-slate-600 p-3 mt-3 rounded-md">
        <div className="flex justify-between gap-3">

          <Dropdown
            items={["All staffs", "Staff-1", "Staff-2", "Staff-3"]}
            selected={"All Staff"}
            onSelected={(item) => console.log(item)}
            width={"136px"}
          />
          <input
            type="date"
            value={date}
            className="w-[136px] h-[40px] px-2 text-[#5B5B5BB2] bg-[#F0F3FC]  outline-none border-[.2px] border-[#19525A80] rounded-md shadow-md"
            onChange={handleDateSearch}
          />
        </div>
        <div className="flex justify-between items-center">
          <input
            type="text"
            value={search}
            placeholder="Search task"
            className="w-[358px] h-[32px] rounded-2xl px-2 outline-none focus:border-gray-400 border-[1px] border-[#42424280] mx-2"
            onChange={handleTaskSearch}
          />

          <button
            onClick={resetAllTasks}
            className="text-[17px] w-[70px] h-[40px] text-white rounded-[8px]"
            type="button"
          >
            <p className="text-[#19525A]">Reset</p>
          </button>

        </div>
      </div>
      <div className="p-4 bg-white">
        <DragAndDropContainer getAllTasks={setTasks} prev={prev} handleSetPrev={setPrev} />
      </div>
    </div>
  );
};

export default Task;
