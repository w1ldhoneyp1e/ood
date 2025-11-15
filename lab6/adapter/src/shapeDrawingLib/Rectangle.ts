import {type ICanvas} from '../graphicsLib/ICanvas'
import {type ICanvasDrawable} from './ICanvasDrawable'
import {type Point} from './Point'

class Rectangle implements ICanvasDrawable {
	private leftTop: Point
	private width: number
	private height: number
	private color: number

	constructor(leftTop: Point, width: number, height: number, color: number = 0x000000) {
		this.leftTop = leftTop
		this.width = width
		this.height = height
		this.color = color
	}

	draw(canvas: ICanvas): void {
		if (canvas.setColor) {
			canvas.setColor(this.color)
		}
		const {x, y} = this.leftTop
		canvas.moveTo(x, y)
		canvas.lineTo(x + this.width, y)
		canvas.lineTo(x + this.width, y + this.height)
		canvas.lineTo(x, y + this.height)
		canvas.lineTo(x, y)
	}
}

export {
	Rectangle,
}
