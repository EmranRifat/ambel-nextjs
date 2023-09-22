const Toggle = ({ checked, setChecked }) => {
  return (
    <div
      className={`w-[48px] h-[23px] rounded-[16px] flex items-center justify-between ${
        checked
          ? "none bg-[#A0D9B4]  p-2"
          : "flex-row-reverse  p-1 bg-[#E7E7E7]"
      }  rounded-full cursor-pointer`}
      onClick={() => setChecked(!checked)}
    >
      <div className="m-1">{checked ? "" : ""}</div>
      {/* Switch */}
      <div
        className={`bg-[#195947] h-[19px] w-[19px] rounded-full shadow-md transform duration-300 ease-in-out" +
            ${checked ? "translate-x-1" : null}
          `}
      ></div>
    </div>
  );
};

export default Toggle;
