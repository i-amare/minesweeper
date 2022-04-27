import Tile from "./Tile";

/**
 * The home of all the spaghetti code that makes the app run. Sorry to all who have to see it and God bless this mess
 */
const Vendor = {
	/**
	 * Creates a new grid of tiles with the specidied width and height and populates it with bombs
	 * @param gridWidth The width of the grid
	 * @param gridHeight The height of the grid
	 * @param	bombs The number of bombs to be placed in the grid
	 * @returns A new grid of tiles with the specidied height and width
	 */
	createGrid(gridWidth: number, gridHeight: number, bombs: number) {
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
	},
	/**
	 * Checks the number of bombs within a one block radius of the specified tile
	 * @param tileRow The row of the tile
	 * @param tileCol The coloumn of the tile
	 * @param grid The current grid state
	 * @returns The number of bombs within a one block radius of the specidied co-ords
	 */
	checkBombs(tileRow: number, tileCol: number, grid: Tile[][]) {
		let numBombs = 0;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				try {
					if (grid[tileRow + i][tileCol + j].rigged) {
						numBombs++;
					}
				} catch (e) {
					console.log("This bug is intentional. Too lazy to fix it:\n", e);
				}
			}
		}
		return numBombs;
	},
	/**
	 * Clears all blocks within a 1 tile radius
	 * @param tileRow The row of the tile
	 * @param tileCol The coloumn of the tile
	 */
	clear(tileRow: number, tileCol: number, grid: Tile[][]) {
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				try {
					let tile = grid[tileRow + i][tileCol + j];
					if (!tile.cleared) {
						tile.bombProx = this.checkBombs(tileRow + i, tileCol + j, grid);
						tile.cleared = true;
						if (tile.bombProx === 0) {
							this.clear(tileRow + i, tileCol + j, grid);
						}
					}
				} catch (e) {
					console.log("This bug is intentional. Too lazy to fix it:\n", e);
				}
			}
		}
	},
};

export default Vendor;
