import {type Document} from '../../../model/Document'
import {
	type IShape,
	type Point,
	type Rect,
} from '../../../model/types'
import {type DragContext} from '../types'

interface DragHandlerContext {
	document: Document,
	selectedId: string,
	dragState: DragContext,
	canvasLimits: Rect,
	shapes: IShape[],
}

interface IDragHandler {
	handleMove: (context: DragHandlerContext, point: Point) => void,
	handleUp: (context: DragHandlerContext) => void,
}

export {
	type IDragHandler,
	type DragHandlerContext,
}

