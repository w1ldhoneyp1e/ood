import {type ICanvas, type Point} from './ICanvas'

class HTMLCanvas implements ICanvas {
	private ctx: CanvasRenderingContext2D
	private fillColor: {
		r: number,
		g: number,
		b: number,
		a: number,
	} = {
			r: 0,
			g: 0,
			b: 0,
			a: 1,
		}
	private lineColor: {
		r: number,
		g: number,
		b: number,
		a: number,
	} = {
			r: 0,
			g: 0,
			b: 0,
			a: 1,
		}
	private lineWidth = 1

	constructor(canvas: HTMLCanvasElement) {
		const context = canvas.getContext('2d')
		if (!context) {
			throw new Error('Failed to get 2d context from canvas')
		}
		this.ctx = context
	}

	setFillColor(color: {
		r: number,
		g: number,
		b: number,
		a: number,
	}): void {
		this.fillColor = color
	}

	setLineColor(color: {
		r: number,
		g: number,
		b: number,
		a: number,
	}): void {
		this.lineColor = color
	}

	setLineWidth(width: number): void {
		this.lineWidth = width
	}

	drawLine(x1: number, y1: number, x2: number, y2: number): void {
		this.ctx.strokeStyle = this.getColorString(this.lineColor)
		this.ctx.lineWidth = this.lineWidth
		this.ctx.beginPath()
		this.ctx.moveTo(x1, y1)
		this.ctx.lineTo(x2, y2)
		this.ctx.stroke()
	}

	drawEllipse(cx: number, cy: number, rx: number, ry: number): void {
		this.ctx.strokeStyle = this.getColorString(this.lineColor)
		this.ctx.lineWidth = this.lineWidth
		this.ctx.beginPath()
		this.ctx.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI)
		this.ctx.stroke()
	}

	fillEllipse(cx: number, cy: number, rx: number, ry: number): void {
		this.ctx.fillStyle = this.getColorString(this.fillColor)
		this.ctx.beginPath()
		this.ctx.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI)
		this.ctx.fill()
	}

	fillPolygon(points: Point[]): void {
		if (points.length === 0) {
			return
		}

		this.ctx.fillStyle = this.getColorString(this.fillColor)
		this.ctx.beginPath()
		this.ctx.moveTo(points[0].x, points[0].y)
		for (let i = 1; i < points.length; i++) {
			this.ctx.lineTo(points[i].x, points[i].y)
		}
		this.ctx.closePath()
		this.ctx.fill()
	}

	private getColorString(color: {
		r: number,
		g: number,
		b: number,
		a: number,
	}): string {
		return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
	}
}

export {
	HTMLCanvas,
}
