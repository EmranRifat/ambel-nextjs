import { useEffect } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { BsCurrencyDollar, BsFillCreditCard2BackFill } from "react-icons/bs";
import { FaGlobe } from "react-icons/fa";
import ReadMore from "./ReadMore";

const Service = () => {
  const testdata = [1, 2, 3, 4, 5, 6, 7];
  useEffect(() => {}, []);
  return (
    <div className="flex flex-start flex-wrap justify-between">
      {testdata.map((item, index) => {
        return (
          <div
            className="p-[15px] w-[400px]  bg-[#19525a] text-[#fff] mb-[20px] rounded-[20px]"
            key={index}
          >
            <p className="mb-[10px]">
              <b>Service Heading</b>
            </p>
            <p className="mb-[10px]">
              <ReadMore>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Suscipit quae facilis aspernatur ut distinctio perspiciatis
                voluptatem molestiae, consequuntur eius nobis minus! Sequi
                dolores aliquid magni delectus aspernatur amet eius voluptatum.
              </ReadMore>
            </p>
            <div className="mb-0">
              <div className="inline-block w-[25%]  text-center mx-auto">
                <AiFillClockCircle className="inline mr-[10px] relative -top-[2px]" />
                <span>45 min</span>
              </div>
              <div className="inline-block w-[25%] text-center mx-auto">
                <BsFillCreditCard2BackFill className="inline mr-[10px] relative -top-[2px]" />
                <span>Prepaid</span>
              </div>
              <div className="inline-block w-[25%] text-center mx-auto">
                <FaGlobe className="inline mr-[10px] relative -top-[2px]" />
                <span>Online</span>
              </div>
              <div className="inline-block w-[25%] text-center mx-auto">
                <BsCurrencyDollar className="inline mr-[5px] relative -top-[2px]" />
                <span>150</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Service;
