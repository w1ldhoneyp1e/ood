import {type Point} from '../../../../model/types'
import {resizeFrame} from '../../utils'
import {type DragHandlerContext, type IDragHandler} from '../IDragHandler'

class ResizeDragHandler implements IDragHandler {
	handleMove(context: DragHandlerContext, point: Point): void {
		const {
			document,
			selectedId,
			dragState,
			canvasLimits,
		} = context

		if (!dragState.origin || !dragState.handle) {
			return
		}

		const frame = resizeFrame(dragState.origin, dragState.handle, point, canvasLimits)
		document.setFrame(selectedId, frame)
	}

	handleUp(context: DragHandlerContext): void {
		const {
			document,
			selectedId,
			dragState,
			shapes,
		} = context

		if (!dragState.origin) {
			return
		}

		const shape = shapes.find(s => s.id === selectedId)

		if (shape) {
			document.setFrame(selectedId, shape.frame, true, dragState.origin)
		}
	}
}

const resizeDragHandler = new ResizeDragHandler()

export {
	resizeDragHandler,
}

