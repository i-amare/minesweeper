import { CSSProperties } from "react";

interface dimmensions {
	height: number;
	width: number;
}

interface sliderProps {
	value: number;
	min: number;
	max: number;
	id: string;
	label: string;
	girdDimmensions: dimmensions;
	change: (value: number, id: string) => void;
}

const Slider = (props: sliderProps) => {
	const sliderStyling: CSSProperties = {
		display: "flex",
		alignContent: "center",
		justifyContent: "space-between",
	};

	const pairStyling: CSSProperties = {
		display: "flex",
		flexDirection: "column",
		textAlign: "center",
	};

	return (
		<div className="Slider" style={sliderStyling}>
			<h3
				style={{
					margin: "5px",
				}}
			>
				{props.label}:
			</h3>
			<div style={pairStyling}>
				<input
					type="range"
					defaultValue={props.value}
					min={props.min}
					max={props.max}
					id={props.id}
					onChange={(event) =>
						props.change(parseInt(event.target.value), props.id)
					}
				/>
				<b>{props.value}</b>
			</div>
		</div>
	);
};

export default Slider;
