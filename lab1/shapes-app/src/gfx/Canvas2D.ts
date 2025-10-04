import {type ICanvas} from '../canvas/ICanvas'
import {type Color} from '../Color'

class Canvas2D implements ICanvas {
	constructor(private ctx: CanvasRenderingContext2D) {}

	setColor(color: Color): void {
		this.ctx.strokeStyle = color.toString()
		this.ctx.fillStyle = color.toString()
	}

	moveTo(x: number, y: number): void {
		this.ctx.moveTo(x, y)
	}

	lineTo(x: number, y: number): void {
		this.ctx.lineTo(x, y)
		this.ctx.stroke()
		this.ctx.beginPath()
		this.ctx.moveTo(x, y)
	}

	drawEllipse(cx: number, cy: number, rx: number, ry: number): void {
		this.ctx.beginPath()
		this.ctx.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI)
		this.ctx.stroke()
	}

	drawText(left: number, top: number, fontSize: number, text: string): void {
		this.ctx.font = `${fontSize}px Arial`
		this.ctx.fillText(text, left, top)
	}
}

export {
	Canvas2D,
}
