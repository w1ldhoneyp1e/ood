import {
	type IShape,
	type Point,
	type Rect,
	type ShapeType,
} from '../../model/types'

enum HANDLES {
	topLeft = 'tl',
	top = 't',
	topRight = 'tr',
	right = 'r',
	bottomRight = 'br',
	bottom = 'b',
	bottomLeft = 'bl',
	left = 'l',
}

type DragMode = 'none' | 'move' | 'resize'

interface DragContext {
	mode: DragMode,
	offset?: Point,
	handle?: HANDLES,
	origin?: Rect,
}

interface EditorState {
	shapes: IShape[],
	selectedId: string | null,
	dragState: DragContext,
	canvasLimits: Rect,
}

interface EditorApi {
	state: EditorState,
	setCanvasLimits: (width: number, height: number) => void,
	addShape: (type: ShapeType) => void,
	deleteSelection: () => void,
	clearSelection: () => void,
	undo: () => void,
	redo: () => void,
	canUndo: () => boolean,
	canRedo: () => boolean,
	mouseDown: (point: Point) => void,
	mouseMove: (point: Point) => void,
	mouseUp: () => void,
}

interface HandlePosition {
	key: HANDLES,
	x: number,
	y: number,
}

export {
	HANDLES,
}

export type {
	DragMode,
	DragContext,
	EditorState,
	EditorApi,
	HandlePosition,
}
