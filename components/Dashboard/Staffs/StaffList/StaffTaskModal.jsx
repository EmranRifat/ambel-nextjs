import DragAndDropContainer from "../Task/DragAndDropContainer";

const StaffTaskModal = (props) => {
	return (
		<div className="w-[996px] bg-white py-2 rounded-lg h-fit min-h-[94vh] px-4">
			<div className="w-full flex justify-between items-start">
				<p className="pt-3">Task of MD. Tazul Islam</p>
				<span
					onClick={() => {
						props.setOpenTaskModal(false);
					}}
					className="text-2xl text-[#5B5B5B] cursor-pointer"
				>
					✖
				</span>
			</div>
			<DragAndDropContainer />
		</div>
	);
};

export default StaffTaskModal;
