import React, { useState } from "react";
import Tile from "./scripts/Tile";
import "./App.css";
import Grid from "./components/grid/Grid";

function App() {
	const [gridWidthState, setGridWidthState] = useState(9);
	const [gridHeightState, setGridHeightState] = useState(12);
	const [bombState, setBombState] = useState(30);
	const [tileArrState, setTileArrState] = useState(
		createGrid(gridWidthState, gridHeightState, bombState)
	);

	/**
	 * Creates a new grid of tiles with the specidied width and height and populates it with bombs
	 * @param gridWidth The width of the grid
	 * @param gridHeight The height of the grid
	 * @param	bombs The number of bombs to be placed in the grid
	 * @returns A new grid of tiles with the specidied height and width
	 */
	function createGrid(gridWidth: number, gridHeight: number, bombs: number) {
		let grid: Tile[][] = [];
		// Creates 2 dimmensional array of block
		for (let i = 0; i < gridHeight; i++) {
			let row: Tile[] = [];
			for (let j = 0; j < gridWidth; j++) {
				row.push(new Tile());
			}
			grid.push([...row]);
		}

		// Populates the grid with bombs
		for (let i = 0; i < bombs; i++) {
			let ranRow = Math.floor(Math.random() * gridHeight);
			let ranCol = Math.floor(Math.random() * gridWidth);
			// Prevents an already rigged square from being counted again
			grid[ranRow][ranCol].rigged ? i-- : (grid[ranRow][ranCol].rigged = true);
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
