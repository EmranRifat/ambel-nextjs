import Image from "next/image";
import React from "react";

const feeds = [1, 2, 3, 4, 5];
const ProfessionalFeedback = () => {
  return (
    <>
      <div className="w-[720px] h-[450px] border-[1px] shadow-md p-5 flex flex-col">
        {feeds.map((feed) => (
          <div
            key={feed}
            className="w-full flex justify-between border-b-2 p-2"
          >
            <div className="flex  items-start ">
              <Image
                src="/drImage.jpg"
                height={37}
                width={37}
                alt="pic"
                className="rounded-full"
              />
              <div className="flex flex-col text-[#5B5B5B] text-[12px] ml-3">
                <span>Md. Tazul Islam</span>
                <span>Gulshan, Dhaka, BD ; 7 Oct 2022</span>
                <span>Excellenct doctor. Wish you very best of luck.</span>
              </div>
            </div>

            <div className="w-[30%] flex justify-between">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <Image
                    src="/icons/like.png"
                    height={15}
                    width={15}
                    alt="like"
                  />
                  <span className="ml-2 text-[#5B5B5B] text-[12px]">10</span>
                </div>
                <span className="text-[#5B5B5B] text-[12px]">Helpfull</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <Image
                    src="/icons/dislike.png"
                    height={15}
                    width={15}
                    alt="like"
                  />
                  <span className="ml-2 text-[#5B5B5B] text-[12px]">1</span>
                </div>
                <span className="text-[#5B5B5B] text-[12px]">Unhelpfull</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <Image
                    src="/icons/share.png"
                    height={15}
                    width={15}
                    alt="like"
                  />
                  <span className="ml-2 text-[#5B5B5B] text-[12px]">10</span>
                </div>
                <span className="text-[#5B5B5B] text-[12px]">Share</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfessionalFeedback;
