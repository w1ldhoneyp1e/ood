import {type IDrawStrategy} from './draw/IDrawStrategy'

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
	draw: IDrawStrategy,
}

export type {
	Point,
	Rect,
	ShapeType,
	IShape,
}
