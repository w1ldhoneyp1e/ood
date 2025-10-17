import {type ICanvas} from '../canvas/ICanvas'
import {type Color} from '../Color'

abstract class Shape {
	constructor(
		public color: Color,
	) {}

	abstract draw(canvas: ICanvas): void
}

export {
	Shape,
}
