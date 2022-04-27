import { CSSProperties } from "react";
import Block from "./Block";
import Tile from "../../scripts/Tile";

interface gridProps {
	gridState: Tile[][];
	tileEventHandler: (coords: tileCoords) => void;
}

interface tileCoords {
	x: number;
	y: number;
}

const Grid = (props: gridProps) => {
	const blockSize = 35;

	/**
	 * Dynamically styles the grid in a responsive manner
	 * @returns The required css value of grid-template-coloumns
	 */
	const gridWidthStyle = () => {
		let gridStyle = "";
		for (let i = 0; i < props.gridState[0].length; i++) {
			gridStyle += "1fr ";
		}
		return gridStyle;
	};

	const GridStyling: CSSProperties = {
		maxHeight: "85vh",
		maxWidth: "90%",
		margin: "auto",
		display: "grid",
		gridTemplateColumns: `${gridWidthStyle()}`,
		gap: "1px",
		overflow: "scroll",
		border: "4px solid #ccc",
		borderRadius: "5px",
	};

	return (
		<div className="Grid" style={GridStyling}>
			{props.gridState.map((row: Tile[], rowIdx: number) =>
				row.map((tile: Tile, tileIdx: number) => (
					<Block
						tile={props.gridState[rowIdx][tileIdx]}
						key={`${rowIdx}-${tileIdx}`}
						onClick={props.tileEventHandler}
						coords={{ x: rowIdx, y: tileIdx }}
						blockSize={blockSize}
					/>
				))
			)}
		</div>
	);
};

export default Grid;
