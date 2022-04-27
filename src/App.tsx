import React, { useEffect, useState } from "react";
import Tile from "./scripts/Tile";
import "./App.css";
import Grid from "./components/grid/Grid";
import Bar from "./components/bar/Bar";
import Toggle from "./components/toggle/Toggle";
import Vendor from "./scripts/Vendor";

function App() {
	// Grid states
	const [gridWidthState, setGridWidthState] = useState(24);
	const [gridHeightState, setGridHeightState] = useState(18);
	const [bombState, setBombState] = useState(
		Math.round(gridWidthState * gridHeightState * 0.15)
	);
	const [gridState, setGridState] = useState(
		Vendor.createGrid(gridWidthState, gridHeightState, bombState)
	);

	// Flag mode states
	const [flagModeState, setFlagModeState] = useState(false);
	const [bombsLeftState, setBombsLeftState] = useState(bombState);

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

	function toggleFlagMode() {
		setFlagModeState(!flagModeState);
	}

	function resetGame() {
		setGridState(Vendor.createGrid(gridWidthState, gridHeightState, bombState));
		setBombsLeftState(bombState);
		setStartTimeState(new Date().getTime());
	}

	/**
	 * Handles the logic of tile clicks
	 * @param tileRow The row of the tile on the grid
	 * @param tileCol The row of the coloumn of the tile on the grid
	 */
	function onTileClick(tileRow: number, tileCol: number) {
		let newGridState = [...gridState];
		const tile = newGridState[tileRow][tileCol];

		if (flagModeState) {
			tile.flagged = !tile.flagged;
			setBombsLeftState(tile.flagged ? bombsLeftState - 1 : bombsLeftState + 1);
		} else {
			// Clears tile if not flagged or already cleared
			if (!(tile.flagged || tile.cleared)) {
				tile.bombProx = Vendor.checkBombs(tileRow, tileCol, newGridState);
				tile.cleared = true;
				if (tile.bombProx === 0) {
					Vendor.clear(tileRow, tileCol, newGridState);
				}
			} else {
				tile.flagged = !tile.flagged;
				setBombsLeftState(
					tile.flagged ? bombsLeftState - 1 : bombsLeftState + 1
				);
			}
		}
		setGridState(newGridState);
	}

	return (
		<div
			className="App"
			style={{
				display: "flex",
				flexDirection: "column",
				alignContent: "center",
				justifyContent: "space-between",
				minHeight: "90vh",
			}}
		>
			<Bar
				timeElapsed={timeElapsedState}
				bombsLeft={bombsLeftState}
				reset={resetGame}
			/>
			<Grid
				tileArrState={gridState}
				gridHeight={gridHeightState}
				gridWidth={gridWidthState}
				tileEventHandler={onTileClick}
			/>
			<Toggle flagMode={flagModeState} toggleFlagMode={toggleFlagMode} />
		</div>
	);
}

export default App;
