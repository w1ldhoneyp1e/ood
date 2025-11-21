import {type ICanvas} from '../canvas/ICanvas'
import {type FillStyle} from '../types/FillStyle'
import {type Frame} from '../types/Frame'
import {type LineStyle} from '../types/LineStyle'
import {type IShape} from './IShape'

class Triangle implements IShape {
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
		const cx = this.frame.left + this.frame.width / 2
		const topY = this.frame.top
		const bottomY = this.frame.bottom

		const points = [
			{
				x: cx,
				y: topY,
			},
			{
				x: this.frame.right,
				y: bottomY,
			},
			{
				x: this.frame.left,
				y: bottomY,
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
		return new Triangle(this.frame, this.fillStyle, this.lineStyle)
	}
}

export {
	Triangle,
}
