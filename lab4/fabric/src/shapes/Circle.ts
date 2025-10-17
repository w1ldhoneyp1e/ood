import {type ICanvas} from '../canvas/ICanvas'
import {type Color} from '../Color'
import {Shape} from './Shape'

interface CircleConstructorArgs {
	color: Color,
	cx: number,
	cy: number,
	radius: number,
}

class Circle extends Shape {
	private cx: number
	private cy: number
	private radius: number

	constructor({
		color,
		cx,
		cy,
		radius,
	}: CircleConstructorArgs) {
		super(color)
		this.cx = cx
		this.cy = cy
		this.radius = radius

		if (radius < 0) {
			throw new Error('Radius must be non-negative')
		}
	}

	draw(canvas: ICanvas): void {
		canvas.setColor(this.color)
		canvas.drawEllipse(this.cx, this.cy, this.radius, this.radius)
	}
}

export {
	Circle,
}
