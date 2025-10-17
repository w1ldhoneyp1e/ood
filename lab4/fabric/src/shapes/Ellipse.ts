import {type ICanvas} from '../canvas/ICanvas'
import {type Color} from '../Color'
import {Shape} from './Shape'

interface EllipseConstructorArgs {
	color: Color,
	cx: number,
	cy: number,
	rx: number,
	ry: number,
}

class Ellipse extends Shape {
	private cx: number
	private cy: number
	private rx: number
	private ry: number

	constructor({
		color,
		cx,
		cy,
		rx,
		ry,
	}: EllipseConstructorArgs) {
		super(color)

		if (rx < 0 || ry < 0) {
			throw new Error('Radii must be non-negative')
		}

		this.cx = cx
		this.cy = cy
		this.rx = rx
		this.ry = ry
	}

	draw(canvas: ICanvas): void {
		canvas.setColor(this.color)
		canvas.drawEllipse(this.cx, this.cy, this.rx, this.ry)
	}
}

export {
	Ellipse,
}

