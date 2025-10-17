import {type ICanvas} from '../canvas/ICanvas'
import {type Color} from '../Color'
import {Shape} from './Shape'

interface RectangleConstructorArgs {
	color: Color,
	left: number,
	top: number,
	right: number,
	bottom: number,
}

class Rectangle extends Shape {
	private left: number
	private top: number
	private right: number
	private bottom: number

	constructor({
		color,
		left,
		top,
		right,
		bottom,
	}: RectangleConstructorArgs) {
		super(color)

		if (right < left || bottom < top) {
			throw new Error('Right-bottom corner must be below and to the right of left-top corner')
		}

		this.left = left
		this.top = top
		this.right = right
		this.bottom = bottom
	}

	draw(canvas: ICanvas): void {
		canvas.setColor(this.color)
		canvas.moveTo(this.left, this.top)
		canvas.lineTo(this.right, this.top)
		canvas.lineTo(this.right, this.bottom)
		canvas.lineTo(this.left, this.bottom)
		canvas.lineTo(this.left, this.top)
	}
}

export {
	Rectangle,
}
