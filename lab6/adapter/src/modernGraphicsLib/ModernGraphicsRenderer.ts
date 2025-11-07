import {type Point} from './Point'
import {type RGBAColor} from './RGBAColor'

class ModernGraphicsRenderer {
	private drawing = false
	private output: NodeJS.WritableStream

	constructor(output: NodeJS.WritableStream = process.stdout) {
		this.output = output
	}

	beginDraw(): void {
		if (this.drawing) {
			throw new Error('Drawing has already begun')
		}
		this.output.write('<draw>\n')
		this.drawing = true
	}

	drawLine(start: Point, end: Point, color: RGBAColor): void {
		if (!this.drawing) {
			throw new Error('DrawLine is allowed between BeginDraw()/EndDraw() only')
		}
		this.output.write(
			`  <line fromX="${start.x}" fromY="${start.y}" toX="${end.x}" toY="${end.y}">\n`,
		)
		this.output.write(
			`    <color r="${color.r}" g="${color.g}" b="${color.b}" a="${color.a}" />\n`,
		)
		this.output.write('  </line>\n')
	}

	endDraw(): void {
		if (!this.drawing) {
			throw new Error('Drawing has not been started')
		}
		this.output.write('</draw>\n')
		this.drawing = false
	}

	isDrawing(): boolean {
		return this.drawing
	}
}

export {
	ModernGraphicsRenderer,
}
