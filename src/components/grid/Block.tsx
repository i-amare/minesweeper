import { CSSProperties } from "react";
import bombIcon from "../../assets/bomb.png";
import flagIcon from "../../assets/flag.png";
import Tile from "../../scripts/Tile";

interface blockProps {
	tile: Tile;
	coords: tileCoords;
	blockSize: number;
	onClick: (coords: tileCoords) => void;
}

interface tileCoords {
	x: number;
	y: number;
}

const Block = (props: blockProps) => {
	const BlockStyling: CSSProperties = {
		backgroundColor: "#222",
		display: "grid",
		alignContent: "center",
		justifyContent: "center",
		borderRadius: "3px",
		width: `${props.blockSize}px`,
		height: `${props.blockSize}px`,
		fontWeight: "bold",
		transition: "transform 0.2s, background-color 0.2s",
	};

	const ImageStyling: CSSProperties = {
		margin: "auto",
		width: "45%",
		backgroundColor: "rgba(0, 0, 0, 0)",
	};

	const fontColors = [
		"white",
		"teal",
		"green",
		"lightcoral",
		"tomato",
		"red",
		"magenta",
		"blueviolet",
		"darkorchid",
		"black",
	];

	// God bless this mess
	return (
		<div
			className="block"
			onClick={() => props.onClick({ x: props.coords.x, y: props.coords.y })}
			style={{
				...BlockStyling,
				...(props.tile.cleared
					? props.tile.rigged
						? { backgroundColor: "#ff9a9a" }
						: { backgroundColor: "#ccc" }
					: null),
				color: fontColors[props.tile.bombProx],
			}}
		>
			{props.tile.cleared ? (
				props.tile.rigged ? (
					<img
						src={bombIcon}
						alt="bomb"
						style={{ ...ImageStyling, backgroundColor: "#ff9a9a" }}
					/>
				) : props.tile.bombProx ? (
					props.tile.bombProx
				) : (
					""
				)
			) : props.tile.flagged ? (
				<img src={flagIcon} alt="flag" style={ImageStyling} />
			) : null}
		</div>
	);
};

export default Block;
