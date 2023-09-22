import React, { useEffect } from "react";
import { QrCode } from "../components/QrCode";
const Container = ({ children, style, startingId, numberofCells }) => {
	// console.log(children);
	useEffect(() => {
		const cell2 = document.getElementById(startingId);

		const container = document.createElement("div");
		// container.style = style.color
		container.style.position = "absolute";
		container.style.top = `${cell2.offsetTop}px`;
		container.style.left = `${cell2.offsetLeft}px`;
		container.style.width = `${cell2.offsetWidth}px`;
		container.style.height = `${cell2.offsetHeight * numberofCells}px`;
		container.style.backgroundColor = "red";
		container.style.color = style.color;
		container.append(children);
		container.style.alignItems = "center";
		container.style.display = "flex";
		container.style.justifyContent = "center";
		container.addEventListener("click", () => {
			// console.log("Clicked on event");
		});
		cell2.parentElement?.appendChild(container);
	}, []);

	return null;
};

const Table = () => {
	return (
		<table>
			<thead>
				<tr>
					<th>Column 1</th>
					<th>Column 2</th>
					<th>Column 3</th>
					<th>Column 4</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td style={{ border: "1px solid", width: "120px" }}>Row 1, Cell 1</td>
					<td style={{ border: "1px solid", width: "120px" }}>Row 1, Cell 2</td>
					<td style={{ border: "1px solid", width: "120px" }}>Row 1, Cell 3</td>
					<td style={{ border: "1px solid", width: "120px" }}>Row 1, Cell 4</td>
				</tr>
				<tr>
					<td style={{ border: "1px solid", width: "120px" }}>Row 2, Cell 1</td>
					<td style={{ border: "1px solid", width: "120px" }} id="cell2">
						Row 2, Cell 2
					</td>
					<td style={{ border: "1px solid", width: "120px" }}>Row 2, Cell 3</td>
					<td style={{ border: "1px solid", width: "120px" }}>Row 2, Cell 4</td>
				</tr>
				<tr>
					<td style={{ border: "1px solid", width: "120px" }}>Row 3, Cell 1</td>
					<td style={{ border: "1px solid", width: "120px" }} id="cell3">
						Row 3, Cell 2
					</td>
					<td style={{ border: "1px solid", width: "120px" }}>Row 3, Cell 3</td>
					<td style={{ border: "1px solid", width: "120px" }}>Row 3, Cell 4</td>
				</tr>
				<tr>
					<td style={{ border: "1px solid", width: "120px" }}>Row 3, Cell 1</td>
					<td style={{ border: "1px solid", width: "120px" }} id="cell4">
						Row 3, Cell 2
					</td>
					<td style={{ border: "1px solid", width: "120px" }}>Row 3, Cell 3</td>
					<td style={{ border: "1px solid", width: "120px" }}>Row 3, Cell 4</td>
				</tr>
			</tbody>
		</table>
	);
};

const App = () => {
	return (
		<div>
			<Container
				style={{ color: "white" }}
				startingId="cell2"
				numberofCells={3}
			>
				Booked
			</Container>
			<Table />
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<QrCode download={true} />
			</div>
		</div>
	);
};

export default App;
