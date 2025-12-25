import {type ICanvas} from '../../ICanvas'
import {type IShape} from '../../types'
import {type IDrawStrategy} from '../IDrawStrategy'

class RectangleDrawStrategy implements IDrawStrategy {
	draw(shape: IShape, canvas: ICanvas): void {
		canvas.setFillStyle(shape.fill)
		canvas.beginPath()
		canvas.moveTo(shape.frame.x, shape.frame.y)
		canvas.lineTo(shape.frame.x + shape.frame.width, shape.frame.y)
		canvas.lineTo(shape.frame.x + shape.frame.width, shape.frame.y + shape.frame.height)
		canvas.lineTo(shape.frame.x, shape.frame.y + shape.frame.height)
		canvas.closePath()
		canvas.fill()
	}
}

const rectangleDrawStrategy = new RectangleDrawStrategy()

export {
	rectangleDrawStrategy,
}

