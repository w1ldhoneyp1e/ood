import {type ICanvas, type Point} from './ICanvas'

class ConsoleCanvas implements ICanvas {
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

	setFillColor(color: {
		r: number,
		g: number,
		b: number,
		a: number,
	}): void {
		this.fillColor = color
		console.log(`SetFillColor(${color.r}, ${color.g}, ${color.b}, ${color.a})`)
	}

	setLineColor(color: {
		r: number,
		g: number,
		b: number,
		a: number,
	}): void {
		this.lineColor = color
		console.log(`SetLineColor(${color.r}, ${color.g}, ${color.b}, ${color.a})`)
	}

	setLineWidth(width: number): void {
		this.lineWidth = width
		console.log(`SetLineWidth(${width})`)
	}

	drawLine(x1: number, y1: number, x2: number, y2: number): void {
		console.log(`DrawLine(${x1}, ${y1}, ${x2}, ${y2})`)
	}

	drawEllipse(cx: number, cy: number, rx: number, ry: number): void {
		console.log(`DrawEllipse(${cx}, ${cy}, ${rx}, ${ry})`)
	}

	fillEllipse(cx: number, cy: number, rx: number, ry: number): void {
		console.log(`FillEllipse(${cx}, ${cy}, ${rx}, ${ry})`)
	}

	fillPolygon(points: Point[]): void {
		const pointsStr = points.map(p => `(${p.x}, ${p.y})`).join(', ')
		console.log(`FillPolygon([${pointsStr}])`)
	}
}

export {
	ConsoleCanvas,
}
