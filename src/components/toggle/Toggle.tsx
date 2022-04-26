import { CSSProperties } from "react";
import flagIcon from "../../assets/flagbtn.png";

interface toggleProps {
	flagMode: boolean;
	toggleFlagMode: () => void;
}

const Toggle = (props: toggleProps) => {
	const toggleStyling: CSSProperties = {
		height: "30px",
		margin: "10px auto 0 auto",
	};

	const imageStyling: CSSProperties = {
		transition: 'background-color 0.25s, transform 0.5s',
		width: "20px",
		height: "20px",
		border: "2px solid #222",
		borderRadius: "5px",
		padding: "8px",
	};

	return (
		<div className="Toggle" style={toggleStyling}>
			<img
			className="ToggleBtn"
				src={flagIcon}
				alt="flag"
				style={{
					...imageStyling,
					...(props.flagMode ? { backgroundColor: "#ff9a9a" } : null),
				}}
				onClick={props.toggleFlagMode}
			/>
		</div>
	);
};

export default Toggle;
