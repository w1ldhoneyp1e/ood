import {type ShapeType} from '../types'
import {ellipseHitTestStrategy} from './ellipse/EllipseHitTestStrategy'
import {type IHitTestStrategy} from './IHitTestStrategy'
import {rectangleHitTestStrategy} from './rectangle/RectangleHitTestStrategy'
import {triangleHitTestStrategy} from './triangle/TriangleHitTestStrategy'

const getHitTestStrategy = (type: ShapeType): IHitTestStrategy => {
	if (type === 'rectangle') {
		return rectangleHitTestStrategy
	}

	if (type === 'ellipse') {
		return ellipseHitTestStrategy
	}

	return triangleHitTestStrategy
}

export {
	getHitTestStrategy,
}

