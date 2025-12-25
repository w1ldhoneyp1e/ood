interface ICanvas {
	setFillStyle: (color: string) => void,
	beginPath: () => void,
	ellipse: (x: number, y: number, radiusX: number, radiusY: number) => void,
	moveTo: (x: number, y: number) => void,
	lineTo: (x: number, y: number) => void,
	closePath: () => void,
	fill: () => void,
}

export {
	type ICanvas,
}

