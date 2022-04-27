import React, { CSSProperties, useEffect, useState } from "react";
import Tile from "./scripts/Tile";
import "./App.css";
import Grid from "./components/grid/Grid";
import Bar from "./components/bar/Bar";
import Toggle from "./components/toggle/Toggle";
import Vendor from "./scripts/Vendor";

function App() {
	// Grid states
	const [gridDimmensions, setGridDimmensions] = useState([24, 18]);
	const [bombsPresent, setBombsPresent] = useState(
		Math.round(gridDimmensions[0] * gridDimmensions[1] * 0.15)
	);
	const [gridState, setGridState] = useState(
		Vendor.createGrid(gridDimmensions[0], gridDimmensions[1], bombsPresent)
	);

	// Flag and bomb states
	const [flagModeState, setFlagModeState] = useState(false);
	const [bombsLeft, setBombsLeft] = useState(bombsPresent);

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

	/**
	 * Toggles flag mode
	 */
	function toggleFlagMode() {
		setFlagModeState(!flagModeState);
	}

	/**
	 * Resetss all game variables
	 */
	function resetGame() {
		setGridState(
			Vendor.createGrid(gridDimmensions[1], gridDimmensions[0], bombsPresent)
		);
		setBombsLeft(bombsPresent);
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
			// Toggles tile flag state
			tile.flagged = !tile.flagged;
			setBombsLeft(tile.flagged ? bombsLeft - 1 : bombsLeft + 1);
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
				setBombsLeft(tile.flagged ? bombsLeft - 1 : bombsLeft + 1);
			}
		}
		setGridState(newGridState);
	}

	const AppStyling: CSSProperties = {
		display: "flex",
		flexDirection: "column",
		alignContent: "center",
		justifyContent: "space-between",
		minHeight: "90vh",
	};

	return (
		<div className="App" style={AppStyling}>
			<Bar
				timeElapsed={timeElapsedState}
				bombsLeft={bombsLeft}
				resetGame={resetGame}
			/>
			<Grid gridState={gridState} tileEventHandler={onTileClick} />
			<Toggle flagMode={flagModeState} toggleFlagMode={toggleFlagMode} />
		</div>
	);
}

export default App;
