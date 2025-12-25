import {type ICanvas} from '../../ICanvas'
import {type IShape} from '../../types'
import {type IDrawStrategy} from '../IDrawStrategy'

class EllipseDrawStrategy implements IDrawStrategy {
	draw(shape: IShape, canvas: ICanvas): void {
		canvas.setFillStyle(shape.fill)
		canvas.beginPath()
		canvas.ellipse(
			shape.frame.x + shape.frame.width / 2,
			shape.frame.y + shape.frame.height / 2,
			shape.frame.width / 2,
			shape.frame.height / 2,
		)
		canvas.fill()
	}
}

const ellipseDrawStrategy = new EllipseDrawStrategy()

export {
	ellipseDrawStrategy,
}

