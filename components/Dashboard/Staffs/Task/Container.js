import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./sortable_item";

export default function Container(props) {
	const { containerId, items, title } = props;

	const { setNodeRef } = useDroppable({
		id: containerId,
	});

	return (
		<SortableContext
			id={containerId}
			items={items.map((item) => item.id)}
			strategy={verticalListSortingStrategy}
		>
			<div
				ref={setNodeRef}
				className="w-full p-2 flex flex-col items-start bg-[#E9ECEF] rounded-md mt-2"
			>
				<span className="text-[#5B5B5B] text-[16px] mt-5 ml-2">{title}</span>
				{items.map((item) => (
					<SortableItem key={item.id} item={item} />
				))}
			</div>
		</SortableContext>
	);
}
