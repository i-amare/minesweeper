import { CSSProperties } from "react";
import bombIcon from "../../assets/bomb.png";

interface BombCountProps {
	bombsLeft: number;
}

const BombDisplay = (props: BombCountProps) => {
	const imageStyling: CSSProperties = {
		margin: "3px",
		width: "20px",
	};

	const bombCountStyling: CSSProperties = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};

	return (
		<div className="BombCount" style={bombCountStyling}>
			<img src={bombIcon} alt="bomb" style={imageStyling} />
			<h3
				style={{
					margin: "0",
				}}
			>
				{props.bombsLeft}
			</h3>
		</div>
	);
};

export default BombDisplay;
