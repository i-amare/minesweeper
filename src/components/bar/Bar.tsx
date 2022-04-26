import Timer from "./Timer";
import BombCount from "./BombCount";
import { CSSProperties } from "react";

interface BarProps {
	timeElapsed: number;
	bombsLeft: number;
}

const Bar = (props: BarProps) => {
	const BarStyling: CSSProperties = {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignContent: "center",
		margin: "25px 0 10px 0",
	};

	return (
		<div className="Bar" style={BarStyling}>
			<Timer timeElapsed={props.timeElapsed} />
			<BombCount bombsLeft={props.bombsLeft} />
		</div>
	);
};

export default Bar;
