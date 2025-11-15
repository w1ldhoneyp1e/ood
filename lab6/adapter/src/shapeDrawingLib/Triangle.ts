import {type ICanvas} from '../graphicsLib/ICanvas'
import {type ICanvasDrawable} from './ICanvasDrawable'
import {type Point} from './Point'

class Triangle implements ICanvasDrawable {
	private p1: Point
	private p2: Point
	private p3: Point
	private color: number

	constructor(p1: Point, p2: Point, p3: Point, color: number = 0x000000) {
		this.p1 = p1
		this.p2 = p2
		this.p3 = p3
		this.color = color
	}

	draw(canvas: ICanvas): void {
		if (canvas.setColor) {
			canvas.setColor(this.color)
		}
		canvas.moveTo(this.p1.x, this.p1.y)
		canvas.lineTo(this.p2.x, this.p2.y)
		canvas.lineTo(this.p3.x, this.p3.y)
		canvas.lineTo(this.p1.x, this.p1.y)
	}
}

export {
	Triangle,
}
