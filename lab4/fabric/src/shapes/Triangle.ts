import {type ICanvas} from '../canvas/ICanvas'
import {type Color} from '../Color'
import {Shape} from './Shape'

interface TriangleConstructorArgs {
	color: Color,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	x3: number,
	y3: number,
}

class Triangle extends Shape {
	private x1: number
	private y1: number
	private x2: number
	private y2: number
	private x3: number
	private y3: number

	constructor({
		color,
		x1,
		y1,
		x2,
		y2,
		x3,
		y3,
	}: TriangleConstructorArgs) {
		super(color)

		this.x1 = x1
		this.y1 = y1
		this.x2 = x2
		this.y2 = y2
		this.x3 = x3
		this.y3 = y3
	}

	draw(canvas: ICanvas): void {
		canvas.setColor(this.color)
		canvas.moveTo(this.x1, this.y1)
		canvas.lineTo(this.x2, this.y2)
		canvas.lineTo(this.x3, this.y3)
		canvas.lineTo(this.x1, this.y1)
	}
}

export {
	Triangle,
}
