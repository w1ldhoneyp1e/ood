interface ICanvas {
	moveTo: (x: number, y: number) => void,
	lineTo: (x: number, y: number) => void,
	setColor?: (hexColor: number) => void,
}

export {
	ICanvas,
}
