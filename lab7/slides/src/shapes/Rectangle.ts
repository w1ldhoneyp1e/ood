import {type ICanvas} from '../canvas/ICanvas'
import {type FillStyle} from '../types/FillStyle'
import {type Frame} from '../types/Frame'
import {type LineStyle} from '../types/LineStyle'
import {type IShape} from './IShape'

class Rectangle implements IShape {
	private frame: Frame
	private fillStyle: FillStyle
	private lineStyle: LineStyle

	constructor(frame: Frame, fillStyle: FillStyle, lineStyle: LineStyle) {
		this.frame = frame
		this.fillStyle = fillStyle
		this.lineStyle = lineStyle
	}

	getFrame(): Frame {
		return this.frame
	}

	setFrame(frame: Frame): void {
		this.frame = frame
	}

	getFillStyle(): FillStyle {
		return this.fillStyle
	}

	setFillStyle(style: FillStyle): void {
		this.fillStyle = style
	}

	getLineStyle(): LineStyle {
		return this.lineStyle
	}

	setLineStyle(style: LineStyle): void {
		this.lineStyle = style
	}

	draw(canvas: ICanvas): void {
		const points = [
			{
				x: this.frame.left,
				y: this.frame.top,
			},
			{
				x: this.frame.right,
				y: this.frame.top,
			},
			{
				x: this.frame.right,
				y: this.frame.bottom,
			},
			{
				x: this.frame.left,
				y: this.frame.bottom,
			},
		]

		if (this.fillStyle.enabled && this.fillStyle.color) {
			canvas.setFillColor(this.fillStyle.color)
			canvas.fillPolygon(points)
		}

		if (this.lineStyle.enabled && this.lineStyle.color) {
			canvas.setLineColor(this.lineStyle.color)
			canvas.setLineWidth(this.lineStyle.lineWidth)
			for (let i = 0; i < points.length; i++) {
				const current = points[i]
				const next = points[(i + 1) % points.length]
				canvas.drawLine(current.x, current.y, next.x, next.y)
			}
		}
	}

	clone(): IShape {

		return new Rectangle(this.frame, this.fillStyle, this.lineStyle)
	}
}

export {
	Rectangle,
}

