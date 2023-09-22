const ToggleApt = ({ checked, setChecked }) => {
  return (
    <div
      className={`h-[12px] rounded-[12px] flex items-center justify-between border-2 ${
        checked
          ? "none bg-[#A0D9B4]  p-1"
          : "flex-row-reverse  py-1 bg-[#BBBBBB]"
      }  rounded-full cursor-pointer`}
      onClick={() => setChecked(!checked)}
    >
      <div className={`${checked ? "" : "m-1"} text-[14px] w-[20px]`}>
        {/* {checked ? "Private" : "Public"} */}
      </div>
      {/* Switch */}
      <div
        className={`bg-[#195947] h-[15px] w-[15px] rounded-full shadow-md transform duration-300 ease-in-out" +
            ${checked ? "translate-x-1" : null}
          `}
      ></div>
    </div>
  );
};

export default ToggleApt;
