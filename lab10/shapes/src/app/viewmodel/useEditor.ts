import {
	useCallback,
	useEffect,
	useState,
} from 'react'
import {type Document} from '../../model/Document'
import {type Point, type ShapeType} from '../../model/types'
import {
	DEFAULT_CANVAS_LIMITS,
	DEFAULT_SHAPE_HEIGHT,
	DEFAULT_SHAPE_WIDTH,
} from '../const'
import {type EditorApi, type EditorState} from './types'
import {hitted, resizeFrame} from './utils'

const useEditor = (document: Document): EditorApi => {
	const [state, setState] = useState<EditorState>({
		shapes: document.getSnapshot(),
		selectedId: null,
		dragState: {mode: 'none'},
		canvasLimits: DEFAULT_CANVAS_LIMITS,
	})

	useEffect(() => {
		const unsubscribe = document.subscribe(() => {
			setState(prev => ({
				...prev,
				shapes: document.getSnapshot(),
			}))
		})

		return () => {
			unsubscribe()
		}
	}, [document, setState])

	const setCanvasLimits = useCallback((width: number, height: number) => {
		setState(prev => ({
			...prev,
			canvasLimits: {
				x: 0,
				y: 0,
				width,
				height,
			},
		}))
	}, [])

	const addShape = useCallback((type: ShapeType) => {
		const {canvasLimits} = state
		const x = Math.max((canvasLimits.width - DEFAULT_SHAPE_WIDTH) / 2, 0)
		const y = Math.max((canvasLimits.height - DEFAULT_SHAPE_HEIGHT) / 2, 0)

		document.addShape(type, {
			x,
			y,
			width: DEFAULT_SHAPE_WIDTH,
			height: DEFAULT_SHAPE_HEIGHT,
		})
		setState(prev => ({
			...prev,
			selectedId: null,
			dragState: {mode: 'none'},
			shapes: document.getSnapshot(),
		}))
	}, [state.canvasLimits, document])

	const deleteSelection = useCallback(() => {
		if (!state.selectedId) {
			return
		}

		document.removeShape(state.selectedId)
		setState(prev => ({
			...prev,
			selectedId: null,
			dragState: {mode: 'none'},
			shapes: document.getSnapshot(),
		}))
	}, [state.selectedId, document])

	const clearSelection = useCallback(() => {
		setState(prev => ({
			...prev,
			selectedId: null,
			dragState: {mode: 'none'},
		}))
	}, [])

	const mouseDown = useCallback((point: Point) => {
		const hit = hitted(state.shapes, state.selectedId, point)

		if (!hit) {
			setState(prev => ({
				...prev,
				selectedId: null,
				dragState: {mode: 'none'},
			}))

			return
		}

		if (hit.handle) {
			setState(prev => ({
				...prev,
				selectedId: hit.id,
				dragState: {
					mode: 'resize',
					handle: hit.handle,
					origin: {...hit.frame},
				},
			}))

			return
		}

		setState(prev => ({
			...prev,
			selectedId: hit.id,
			dragState: {
				mode: 'move',
				offset: {
					x: point.x - hit.frame.x,
					y: point.y - hit.frame.y,
				},
			},
		}))
	}, [state.shapes, state.selectedId])

	const mouseMove = useCallback((point: Point) => {
		const {
			dragState,
			selectedId,
			canvasLimits,
		} = state

		if (dragState.mode === 'none' || !selectedId) {
			return
		}

		if (dragState.mode === 'move') {
			if (!dragState.offset) {
				return
			}

			const nextX = point.x - dragState.offset.x
			const nextY = point.y - dragState.offset.y
			document.moveShape(selectedId, nextX, nextY, canvasLimits)

			return
		}

		if (dragState.mode === 'resize') {
			if (!dragState.origin || !dragState.handle) {
				return
			}

			const frame = resizeFrame(dragState.origin, dragState.handle, point, canvasLimits)
			document.setFrame(selectedId, frame)
		}
	}, [document, state.canvasLimits, state.dragState, state.selectedId])

	const mouseUp = useCallback(() => {
		setState(prev => ({
			...prev,
			dragState: {mode: 'none'},
		}))
	}, [])

	return {
		state,
		setCanvasLimits,
		addShape,
		deleteSelection,
		clearSelection,
		mouseDown,
		mouseMove,
		mouseUp,
	}
}

export {
	useEditor,
	type EditorApi,
	type EditorState,
}
