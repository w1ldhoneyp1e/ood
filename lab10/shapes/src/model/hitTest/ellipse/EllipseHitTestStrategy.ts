import {type Point, type Rect} from '../../types'
import {type IHitTestStrategy} from '../IHitTestStrategy'

class EllipseHitTestStrategy implements IHitTestStrategy {
	isPointInside(frame: Rect, point: Point): boolean {
		const centerX = frame.x + frame.width / 2
		const centerY = frame.y + frame.height / 2
		const normX = (point.x - centerX) / (frame.width / 2)
		const normY = (point.y - centerY) / (frame.height / 2)

		return normX * normX + normY * normY <= 1
	}
}

const ellipseHitTestStrategy = new EllipseHitTestStrategy()

export {
	ellipseHitTestStrategy,
}

