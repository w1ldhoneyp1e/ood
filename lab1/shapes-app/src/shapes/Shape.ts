import {type ICanvas} from '../canvas/ICanvas'
import {type Color} from '../Color'

abstract class Shape {
	constructor(
		readonly id: string,
		public color: Color,
	) {}

	abstract draw(canvas: ICanvas): void
	abstract move(dx: number, dy: number): void
	abstract getDescription(): string
}

export {
	Shape,
}
