import {type Point} from '../../../../model/types'
import {type DragHandlerContext, type IDragHandler} from '../IDragHandler'

class NoneDragHandler implements IDragHandler {
	handleMove(_context: DragHandlerContext, _point: Point): void {
	}

	handleUp(_context: DragHandlerContext): void {
	}
}

const noneDragHandler = new NoneDragHandler()

export {
	noneDragHandler,
}

