import {type ICanvas} from './ICanvas'

class Canvas implements ICanvas {
	moveTo(x: number, y: number): void {
		console.log(`MoveTo (${x}, ${y})`)
	}

	lineTo(x: number, y: number): void {
		console.log(`LineTo (${x}, ${y})`)
	}

	setColor(hexColor: number): void {
		const hex = hexColor
			.toString(16)
			.padStart(6, '0')
			.toUpperCase()
		console.log(`SetColor (#${hex})`)
	}
}

export {
	Canvas,
}
