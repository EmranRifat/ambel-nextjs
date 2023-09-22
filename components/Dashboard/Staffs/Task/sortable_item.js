import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import moment from "moment";
import { connect } from "react-redux";
import cookie from "js-cookie";
import {
  getTask,
  onCancelAction,
  taskUpdate,
  updateSubTask,
} from "../../../../store/actions/task";

const newDesign = [1, 2, 3, 4, 5];

export function Item(props) {
  const item = props.item;
  // console.log(item);
  const [showTasks, setShowTasks] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(item?.isFavourite);

  const taskCompletionRatio = (task) => {
    const completed = task?.tasks?.filter((task) => task?.completed).length;
    const total = task?.tasks?.length;
    return total == 0 ? 0 : Math.round((completed / total ?? 0) * 100) ?? 0;
  };

  const completedTasks = (task) => {
    const completed = task?.tasks?.filter((task) => task?.completed).length;
    return completed;
  };


  const statusClassName = (status) => {
    switch (status) {
      case "processing":
        return "bg-gradient-to-r from-[#F00488] to-[#8E21BE] px-1 rounded-sm text-[10px] text-white";
      case "revision":
        return "bg-gradient-to-r from-[#FABE34] to-[#F65338] px-1 rounded-sm text-[10px] text-white";
      case "completed":
        return "bg-gradient-to-r from-[#44FA34] to-[#169A00] px-1 rounded-sm text-[10px] text-white";
      default:
        return "bg-gradient-to-r from-[#F00488] to-[#8E21BE] px-1 rounded-sm text-[10px] text-white";
    }
  }

  return (
    <div className="flex flex-col cursor-move w-full bg-white mt-5 p-2 rounded-md shadow-lg">
      <div className="flex flex-col">
        {item.cover && (
          <Image src={item.cover} height={"144px"} width={"100%"} alt="card" unoptimized={true} />
        )}
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center ">
            <span className={statusClassName(item.status)}>
              {item.status[0].toUpperCase() + item.status.slice(1)}
            </span>
            <div
              // onClick={() => setIsFavorite(!isFavorite)}
              onClick={() => {
                props
                  .taskUpdateHere(
                    item.isFavorite
                      ? { isFavourite: false }
                      : { isFavourite: true },
                    item._id
                  )
                  .then((res) => {
                    props.getTaskHere();
                  });
              }}
              className="h-[14px] cursor-pointer w-[14px] ml-2 flex items-center"
            >
              {item.isFavourite ? (
                <AiFillStar color="#f0b904" />
              ) : (
                <AiOutlineStar />
              )}
            </div>
          </div>
          <img
            src="/icons/task_edit.png"
            alt="star"
            className="h-[12px] w-[12px] cursor-pointer ml-2"
          />
        </div>
        <span className="text-[14px] text-[#5B5B5B] mt-1">{item.name}</span>
        <span className="text-[12px] text-[#5B5B5B] mt-1">
          {item.description}
        </span>
        <div className="flex items-center justify-start">
          <span className="text-[12px] text-[#5B5B5B]">
            {taskCompletionRatio(item)}%
          </span>
          <div className="w-full bg-gray-200 h-1">
            <div
              style={{ width: `${taskCompletionRatio(item)}%` }}
              className={`bg-gradient-to-r from-[#07BB4F] to-[#9FEA93] h-1`}
            ></div>
          </div>
        </div>
        {showTasks && (
          <div className="flex flex-col py-2">
            {item.tasks.map((subtask) => (
              <div
                onClick={() => {
                  props
                    .updateSubTask(!subtask.completed, item._id, subtask._id)
                    .then((_) => {
                      props.getTaskHere();
                    });
                }}
                key={subtask._id}
                className="flex items-center mt-1 cursor-pointer"
              >
                <img
                  src={
                    subtask.completed
                      ? "/icons/green_tick.png"
                      : "/icons/grey_tick.png"
                  }
                  alt=""
                />
                <span className="text-[10px] ml-1">{subtask.text}</span>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/icons/comments.png"
              alt=""
              className="h-[12px] w-[12px]"
            />
            <span className="ml-1">{item.files?.length ?? 0}</span>
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setShowTasks(!showTasks)}
          >
            <img src="/icons/select.png" alt="" className="h-[12px] w-[12px]" />
            <span className="ml-1 hover:text-teal-400">
              {completedTasks(item)}/{item.tasks.length}
            </span>
          </div>
          <div className="flex items-center">
            <img src="/icons/clock.png" alt="" className="h-[12px] w-[12px]" />
            <span className="text-[#00A507] text-[12px] ml-1">
              {item.dueDate
                ? moment(item.dueDate).format("DD MMM, YYYY")
                : "No Due Date"}
            </span>
          </div>
          <div className="flex -space-x-2.5">
            {item.privacy.map((privacy, index) =>
              privacy.photo ? (
                <img
                  key={privacy._id}
                  className="w-5 h-5 rounded-full border-[1px] border-white"
                  src={privacy.photo}
                  alt=""
                />
              ) : (
                <div
                  key={privacy._id}
                  className="w-5 h-5 rounded-full border-[1px] border-white bg-emerald-500 text-[10px] text-white flex justify-center items-center"
                >
                  {privacy?.fullName[0].toUpperCase()}
                </div>
              )
            )}
            {item.privacy.length > 3 && (
              <a
                className="flex justify-center items-center w-5 h-5 text-[7px] font-medium text-white bg-gray-700 rounded-full border-[1px] border-white hover:bg-gray-600"
                href="#"
              >
                +{item.privacy.length - 3}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const SortableItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.item });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "100%",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item
        item={props.item}
        taskUpdateHere={props.taskUpdate}
        getTaskHere={props.getTask}
        updateSubTask={props.updateSubTask}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state?.task?.loading,
    task: state?.task,
    business: state?.business?.info?.business,
  };
};
export default connect(mapStateToProps, {
  taskUpdate,
  onCancelAction,
  getTask,
  updateSubTask,
})(SortableItem);
