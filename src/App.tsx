import React, { CSSProperties, useEffect, useState } from "react";
import Tile from "./scripts/Tile";
import "./App.css";
import Grid from "./components/grid/Grid";
import Bar from "./components/bar/Bar";
import Toggle from "./components/toggle/Toggle";
import Vendor from "./scripts/Vendor";

interface tileCoords {
	x: number;
	y: number;
}

function App() {
	// Grid states
	const [gridDimmensions, setGridDimmensions] = useState({
		width: 24,
		height: 18,
	});
	const [bombsPresent, setBombsPresent] = useState(
		Math.round(gridDimmensions.width * gridDimmensions.height * 0.15)
	);
	const [gridState, setGridState] = useState(
		Vendor.createGrid(gridDimmensions, bombsPresent)
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
		setGridState(Vendor.createGrid(gridDimmensions, bombsPresent));
		setBombsLeft(bombsPresent);
		setStartTimeState(new Date().getTime());
	}

	/**
	 * Handles the logic of tile clicks
	 * @param coords The x and y coordinate of the tile
	 */
	function onTileClick(tileCoords: tileCoords) {
		let newGridState = [...gridState];
		const tile = newGridState[tileCoords.x][tileCoords.y];
		if (tile.cleared) return;
		tile.bombProx = Vendor.checkBombs(tileCoords, newGridState);

		if (flagModeState) {
			// Toggles tile flag state
			tile.flagged = !tile.flagged;
			setBombsLeft(tile.flagged ? bombsLeft - 1 : bombsLeft + 1);
		} else {
			// Clears tile if not flagged or already cleared
			if (!tile.flagged) {
				tile.cleared = true;
				if (tile.bombProx === 0) Vendor.clear(tileCoords, gridState);
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
