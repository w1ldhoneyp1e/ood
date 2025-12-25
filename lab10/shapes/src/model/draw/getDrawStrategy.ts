import {type ICanvas} from '../ICanvas'
import {type IShape, type ShapeType} from '../types'
import {ellipseDrawStrategy} from './ellipse/EllipseDrawStrategy'
import {rectangleDrawStrategy} from './rectangle/RectangleDrawStrategy'
import {triangleDrawStrategy} from './triangle/TriangleDrawStrategy'

const getDrawStrategy = (type: ShapeType): (shape: IShape, canvas: ICanvas) => void => {
	if (type === 'rectangle') {
		return (shape, canvas) => rectangleDrawStrategy.draw(shape, canvas)
	}

	if (type === 'ellipse') {
		return (shape, canvas) => ellipseDrawStrategy.draw(shape, canvas)
	}

	return (shape, canvas) => triangleDrawStrategy.draw(shape, canvas)
}

export {
	getDrawStrategy,
}

