import {type DragMode} from '../types'
import {type IDragHandler} from './IDragHandler'
import {moveDragHandler} from './move/MoveDragHandler'
import {noneDragHandler} from './none/NoneDragHandler'
import {resizeDragHandler} from './resize/ResizeDragHandler'

const getDragHandler = (mode: DragMode): IDragHandler => {
	if (mode === 'move') {
		return moveDragHandler
	}

	if (mode === 'resize') {
		return resizeDragHandler
	}

	return noneDragHandler
}

export {
	getDragHandler,
}

