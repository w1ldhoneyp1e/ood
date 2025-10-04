import {type ICanvas} from '../canvas/ICanvas'
import {type Color} from '../Color'
import {Shape} from './Shape'

interface CircleConstructorArgs {
	id: string,
	color: Color,
	x: number,
	y: number,
	radius: number,
}

class Circle extends Shape {
	x: number
	y: number
	radius: number

	constructor({
		id,
		color,
		x,
		y,
		radius,
	}: CircleConstructorArgs) {
		super(id, color)
		this.x = x
		this.y = y
		this.radius = radius

		if (radius < 0) {
			throw new Error('Radius must be non-negative')
		}
	}

	draw(canvas: ICanvas): void {
		canvas.setColor(this.color)
		canvas.drawEllipse(this.x, this.y, this.radius, this.radius)
	}

	move(dx: number, dy: number): void {
		this.x += dx
		this.y += dy
	}

	getDescription(): string {
		return `circle ${this.x} ${this.y} ${this.radius}`
	}
}

export {
	Circle,
}
