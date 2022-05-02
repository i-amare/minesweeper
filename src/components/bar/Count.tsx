import { CSSProperties } from "react";
import timerIcon from "../../assets/timer.png";
import bombIcon from "../../assets/bomb.png";

interface countProps {
	timeElapsed: number;
	bombsLeft: number;
}

const Count = (props: countProps) => {
	const countStyling: CSSProperties = {
		display: "flex",
		justifyContent: "center",
		alignContent: "center",
		gap: "20px",
	};

	const containerStyling: CSSProperties = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};

	const imageStyling: CSSProperties = {
		margin: "3px",
		width: "20px",
	};

	/**
	 * Formats time elapsed into mm:ss format
	 * @param milliSeconds The time elapsed in millisecods
	 * @returns A string represnting the time passed in mm:ss format
	 */
	function formatTime(milliSeconds: number) {
		const minutes = Math.floor((milliSeconds % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((milliSeconds % (1000 * 60)) / 1000);
		return `${minutes < 10 ? "0" + minutes : minutes}:${
			seconds < 10 ? "0" + seconds : seconds
		}`;
	}

	return (
		<div style={countStyling}>
			<div className="Timer" style={containerStyling}>
				<img src={timerIcon} alt="timer" style={imageStyling} />
				<h3
					style={{
						margin: "0",
					}}
				>
					{formatTime(props.timeElapsed)}
				</h3>
			</div>
			<div className="BombCount" style={containerStyling}>
				<img src={bombIcon} alt="bomb" style={imageStyling} />
				<h3
					style={{
						margin: "0",
					}}
				>
					{props.bombsLeft}
				</h3>
			</div>
		</div>
	);
};
export default Count;
