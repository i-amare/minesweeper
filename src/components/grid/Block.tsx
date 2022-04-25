import { CSSProperties } from "react";
import bombIcon from "../../assets/bomb.png"
import flagIcon from "../../assets/flag.png";
import Tile from "../../scripts/Tile";

interface blockProps {
	tileArrState: Tile[][];
	blockIdx: [blockRow: number, blockColoumn: number],
	blockSize: number;
	onClick: (tileRow: number, tileCol: number) => void;
}

const Block = (props: blockProps) => {

	const BlockStyling: CSSProperties = {
		backgroundColor: "#222",
		display: "grid",
		alignContent: "center",
		justifyContent: "center",
		borderRadius: "3px",
		maxHeight: `${props.blockSize}px`,
		minHeight: `${props.blockSize}px`,
		fontWeight: "bold",
		transition: "transform 0.2s, background-color 0.2s",
	};

	const ImageStyling: CSSProperties = {
		margin: "auto",
		width: "45%",
		backgroundColor: "#ccc",
	};

	const fontColors = ["#80c1ff", "green", "coral", "red"];

	const block = props.tileArrState[props.blockIdx[0]][props.blockIdx[1]];

	return (
		<div
			className="block"
			onClick={() => props.onClick(props.blockIdx[0], props.blockIdx[1])}
			style={{
				...BlockStyling,
				...(block.cleared
					? {backgroundColor: '#ccc'}
					: null),
				color: fontColors[2],
			}}
		>
			{
				block.cleared ?
					(
						block.rigged ? 
							<img src={bombIcon} alt="bomb" style={ImageStyling} />
							: block.bombProx	
					)
					: 
					(
						block.flagged ?
							<img src={flagIcon} alt="flag" style={ImageStyling} />
							: null
					)
			}
		</div>
	)
}

export default Block;