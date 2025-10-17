import {type ICanvas} from '../canvas/ICanvas'
import {type Color} from '../Color'
import {Shape} from './Shape'

interface LineConstructorArgs {
	color: Color,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
}

class Line extends Shape {
	private x1: number
	private y1: number
	private x2: number
	private y2: number

	constructor({
		color,
		x1,
		y1,
		x2,
		y2,
	}: LineConstructorArgs) {
		super(color)

		this.x1 = x1
		this.y1 = y1
		this.x2 = x2
		this.y2 = y2
	}

	draw(canvas: ICanvas): void {
		canvas.setColor(this.color)
		canvas.moveTo(this.x1, this.y1)
		canvas.lineTo(this.x2, this.y2)
	}
}

export {
	Line,
}
