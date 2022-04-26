import React, { useEffect, useState } from "react";
import Tile from "./scripts/Tile";
import "./App.css";
import Grid from "./components/grid/Grid";
import Bar from "./components/bar/Bar";
import Vendor from "./scripts/Vendor";

function App() {
	// Grid states
	const [gridWidthState, setGridWidthState] = useState(18);
	const [gridHeightState, setGridHeightState] = useState(24);
	const [bombState, setBombState] = useState(
		Math.round(gridWidthState * gridHeightState * 0.15)
	);
	const [gridState, setGridState] = useState(
		Vendor.createGrid(gridWidthState, gridHeightState, bombState)
	);

	// Timer states
	const [startTimeState, setStartTimeState] = useState(new Date().getTime());
	const [timeElapsedState, setTimeElapsedState] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setTimeElapsedState(new Date().getTime() - startTimeState);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [startTimeState]);

	function resetGame() {
		setGridState(Vendor.createGrid(gridWidthState, gridHeightState, bombState));
		setStartTimeState(new Date().getTime());
	}

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
		if (tile.bombProx === 0) {
			Vendor.clear(tileRow, tileCol, newGridState);
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
			<Bar timeElapsed={timeElapsedState} bombsLeft={bombState} reset={resetGame} />
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
