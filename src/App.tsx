import React, { useState } from "react";
import Tile from "./scripts/Tile";
import "./App.css";
import Grid from "./components/grid/Grid";
import Vendor from "./scripts/Vendor";

function App() {
	const [gridWidthState, setGridWidthState] = useState(12);
	const [gridHeightState, setGridHeightState] = useState(18);
	const [bombState, setBombState] = useState(50);
	const [gridState, setGridState] = useState(
		Vendor.createGrid(gridWidthState, gridHeightState, bombState)
	);

	/**
	 * Handles the logic of tile clicks
	 * @param tileRow The row of the tile on the grid
	 * @param tileCol The row of the coloumn of the tile on the grid
	 */
	function onTileClick(tileRow: number, tileCol: number) {
		let newGridState = [...gridState];

		// Clears tile if not flagged or already cleared
		const tile = newGridState[tileRow][tileCol];
		if (!(tile.flagged || tile.cleared)) {
			tile.bombProx = Vendor.checkBombs(tileRow, tileCol, newGridState);
			tile.cleared = true;
		}
		setGridState(newGridState);
	}

	return (
		<div
			className="App"
			style={{
				display: "grid",
				alignContent: "center",
				justifyContent: "center",
			}}
		>
			<Grid
				tileArrState={gridState}
				gridHeight={gridHeightState}
				gridWidth={gridWidthState}
				tileEventHandler={onTileClick}
			/>
		</div>
	);
}

export default App;
