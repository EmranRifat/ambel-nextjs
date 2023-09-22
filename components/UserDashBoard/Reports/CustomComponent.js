import { forwardRef } from "react";
import calendar from "../../../public/icons/calendar.png";

const CustomComponent = (placeHolder, style = "w-[101px]") =>
{
    const cstmcomp=({ value, onClick }, ref) =>{
        return (
          <div
            className={`flex justify-between ${style} h-8 bg-white border-[1px] border-[#19525A80]/50 rounded-[8px] p-2 leading-[18px] ml-[17px]`}
            onClick={onClick}
            ref={ref}
          >
            <span className="text-[12px] text-[#5B5B5BB2]/70 font-normal">
              {value == "" ? placeHolder : value}
            </span>
            <img src={calendar.src} className="py-[2px]" />
          </div>
        );
      }
      cstmcomp.displayName="cstmcomp";
    return forwardRef(cstmcomp);
}
  ;
CustomComponent.displayName = "CustomComponent";

export default CustomComponent;
