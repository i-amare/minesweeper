import React, { useState } from "react";
import TileNode from "./scripts/Tile";
import "./App.css";
import Grid from "./components/grid/Grid";

function App() {
	const [gridWidthState, setGridWidthState] = useState(8);
	const [gridHeightState, setGridHeightState] = useState(12);
	const [tileArrState, setTileArrState] = useState(
		createGrid(gridWidthState, gridHeightState)
	);

	/**
	 * Creates a new grid of tiles with the specidied width and height
	 * @param gridWidth The width of the grid
	 * @param gridHeight The height of the grid
	 * @returns A new grid of tiles with the specidied height and width
	 */

	function createGrid(gridWidth: number, gridHeight: number) {
		let grid: TileNode[][] = [];
		for (let i = 0; i < gridHeight; i++) {
			let row: TileNode[] = [];
			for (let j = 0; j < gridWidth; j++) {
				row.push(new TileNode());
			}
			grid.push([...row]);
		}
		return grid;
	}

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
		console.log(`Tile Row :${tileRow} \nTile Col: ${tileCol}`);
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
