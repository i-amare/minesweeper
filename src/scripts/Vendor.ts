import Tile from "./Tile";

const Vendor = {
	/**
	 * Creates a new grid of tiles with the specidied width and height and populates it with bombs
	 * @param gridWidth The width of the grid
	 * @param gridHeight The height of the grid
	 * @param	bombs The number of bombs to be placed in the grid
	 * @returns A new grid of tiles with the specidied height and width
	 */
	createGrid: (gridWidth: number, gridHeight: number, bombs: number) => {
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

		// Checks the number of bombs within a one block radius of all blocks
		for (let i = 0; i < gridHeight; i++) {
			for (let j = 0; j < gridWidth; j++) {
				let bombCount = 0;

				// Checks for bombs in row above
				if (i - 1 >= 0) {
					if (j - 1 >= 0) {
						bombCount = grid[i - 1][j - 1].rigged ? bombCount + 1 : bombCount;
					}
					bombCount = grid[i - 1][j].rigged ? bombCount + 1 : bombCount;
					if (j + 1 < gridWidth) {
						bombCount = grid[i - 1][j + 1].rigged ? bombCount + 1 : bombCount;
					}
				}

				// Checks for bombs in row below
				if (i + 1 < gridHeight) {
					if (j - 1 >= 0) {
						bombCount = grid[i + 1][j - 1].rigged ? bombCount + 1 : bombCount;
					}
					bombCount = grid[i + 1][j].rigged ? bombCount + 1 : bombCount;
					if (j + 1 < gridWidth) {
						bombCount = grid[i + 1][j + 1].rigged ? bombCount + 1 : bombCount;
					}
				}

				// Checks for bombs in horizontally adjacent blocks
				if (j - 1 >= 0) {
					bombCount = grid[i][j - 1].rigged ? bombCount + 1 : bombCount;
				}
				if (j + 1 < gridWidth) {
					bombCount = grid[i][j + 1].rigged ? bombCount + 1 : bombCount;
				}

				grid[i][j].bombProx = bombCount;
			}
		}

		return grid;
	},
};

export default Vendor;
