import { useEffect, useState } from "react";
import Container from "./Container";
import { Item } from "./sortable_item";
import {
	closestCorners,
	DndContext,
	DragOverlay,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { connect } from "react-redux";
import cookie from "js-cookie";
import {
	getTask,
	onCancelAction,
	taskUpdate,
} from "../../../../store/actions/task";
import axios from "../../../../utils/axios";

const DragAndDropContainer = (props) => {
	useEffect(() => {
		resetTaskItems();
		props.task?.map((item) => {
			// console.log(item.status)
			props.handleSetPrev((prevState) => {
				// console.log("Print from props.handleSetPrev ", item.status,prevState[item.status]);
				let newArr;
				if (prevState[item.status].length > 0) {
					newArr = [...prevState[item.status], item];
				} else {
					newArr = [item];
					prevState[item.status];
				}
				return {
					...prevState,
					[item.status]: newArr,
				};
			});
			props.getAllTasks((prevState) => {
				// console.log("Print from props.handleSetPrev ", item.status,prevState[item.status]);
				let newArr;
				if (prevState[item.status].length > 0) {
					newArr = [...prevState[item.status], item];
				} else {
					newArr = [item];
					prevState[item.status];
				}
				return {
					...prevState,
					[item.status]: newArr,
				};
			})
		});


	}, [props.task]);
	useEffect(() => {
		props.getTask();
	}, []);

	const resetTaskItems = () => {
		props.handleSetPrev({
			processing: [],
			revision: [],
			completed: [],
		});
		props.getAllTasks({
			processing: [],
			revision: [],
			completed: [],
		});
	};


	const [activeItem, setActiveItem] = useState();

	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 5,
			},
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				distance: 5,
			},
		})
	);


	return (
		<div className="flex justify-between gap-3 h-full w-full">
			<DndContext
				sensors={sensors}
				collisionDetection={closestCorners}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
			>
				<Container
					containerId="processing"
					items={props.prev.processing}
					title="In Processing"
				/>
				<Container
					containerId="revision"
					items={props.prev.revision}
					title="In Revision"
				/>
				<Container
					containerId="completed"
					items={props.prev.completed}
					title="Completed"
				/>
				<DragOverlay>
					{activeItem ? <Item item={activeItem} /> : null}
				</DragOverlay>
			</DndContext>
		</div>
	);

	function findContainer(id) {
		if (id in props.prev) {
			return id;
		}

		return Object.keys(props.prev).find((key) => props.prev[key].includes(id));
	}

	function handleDragStart(event) {
		const { active } = event;
		const { id } = active;

		setActiveItem(id);
	}

	function handleDragOver(event) {
		const { active, over, draggingRect } = event;
		const { id } = active;
		const { id: overId } = over;

		// Find the containers
		const activeContainer = findContainer(id);
		const overContainer = findContainer(overId);

		if (
			!activeContainer ||
			!overContainer ||
			activeContainer === overContainer
		) {
			return;
		}

		props.handleSetPrev((prev) => {
			const activeItems = prev[activeContainer];
			const overItems = prev[overContainer];

			// Find the indexes for the items
			const activeIndex = activeItems.indexOf(id);
			const overIndex = overItems.indexOf(overId);

			let newIndex;
			if (overId in prev) {
				// We're at the processing droppable of a container
				newIndex = overItems.length + 1;
			} else {
				const isBelowLastItem =
					over &&
					overIndex === overItems.length - 1 &&
					draggingRect?.offsetTop > over.rect.offsetTop + over.rect.height;

				const modifier = isBelowLastItem ? 1 : 0;

				newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
			}

			return {
				...prev,
				[activeContainer]: [
					...prev[activeContainer].filter((item) => item !== active.id),
				],
				[overContainer]: [
					...prev[overContainer].slice(0, newIndex),
					props.prev[activeContainer][activeIndex],
					...prev[overContainer].slice(newIndex, prev[overContainer].length),
				],
			};
		});
	}

	function handleDragEnd(event) {
		const { active, over } = event;
		const { id } = active;
		const { id: overId } = over;
		// console.log(active);
		const containerName = active.data.current.sortable.containerId;
		const activeContainer = findContainer(id);
		const overContainer = findContainer(overId);

		props.taskUpdate({ status: containerName }, id._id).then((res) => {
			// console.log(res);
			props.getTask();
		});

		if (
			!activeContainer ||
			!overContainer ||
			activeContainer !== overContainer
		) {
			return;
		}

		const activeIndex = props.prev[activeContainer].indexOf(active.id);
		const overIndex = props.prev[overContainer].indexOf(overId);
		if (activeIndex !== overIndex) {
			let arr = arrayMove(props.prev[overContainer], activeIndex, overIndex);
			// console.log(arr);
			props.handleSetPrev((items) => ({
				...items,
				[overContainer]: arr,
			}));
		}

		setActiveItem(null);
	}
};

const mapStateToProps = (state) => {
	return {
		loading: state?.task?.loading,
		task: state?.task?.task?.data,
	};
};
export default connect(mapStateToProps, {
	taskUpdate,
	onCancelAction,
	getTask,
})(DragAndDropContainer);
