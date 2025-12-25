import {type Point, type Rect} from '../types'

interface IHitTestStrategy {
	isPointInside: (frame: Rect, point: Point) => boolean,
}

export {
	type IHitTestStrategy,
}

