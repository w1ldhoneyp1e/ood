import {type ICanvas} from '../graphicsLib/ICanvas'
import {ModernGraphicsRenderer} from '../modernGraphicsLib/ModernGraphicsRenderer'
import {Point} from '../modernGraphicsLib/Point'
import {type RGBAColor} from '../modernGraphicsLib/RGBAColor'
import {hexToRGBA} from './colorUtils'

class ModernGraphicsRendererClassAdapter
	extends ModernGraphicsRenderer
	implements ICanvas {
	private currentPoint: {
		x: number,
		y: number,
	} | null = null
	private currentColor = 0x000000
	private defaultColor: RGBAColor

	constructor(output: NodeJS.WritableStream = process.stdout) {
		super(output)
		this.defaultColor = hexToRGBA(this.currentColor)
		this.beginDraw()
	}

	setColor(hexColor: number): void {
		this.currentColor = hexColor
		this.defaultColor = hexToRGBA(hexColor)
	}

	moveTo(x: number, y: number): void {
		this.currentPoint = {
			x,
			y,
		}
	}

	lineTo(x: number, y: number): void {
		if (this.currentPoint === null) {
			this.currentPoint = {
				x: 0,
				y: 0,
			}
		}
		const start = new Point(this.currentPoint.x, this.currentPoint.y)
		const end = new Point(x, y)
		this.drawLine(start, end, this.defaultColor)
		this.currentPoint = {
			x,
			y,
		}
	}
}

export {
	ModernGraphicsRendererClassAdapter,
}
