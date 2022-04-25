import React, { useState } from "react";
import Tile from "./scripts/Tile";
import "./App.css";
import Grid from "./components/grid/Grid";
import Vendor from "./scripts/Vendor";

function App() {
	const [gridWidthState, setGridWidthState] = useState(9);
	const [gridHeightState, setGridHeightState] = useState(12);
	const [bombState, setBombState] = useState(15);
	const [tileArrState, setTileArrState] = useState(
		Vendor.createGrid(gridWidthState, gridHeightState, bombState)
	);


	/**
	 * Handles the logic of tile clicks
	 * @param tileRow The row of the tile on the grid
	 * @param tileCol The row of the coloumn of the tile on the grid
	 */
	function onTileClick(tileRow: number, tileCol: number) {
		const newTileArrState = [...tileArrState];
		// Clears tile if not flagged or already cleared
		const tile = newTileArrState[tileRow][tileCol];
		if (!(tile.flagged || tile.cleared)) {
			tile.cleared = true;
		}
		setTileArrState(newTileArrState);
	}

	return (
		<div className="App">
			<Grid
				tileArrState={tileArrState}
				gridHeight={gridHeightState}
				gridWidth={gridWidthState}
				tileEventHandler={onTileClick}
			/>
		</div>
	);
}

export default App;
