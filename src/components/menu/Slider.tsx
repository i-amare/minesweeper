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

	return (
		<div className="Slider" style={sliderStyling}>
			<h3>{props.label}: </h3>
			<input
				type="range"
				value={props.value}
				min={props.min}
				max={props.max}
				id={props.id}
				onChange={(event) =>
					props.change(parseInt(event.target.value), props.id)
				}
			/>
		</div>
	);
};

export default Slider;
