import {type ICanvas} from '../canvas/ICanvas'
import {type Color} from '../Color'
import {Shape} from './Shape'

interface RegularPolygonConstructorArgs {
	color: Color,
	cx: number,
	cy: number,
	radius: number,
	vertexCount: number,
}

class RegularPolygon extends Shape {
	private cx: number
	private cy: number
	private radius: number
	private vertexCount: number

	constructor({
		color,
		cx,
		cy,
		radius,
		vertexCount,
	}: RegularPolygonConstructorArgs) {
		super(color)

		if (radius < 0) {
			throw new Error('Radius must be non-negative')
		}

		if (vertexCount < 3) {
			throw new Error('Polygon must have at least 3 vertices')
		}

		this.cx = cx
		this.cy = cy
		this.radius = radius
		this.vertexCount = vertexCount
	}

	draw(canvas: ICanvas): void {
		canvas.setColor(this.color)

		const angleStep = (2 * Math.PI) / this.vertexCount
		const vertices: {
			x: number,
			y: number,
		}[] = []

		for (let i = 0; i < this.vertexCount; i++) {
			const angle = i * angleStep - Math.PI / 2
			vertices.push({
				x: this.cx + this.radius * Math.cos(angle),
				y: this.cy + this.radius * Math.sin(angle),
			})
		}

		canvas.moveTo(vertices[0].x, vertices[0].y)
		for (let i = 1; i < vertices.length; i++) {
			canvas.lineTo(vertices[i].x, vertices[i].y)
		}
		canvas.lineTo(vertices[0].x, vertices[0].y)
	}
}

export {
	RegularPolygon,
}

