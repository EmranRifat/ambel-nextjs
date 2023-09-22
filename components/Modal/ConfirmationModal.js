import Modal from ".";

const ConfirmationModal = ({
	title,
	message,
	onConfirm,
	onCancel,
	setShowModal,
}) => {
	return (
		<Modal closeOnOutsideClick={false} onClick={setShowModal}>
			<div className="bg-white rounded-lg  min-w-[600px] h-[300px] relative ">
				<div className="absolute top-2 right-2 ">
					<span
						onClick={() => setShowModal(false)}
						className="text-[24px] cursor-pointer text-white"
					>
						✖
					</span>
				</div>

				<div className="p-2 pl-2 border-b bg-[#DC0000] rounded-t-[8px] ">
					<h3 className="text-[24px]  text-white">Confirmation</h3>
				</div>
				<div className="flex justify-center mt-[10px]">
					<div className="w-[60px] h-[60px] border-[5px] border-[#DC0000] rounded-full flex justify-center items-center">
						<span className="text-[#DC0000] text-3xl font-bold">
							✖
						</span>
					</div>
				</div>
				<div className="text-center text-[#424242] mt-[4px]">
					<p className="text-[24px]">Are you sure ?</p>
					<p className="leading-7">Do you really want to delete this record?
						<br />
						This process can not be undone. </p>
				</div>
				<div className="flex justify-end mt-6 gap-5">
					<button
						className="bg-[#DC0000] text-white px-4 py-2 rounded-lg w-[100px] h-[36px] flex justify-center items-center"
						onClick={onConfirm}
					>
						Delete
					</button>
					<button
						className="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg  mr-[20px] w-[100px] h-[36px] flex justify-center items-center"
						onClick={onCancel}
					>
						Cancel
					</button>

				</div>
			</div>
		</Modal >
	);
};

export default ConfirmationModal;
