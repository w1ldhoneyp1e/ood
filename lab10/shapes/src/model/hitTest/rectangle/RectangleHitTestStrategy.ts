import {type Point, type Rect} from '../../types'
import {type IHitTestStrategy} from '../IHitTestStrategy'

class RectangleHitTestStrategy implements IHitTestStrategy {
	isPointInside(frame: Rect, point: Point): boolean {
		const insideX = point.x >= frame.x && point.x <= frame.x + frame.width
		const insideY = point.y >= frame.y && point.y <= frame.y + frame.height

		return insideX && insideY
	}
}

const rectangleHitTestStrategy = new RectangleHitTestStrategy()

export {
	rectangleHitTestStrategy,
}

