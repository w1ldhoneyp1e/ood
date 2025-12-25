import {type ShapeType} from '../types'
import {ellipseDrawStrategy} from './ellipse/EllipseDrawStrategy'
import {type IDrawStrategy} from './IDrawStrategy'
import {rectangleDrawStrategy} from './rectangle/RectangleDrawStrategy'
import {triangleDrawStrategy} from './triangle/TriangleDrawStrategy'

const getDrawStrategy = (type: ShapeType): IDrawStrategy => {
	if (type === 'rectangle') {
		return rectangleDrawStrategy
	}

	if (type === 'ellipse') {
		return ellipseDrawStrategy
	}

	return triangleDrawStrategy
}

export {
	getDrawStrategy,
}

