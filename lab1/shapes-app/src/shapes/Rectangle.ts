import {type ICanvas} from '../canvas/ICanvas'
import {type Color} from '../Color'
import {Shape} from './Shape'

interface RectangleConstructorArgs {
	id: string,
	color: Color,
	left: number,
	top: number,
	width: number,
	height: number,
}

class Rectangle extends Shape {
	left: number
	top: number
	width: number
	height: number

	constructor({
		id,
		color,
		left,
		top,
		width,
		height,
	}: RectangleConstructorArgs) {
		super(id, color)

		this.left = left
		this.top = top
		this.width = width
		this.height = height

		if (width < 0 || height < 0) {
			throw new Error('Width and height must be non-negative')
		}
	}

	draw(canvas: ICanvas): void {
		canvas.setColor(this.color)
		canvas.moveTo(this.left, this.top)
		canvas.lineTo(this.left + this.width, this.top)
		canvas.lineTo(this.left + this.width, this.top + this.height)
		canvas.lineTo(this.left, this.top + this.height)
		canvas.lineTo(this.left, this.top)
	}

	move(dx: number, dy: number): void {
		this.left += dx
		this.top += dy
	}

	getDescription(): string {
		return `rectangle ${this.left} ${this.top} ${this.width} ${this.height}`
	}
}

export {
	Rectangle,
}
