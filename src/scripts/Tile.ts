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
	bombProx: number;
	constructor(cleared?: boolean, flagged?: boolean) {
		this.cleared = cleared === undefined ? false : cleared;
		this.flagged = flagged === undefined ? false : flagged;
		this.bombProx = 0;
	}
}

export default Tile;