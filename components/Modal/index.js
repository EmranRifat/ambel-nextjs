import React, { useRef } from "react";

const Modal = (props) => {
	const setOpen = props.onClick;
	const childWrapperRef = useRef();
	return (
		<div
			ref={childWrapperRef}
			className={`inset-0 fixed top-0 z-40 bg-[#000]/40 ${props.disableBlur ? "" : "backdrop-blur-lg"
				} overflow-y-scroll flex justify-center items-center py-4`}
			onClick={(event) => {
				if (
					event.target == childWrapperRef.current &&
					props.closeOnOutsideClick
				)
					setOpen(false);
			}}
		>
			{props.children}
		</div>
	);
};

export default Modal;
