interface Point {
	x: number,
	y: number,
}

interface ICanvas {
	setFillColor: (color: {
		r: number,
		g: number,
		b: number,
		a: number,
	}) => void,
	setLineColor: (color: {
		r: number,
		g: number,
		b: number,
		a: number,
	}) => void,
	setLineWidth: (width: number) => void,
	drawLine: (x1: number, y1: number, x2: number, y2: number) => void,
	drawEllipse: (cx: number, cy: number, rx: number, ry: number) => void,
	fillEllipse: (cx: number, cy: number, rx: number, ry: number) => void,
	fillPolygon: (points: Point[]) => void,
}

export {
	ICanvas,
	type Point,
}

