import React, { useState } from "react";
import data from "./data";

function App() {
	const [selected, setSelected] = useState(null);
	const [enableMultiSelect, setEnableMultiSelect] = useState(false);
	const [multiSelect, setMultiSelect] = useState([]);

	function handleSingleSelection(getCurrentId) {
		setSelected(getCurrentId === selected ? null : getCurrentId);
	}

	function handleEnableMultiSelect() {
		setEnableMultiSelect(!enableMultiSelect);
	}

	function handleMultiSelection(getCurrentId) {
		let cpyMultiSelect = [...multiSelect];
		const findIndexOfCurrentId = cpyMultiSelect.indexOf(getCurrentId);
		if (findIndexOfCurrentId === -1) {
			cpyMultiSelect.push(getCurrentId);
		} else {
			cpyMultiSelect.splice(findIndexOfCurrentId, 1);
		}
		setMultiSelect(cpyMultiSelect);
	}

	return (
		<div className="wrapper">
			<button
				onClick={handleEnableMultiSelect}
				className="multiSelectButton">
				Enable Multi selection
			</button>
			<div className="accordion">
				{data && data.length > 0 ? (
					data.map((dataItem) => (
						<div className="item">
							<div
								onClick={
									enableMultiSelect
										? () =>
												handleMultiSelection(
													dataItem.id
												)
										: () =>
												handleSingleSelection(
													dataItem.id
												)
								}
								className="title">
								<h3>{dataItem.question}</h3>
								<span>+</span>
							</div>
							{selected === dataItem.id ||
							multiSelect.indexOf(dataItem.id) !== -1 ? (
								<div className="answer">{dataItem.answer}</div>
							) : null}
						</div>
					))
				) : (
					<div>No data found</div>
				)}
			</div>
		</div>
	);
}

export default App;
