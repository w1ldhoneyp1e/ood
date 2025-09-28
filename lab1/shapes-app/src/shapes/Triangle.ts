import {type ICanvas} from '../canvas/ICanvas'
import {Shape} from './Shape'

interface TriangleConstructorArgs {
	id: string,
	color: string,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	x3: number,
	y3: number,
}

class Triangle extends Shape {
	x1: number
	y1: number
	x2: number
	y2: number
	x3: number
	y3: number

	constructor({
		id,
		color,
		x1,
		y1,
		x2,
		y2,
		x3,
		y3,
	}: TriangleConstructorArgs) {
		super(id, color)

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

	move(dx: number, dy: number): void {
		this.x1 += dx
		this.y1 += dy
		this.x2 += dx
		this.y2 += dy
		this.x3 += dx
		this.y3 += dy
	}

	getDescription(): string {
		return `triangle ${this.x1} ${this.y1} ${this.x2} ${this.y2} ${this.x3} ${this.y3}`
	}
}

export {
	Triangle,
}
