import {type ICanvas} from '../canvas/ICanvas'
import {type Color} from '../Color'
import {Shape} from './Shape'

interface TextContructorArgs {
	id: string,
	color: Color,
	left: number,
	top: number,
	fontSize: number,
	text: string,
}

class Text extends Shape {
	left: number
	top: number
	fontSize: number
	text: string

	constructor({
		id,
		color,
		left,
		top,
		fontSize,
		text,
	}: TextContructorArgs) {
		super(id, color)

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

	move(dx: number, dy: number): void {
		this.left += dx
		this.top += dy
	}

	getDescription(): string {
		return `text ${this.left} ${this.top} ${this.fontSize} ${this.text}`
	}

	clone(newId: string): Text {
		return new Text({
			...this,
			id: newId,
		})
	}
}

export {
	Text,
}
