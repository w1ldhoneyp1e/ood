interface Point {
	x: number,
	y: number,
}

interface Rect {
	x: number,
	y: number,
	width: number,
	height: number,
}

type ShapeType = 'rectangle' | 'ellipse' | 'triangle'

interface IShape {
	id: string,
	type: ShapeType,
	frame: Rect,
	fill: string,
}

export type {
	Point,
	Rect,
	ShapeType,
	IShape,
}
