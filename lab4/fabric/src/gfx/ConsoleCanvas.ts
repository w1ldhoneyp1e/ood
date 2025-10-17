import {type ICanvas} from '../canvas/ICanvas'
import {Color} from '../Color'

class ConsoleCanvas implements ICanvas {
	private currentColor: Color = new Color('#000000')

	setColor(color: Color): void {
		this.currentColor = color
		console.log(`SetColor(${color})`)
	}

	moveTo(x: number, y: number): void {
		console.log(`MoveTo(${x}, ${y})`)
	}

	lineTo(x: number, y: number): void {
		console.log(`LineTo(${x}, ${y})`)
	}

	drawEllipse(cx: number, cy: number, rx: number, ry: number): void {
		console.log(`DrawEllipse(${cx}, ${cy}, ${rx}, ${ry})`)
	}

	drawText(left: number, top: number, fontSize: number, text: string): void {
		console.log(`DrawText(${left}, ${top}, ${fontSize}, "${text}")`)
	}
}

export {
	ConsoleCanvas,
}

