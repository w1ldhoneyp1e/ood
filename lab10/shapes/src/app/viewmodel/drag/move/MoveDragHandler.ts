import {type Point} from '../../../../model/types'
import {type DragHandlerContext, type IDragHandler} from '../IDragHandler'

class MoveDragHandler implements IDragHandler {
	handleMove(context: DragHandlerContext, point: Point): void {
		const {
			document, selectedId, dragState, canvasLimits,
		} = context

		if (!dragState.offset) {
			return
		}

		const nextX = point.x - dragState.offset.x
		const nextY = point.y - dragState.offset.y
		document.moveShape(selectedId, nextX, nextY, canvasLimits)
	}

	handleUp(context: DragHandlerContext): void {
		const {
			document, selectedId, dragState, canvasLimits,
		} = context

		if (!dragState.origin) {
			return
		}

		document.moveShapeWithCommand(selectedId, canvasLimits, dragState.origin)
	}
}

const moveDragHandler = new MoveDragHandler()

export {
	moveDragHandler,
}

