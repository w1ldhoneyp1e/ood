import {type ICanvas} from '../canvas/ICanvas'
import {type Color} from '../Color'
import {Shape} from './Shape'

interface LineConstructorArgs {
	id: string,
	color: Color,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
}

class Line extends Shape {
	x1: number
	y1: number
	x2: number
	y2: number

	constructor({
		id,
		color,
		x1,
		y1,
		x2,
		y2,
	}: LineConstructorArgs) {
		super(id, color)

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

	move(dx: number, dy: number): void {
		this.x1 += dx
		this.y1 += dy
		this.x2 += dx
		this.y2 += dy
	}

	getDescription(): string {
		return `line ${this.x1} ${this.y1} ${this.x2} ${this.y2}`
	}
}

export {
	Line,
}
