import Timer from "./Timer";
import BombCount from "./BombCount";
import restartIcon from "../../assets/restart.png";
import menuIcon from "../../assets/menu.png";
import { CSSProperties } from "react";

interface BarProps {
	timeElapsed: number;
	bombsLeft: number;
	reset: () => void;
}

const Bar = (props: BarProps) => {
	const BarStyling: CSSProperties = {
		display: "flex",
		justifyContent: "space-between",
		alignContent: "center",
		gap: "25px",
		margin: "10px 10px 30px 10px",
	};

	const imageStyling: CSSProperties = {
		width: "20px",
		height: "20px",
		margin: "3px",
		transition: "transform 0.5s",
	};

	return (
		<div className="Bar" style={BarStyling}>
			<img className="MenuBtn" src={menuIcon} alt="Menu" style={imageStyling} />
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignContent: "center",
					gap: "25px",
				}}
			>
				<Timer timeElapsed={props.timeElapsed} />
				<BombCount bombsLeft={props.bombsLeft} />
			</div>
			<img
				className="ResetBtn"
				src={restartIcon}
				alt="Restart"
				style={imageStyling}
				onClick={props.reset}
			/>
		</div>
	);
};

export default Bar;
