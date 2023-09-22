const Toggle = ({ checked, setChecked }) => {
  return (
    <div
      className={`w-[77px] h-[32px] rounded-[16px] flex items-center justify-between border-2 ${checked
        ? "none bg-[#A0D9B4]  p-2"
        : "flex-row-reverse  p-1 bg-[#E7E7E7;]"
        }  rounded-full cursor-pointer`}
      onClick={() => setChecked(!checked)}
    >
      <div className="m-1 text-[#195947]">{checked ? "Yes" : "No"}</div>
      {/* Switch */}
      <div
        className={`bg-[#195947] h-[22.75px] w-[22.75px] rounded-full shadow-md transform duration-300 ease-in-out" +
            ${checked ? "translate-x-1" : null}
          `}
      ></div>
    </div>
  );
};

export default Toggle;
