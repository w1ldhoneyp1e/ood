import {type ICanvas} from '../canvas/ICanvas'

abstract class Shape {
	constructor(
		readonly id: string,
		public color: string,
	) {}

	abstract draw(canvas: ICanvas): void
	abstract move(dx: number, dy: number): void
	abstract getDescription(): string
}

export {
	Shape,
}
