/**
 * Defines the behaviour and expected inputs of all tile
 * @param cleared Whether the tile has been cleared
 * @param flagged Whether the tile has been flagged
 * @param prox The number of bombs within the tiles proximity
 */
class Tile {
	cleared: boolean;
	flagged: boolean;
	rigged: boolean = false;
	prox: number;
	/**
	 * Checks how many bombs are within a block tile radius of the tile
	 * @returns The number of bombs within the tiles proximity
	 */
	calculateProx(): number {
		return 0;
	}
	constructor(cleared?: boolean, flagged?: boolean) {
		this.cleared = cleared === undefined ? false : cleared;
		this.flagged = flagged === undefined ? false : flagged;
		this.prox = this.calculateProx();
	}
}

export default Tile;