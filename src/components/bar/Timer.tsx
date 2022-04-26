import { CSSProperties } from "react";
import timerIcon from "../../assets/timer.png";

interface TimerProps {
	timeElapsed: number;
}

const Timer = (props: TimerProps) => {
	const timerStyling: CSSProperties = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};

	const imageStyling: CSSProperties = {
		margin: "3px",
		width: "20px",
	};

	function formatTime(milliSeconds: number) {
		const minutes = Math.floor((milliSeconds % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((milliSeconds % (1000 * 60)) / 1000);
		return `${minutes < 10 ? "0" + minutes: minutes}:${seconds < 10 ? "0" + seconds : seconds}`
	}

	return (
		<div className="Timer" style={timerStyling}>
			<img src={timerIcon} alt="timer" style={imageStyling} />
			<h3
				style={{
					margin: "0",
				}}
			>
				{formatTime(props.timeElapsed)}
			</h3>
		</div>
	);
};

export default Timer;
