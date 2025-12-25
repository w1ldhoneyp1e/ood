import {type Point, type Rect} from '../../types'
import {type IHitTestStrategy} from '../IHitTestStrategy'

const triangleArea = (a: Point, b: Point, c: Point) => {
	const area = (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)) / 2

	return Math.abs(area)
}

class TriangleHitTestStrategy implements IHitTestStrategy {
	isPointInside(frame: Rect, point: Point): boolean {
		const p1 = {
			x: frame.x + frame.width / 2,
			y: frame.y,
		}
		const p2 = {
			x: frame.x + frame.width,
			y: frame.y + frame.height,
		}
		const p3 = {
			x: frame.x,
			y: frame.y + frame.height,
		}
		const area = triangleArea(p1, p2, p3)
		const area1 = triangleArea(point, p2, p3)
		const area2 = triangleArea(p1, point, p3)
		const area3 = triangleArea(p1, p2, point)
		const total = area1 + area2 + area3

		return Math.abs(total - area) < 0.5
	}
}

const triangleHitTestStrategy = new TriangleHitTestStrategy()

export {
	triangleHitTestStrategy,
}

