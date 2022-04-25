import { CSSProperties } from "react";
import flagIcon from "../../assets/flag.png";
import TileNode from "../../scripts/Tile";

interface gridProps {
	tileArrState: TileNode[][];
	gridWidth: number;
	gridHeight: number;
	tileEventHandler: (tileRow: number, tileCol: number) => void;
}

const Grid = (props: gridProps) => {
	const blockSize = 65;

	const gridWidhtStyle = () => {
		let gridStyle = "";
		for (let i = 0; i < props.tileArrState[0].length; i++) {
			gridStyle += "1fr ";
		}
		return gridStyle;
	};

	const RowStyling: CSSProperties = {
		display: "grid",
		gridTemplateColumns: `${gridWidhtStyle()}`,
		gap: "1px",
		width: `${props.gridWidth * blockSize}px`,
		height: `${props.gridHeight * blockSize}px`,
	};

	const DefaultBlock: CSSProperties = {
		borderRadius: "5px",
		display: "grid",
		alignContent: "center",
		justifyContent: "center",
	};

	const BlockStyling: CSSProperties = {
		backgroundColor: "#222",
	};

	const ClearedStyling: CSSProperties = {
		backgroundColor: "#dadada",
	};

	const FlaggedStyling: CSSProperties = {
		backgroundColor: "#f97",
	};

	return (
		<div className="Grid" style={RowStyling}>
			{props.tileArrState.map((row: TileNode[], rowIdx: number) =>
				row.map((tile: TileNode, tileIdx: number) => (
					<div
						onClick={() => props.tileEventHandler(rowIdx, tileIdx)}
						style={{
							...DefaultBlock,
							...(props.tileArrState[rowIdx][tileIdx].cleared
								? ClearedStyling
								: props.tileArrState[rowIdx][tileIdx].flagged
								? FlaggedStyling
								: BlockStyling),
						}}
					>
						{props.tileArrState[rowIdx][tileIdx].cleared ? null : props
								.tileArrState[rowIdx][tileIdx].flagged ? (
							<img
								src={flagIcon}
								alt="flag"
								style={{
									margin: "auto",
									width: "35%",
									backgroundColor: "#f97",
								}}
							/>
						) : null}
					</div>
				))
			)}
		</div>
	);
};

export default Grid;
