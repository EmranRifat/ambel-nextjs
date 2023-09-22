import { useState } from "react";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(text.length > 145);

  return (
    <>
      <p className="text inline">{isReadMore ? text.slice(0, 130) : text}</p>
      <span
        className="text-[#f2f2f2/50] italic cursor-pointer"
        onClick={() => {
          setIsReadMore(!isReadMore);
        }}
      >
        {isReadMore ? "...read more" : "  show less"}
      </span>
    </>
  );
};

export default ReadMore;
