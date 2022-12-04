import Tile from "./Tile";

interface gridDimmensions {
	width: number;
	height: number;
}

interface tileCoords {
	x: number;
	y: number;
}

/**
 * The home of all the spaghetti code that makes the app run. Sorry to all who have to see it and God bless this mess
 */
const Game = {
	/**
	 * Creates a new grid of tiles with the specidied dimmensions and populates it with bombs
	 * @param gridDimmensions The dimmensions of the grid
	 * @param	bombs The number of bombs to be placed in the grid
	 * @returns A new grid of tiles with the specidied height and width
	 */
	createGrid(gridDimmensions: gridDimmensions, bombs: number) {
		let grid: Tile[][] = [];

		// Creates 2 dimmensional array of block
		for (let i = 0; i < gridDimmensions.height; i++) {
			let row: Tile[] = [];
			for (let j = 0; j < gridDimmensions.width; j++) {
				row.push(new Tile());
			}
			grid.push([...row]);
		}

		// Populates the grid with bombs
		for (let i = 0; i < bombs; i++) {
			let ranRow = Math.floor(Math.random() * gridDimmensions.height);
			let ranCol = Math.floor(Math.random() * gridDimmensions.width);
			// Prevents an already rigged square from being counted again
			grid[ranRow][ranCol].rigged ? i-- : (grid[ranRow][ranCol].rigged = true);
		}

		return grid;
	},
	/**
	 * Checks the number of bombs within a one block radius of the specified tile
	 * @param coords The x and y coordinate of the tile
	 * @param grid The grid state
	 * @returns The number of bombs within a one block radius of the specidied co-ords
	 */
	checkBombs(coords: tileCoords, grid: Tile[][]) {
		let numBombs = 0;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				try {
					if (grid[coords.x + i][coords.y + j].rigged) {
						numBombs++;
					}
				} catch (e) {
					console.log("This bug is intentional. Too lazy to fix it:\n", e);
				}
			}
		}
		return numBombs;
	},
	checkFlags(coords: tileCoords, grid: Tile[][]) {
		let numFlags = 0;
		const tile = grid[coords.x][coords.y];
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				try {
					if (grid[coords.x + i][coords.y + j].flagged) {
						numFlags++;
					}
				} catch (e) {
					console.log("This bug is intentional. Too lazy to fix it:\n", e);
				}
			}
		}
		return numFlags >= tile.bombProx;
	},
	/**
	 * Clears all blocks within a 1 tile radius
	 * @param coords The x and y coordinate of the tile
	 * @param grid The grid state
	 */
	clear(coords: tileCoords, grid: Tile[][]) {
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				try {
					const tile = grid[coords.x + i][coords.y + j];
					if (!(tile.cleared || tile.flagged)) {
						tile.bombProx = this.checkBombs(
							{ x: coords.x + i, y: coords.y + j },
							grid
						);
						tile.cleared = true;
						if (tile.bombProx === 0)
							this.clear({ x: coords.x + i, y: coords.y + j }, grid);
					}
				} catch (e) {
					console.log("This bug is intentional. Too lazy to fix it:\n", e);
				}
			}
		}
	},
	clearAll(grid: Tile[][]) {
		for (let row of grid) {
			for (let tile of row) {
				tile.cleared = true;
			}
		}
	}
};

export default Game;
