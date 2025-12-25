import {type ICanvas} from '../../../model/ICanvas'

class Canvas2D implements ICanvas {
	constructor(private ctx: CanvasRenderingContext2D) {}

	setFillStyle(color: string): void {
		this.ctx.fillStyle = color
	}

	beginPath(): void {
		this.ctx.beginPath()
	}

	ellipse(x: number, y: number, radiusX: number, radiusY: number): void {
		this.ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2)
	}

	moveTo(x: number, y: number): void {
		this.ctx.moveTo(x, y)
	}

	lineTo(x: number, y: number): void {
		this.ctx.lineTo(x, y)
	}

	closePath(): void {
		this.ctx.closePath()
	}

	fill(): void {
		this.ctx.fill()
	}
}

export {
	Canvas2D,
}

