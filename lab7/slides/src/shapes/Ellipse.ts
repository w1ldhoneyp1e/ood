import {type ICanvas} from '../canvas/ICanvas'
import {type FillStyle} from '../types/FillStyle'
import {type Frame} from '../types/Frame'
import {type LineStyle} from '../types/LineStyle'
import {type IShape} from './IShape'

class Ellipse implements IShape {
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
		const cy = this.frame.top + this.frame.height / 2
		const rx = this.frame.width / 2
		const ry = this.frame.height / 2

		if (this.fillStyle.enabled && this.fillStyle.color) {
			canvas.setFillColor(this.fillStyle.color)
			canvas.fillEllipse(cx, cy, rx, ry)
		}

		if (this.lineStyle.enabled && this.lineStyle.color) {
			canvas.setLineColor(this.lineStyle.color)
			canvas.setLineWidth(this.lineStyle.lineWidth)
			canvas.drawEllipse(cx, cy, rx, ry)
		}
	}

	clone(): IShape {
		return new Ellipse(this.frame, this.fillStyle, this.lineStyle)
	}
}

export {
	Ellipse,
}

