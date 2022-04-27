import React, { CSSProperties, useEffect, useState } from "react";
import Tile from "./scripts/Tile";
import "./App.css";
import Grid from "./components/grid/Grid";
import Bar from "./components/bar/Bar";
import Toggle from "./components/toggle/Toggle";
import Game from "./scripts/Game";

interface tileCoords {
	x: number;
	y: number;
}

function App() {
	// Grid states
	const [gridDimmensions, setGridDimmensions] = useState({
		width: 36,
		height: 22,
	});
	const [bombsPresent, setBombsPresent] = useState(
		Math.round(gridDimmensions.width * gridDimmensions.height * 0.15)
	);
	const [gridState, setGridState] = useState(
		Game.createGrid(gridDimmensions, bombsPresent)
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

	useEffect(() => {
		window.addEventListener("keypress", onKeyPress);
		window.addEventListener("keydown", onKeyDown);
		window.addEventListener("keyup", onKeyUp);

		return () => {
			window.removeEventListener("keydown", onKeyDown);
			window.removeEventListener("keydown", onKeyUp);
		};
	}, []);

	function onKeyPress(event: KeyboardEvent) {
		if (event.key === "R" || event.key === "r") resetGame();
		if (event.key === "F" || event.key === "f") toggleFlagMode();
	}

	function onKeyDown(event: KeyboardEvent) {
		if (event.key === "Control") setFlagModeState(true);
	}

	function onKeyUp(event: KeyboardEvent) {
		if (event.key === "Control") setFlagModeState(false);
	}

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
		setGridState(Game.createGrid(gridDimmensions, bombsPresent));
		setBombsLeft(bombsPresent);
		setStartTimeState(new Date().getTime());
	}

	/**
	 * Handles the logic of tile clicks
	 * @param coords The x and y coordinate of the tile
	 */
	function onTileClick(coords: tileCoords) {
		let newGridState = [...gridState];
		const tile = newGridState[coords.x][coords.y];
		if (tile.cleared && Game.checkFlags(coords, newGridState))
			Game.clear(coords, newGridState);
		tile.bombProx = Game.checkBombs(coords, newGridState);

		if (flagModeState && !tile.cleared) {
			// Toggles tile flag state
			tile.flagged = !tile.flagged;
			setBombsLeft(tile.flagged ? bombsLeft - 1 : bombsLeft + 1);
		} else {
			// Clears tile if not flagged or already cleared
			if (!tile.flagged) {
				tile.cleared = true;
				if (tile.bombProx === 0) Game.clear(coords, gridState);
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
