import PropTypes from "prop-types";
import { ToolClass } from "./ToolClass";

export const Tooltip = ({ position, content, children, top }) => (
  <div id="tooltip" className="relative cursor-pointer group ">
    <div className="mx-2 my-1">{children}</div>
    <span
      className={ToolClass(
        "absolute mb-1 hidden group-hover:inline-block bg-neutral-900 text-white text-xs p-2  rounded",
        position === "top"
          ? "left-1/2 -translate-x-1/2 bottom-[calc(100%+5px)]"
          : "",
        position === "bottom"
          ? "left-1/2 -translate-x-1/2 top-[calc(100%+5px)]"
          : "",
        position === "left"
          ? "top-1/2 -translate-y-1/2 right-[calc(100%+5px)]"
          : "",
        position === "right"
          ? "top-1/2 -translate-y-1/2 left-[calc(100%+5px)]"
          : ""
      )}
    >
      <div className="w-[400px] flex text-left">
        {content}
      </div>
    </span>
    <span
      className={`${ToolClass(
        "absolute mb-1  hidden group-hover:inline-block border-[6px]",
        position === "top"
          ? "left-1/2 -translate-x-1/2 bottom-full border-l-transparent border-r-transparent border-b-0 border-t-neutral-900 "
          : "",
        position === "bottom"
          ? "left-1/2 -translate-x-1/2 top-full border-l-transparent border-r-transparent border-t-0 border-b-neutral-900 "
          : "",
        position === "left"
          ? "top-1/2 -translate-y-1/2 right-full border-t-transparent border-b-transparent border-r-0 border-l-neutral-900 "
          : "",
        position === "right"
          ? `${top ? 'top-[-2px]' : "top-1/2"}  '-translate-y-1/2 left-full border-t-transparent border-b-transparent border-l-0 border-r-neutral-900 '`
          : ""
      )} `}
    ></span>
  </div>
);

Tooltip.propTypes = {
  position: PropTypes.oneOf(["top", "bottom", "left", "right"]).isRequired,
  content: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};