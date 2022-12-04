import { CSSProperties } from "react";
import Slider from "./Slider";

interface menuProps {
	gridDimmensions: { width: number; height: number };
	minesPresent: number;
	changeDimmensions: (dimmensions: { width: number; height: number }) => void;
	changeMinesPresent: (numOfMines: number) => void;
	closeMenu: () => void;
	reset: () => void;
}

const Menu = (props: menuProps) => {
	let dimmensions = { ...props.gridDimmensions };

	const dimmerStyling: CSSProperties = {
		position: "fixed",
		background: "#00000050",
		width: "100%",
		height: "100vh",
		top: "0",
		left: "0",
		display: "flex",
		alignContent: "center",
		justifyContent: "center",
	};

	const menuStyling: CSSProperties = {
		padding: "20px",
		maxWidth: "75%",
		width: "500px",
		height: "600px",
		borderRadius: "10px",
		margin: "auto",
	};

	/**
	 * Changes the value of a specified field
	 * @param value The new value of the specified field
	 * @param id The name of the fiels to be changed ("height, "width", "bombs" )
	 */

	function changeValue(value: number, id: string) {
		switch (id) {
			case "height":
				dimmensions = { height: value, width: dimmensions.width };
				props.changeMinesPresent(
					Math.min(props.minesPresent, dimmensions.width * dimmensions.height)
				);
				props.changeDimmensions(dimmensions);
				break;
			case "width":
				dimmensions = { height: dimmensions.height, width: value };
				props.changeMinesPresent(
					Math.min(props.minesPresent, dimmensions.width * dimmensions.height)
				);
				props.changeDimmensions(dimmensions);
				break;
			case "bombs":
				props.changeMinesPresent(
					Math.min(
						value,
						props.gridDimmensions.width * props.gridDimmensions.height
					)
				);
				break;
		}
	}

	return (
		<div style={dimmerStyling}>
			<div style={menuStyling}>
				<Slider
					label="Height"
					girdDimmensions={dimmensions}
					max={25}
					min={1}
					value={dimmensions.height}
					change={changeValue}
					id="height"
				/>
				<Slider
					label="Width"
					girdDimmensions={dimmensions}
					max={25}
					min={1}
					value={dimmensions.width}
					change={changeValue}
					id="width"
				/>
				<Slider
					label="Bombs"
					girdDimmensions={dimmensions}
					max={props.gridDimmensions.height * props.gridDimmensions.width / 2}
					min={10}
					value={Math.min(
						props.minesPresent,
						props.gridDimmensions.height * props.gridDimmensions.width
					)}
					change={changeValue}
					id="bombs"
				/>
				<button
					onClick={() => {
						props.changeDimmensions(dimmensions);
						props.reset();
						props.closeMenu();
					}}
				>
					Close Menu
				</button>
			</div>
		</div>
	);
};

export default Menu;
