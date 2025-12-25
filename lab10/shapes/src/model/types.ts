import {type IHitTestStrategy} from './hitTest/IHitTestStrategy'
import {type ICanvas} from './ICanvas'

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
	draw: (shape: IShape, canvas: ICanvas) => void,
	hitTest: IHitTestStrategy,
	clone: () => IShape,
}

export type {
	Point,
	Rect,
	ShapeType,
	IShape,
}
