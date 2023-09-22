import React from "react";

export const PageContainer = (props) => {
	return (
		<React.Fragment>
			<div className="max-w-[1440px] pt-[120px] pr-[20px] m-auto">
				{props.children}
			</div>
		</React.Fragment>
	);
};
