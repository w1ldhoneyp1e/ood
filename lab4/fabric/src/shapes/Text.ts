import {type ICanvas} from '../canvas/ICanvas'
import {type Color} from '../Color'
import {Shape} from './Shape'

interface TextConstructorArgs {
	color: Color,
	left: number,
	top: number,
	fontSize: number,
	text: string,
}

class Text extends Shape {
	private left: number
	private top: number
	private fontSize: number
	private text: string

	constructor({
		color,
		left,
		top,
		fontSize,
		text,
	}: TextConstructorArgs) {
		super(color)

		this.left = left
		this.top = top
		this.fontSize = fontSize
		this.text = text

		if (fontSize < 0) {
			throw new Error('Font size must be non-negative')
		}
	}

	draw(canvas: ICanvas): void {
		canvas.setColor(this.color)
		canvas.drawText(this.left, this.top, this.fontSize, this.text)
	}
}

export {
	Text,
}
