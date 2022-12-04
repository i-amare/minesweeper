import Radium from 'radium';
import { CSSProperties } from 'react';
import bombIcon from '../../assets/bomb.png';
import flagIcon from '../../assets/flag.png';
import Tile from '../../scripts/Tile';

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
	const fontColors = [
		'white',
		'teal',
		'green',
		'lightcoral',
		'tomato',
		'red',
		'magenta',
		'blueviolet',
		'darkorchid',
		'black',
	];

	const blockStyling: any = {
		backgroundColor: '#222',
		display: 'grid',
		alignContent: 'center',
		justifyContent: 'center',
		borderRadius: '3px',
		width: `${props.blockSize}px`,
		height: `${props.blockSize}px`,
		color: fontColors[props.tile.bombProx],
		fontWeight: 'bold',
		transition: 'transform 0.2s, background-color 0.2s',
		':active': {
			transform: 'scale(0.9)',
		},
	};

	const clearedBlockStlying: CSSProperties = {
		...blockStyling,
		backgroundColor: '#ccc',
	};

	const riggedBlockStyling: CSSProperties = {
		...blockStyling,
		backgroundColor: '#ff9a9a',
	};

	const ImageStyling: CSSProperties = {
		margin: 'auto',
		width: '45%',
		backgroundColor: 'rgba(0, 0, 0, 0)',
	};

	// Dynamically assigns the tile's contents
	let tile;
	if (props.tile.cleared) {
		if (props.tile.rigged) {
			tile = (
				<img
					src={bombIcon}
					alt='bomb'
					style={{ ...ImageStyling, backgroundColor: '#ff9a9a' }}
				/>
			);
		} else {
			tile = props.tile.bombProx ? props.tile.bombProx : '';
		}
	} else {
		if (props.tile.flagged) {
			tile = <img src={flagIcon} alt='flag' style={ImageStyling} />;
		}
	}

	// Dynamically assigns the tile's styles
	let tileStyling = { ...blockStyling };
	if (props.tile.cleared) {
		tileStyling = clearedBlockStlying;
		if (props.tile.rigged) tileStyling = riggedBlockStyling;
	}

	return (
		<div
			className='block'
			onClick={() => props.onClick({ x: props.coords.x, y: props.coords.y })}
			style={tileStyling}
		>
			{tile}
		</div>
	);
};

export default Radium(Block);
