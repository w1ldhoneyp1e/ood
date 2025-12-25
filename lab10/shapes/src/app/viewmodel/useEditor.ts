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
import {getDragHandler} from './drag/getDragHandler'
import {type EditorApi, type EditorState} from './types'
import {hitted} from './utils'

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
	}, [document])

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
		const x = Math.max((state.canvasLimits.width - DEFAULT_SHAPE_WIDTH) / 2, 0)
		const y = Math.max((state.canvasLimits.height - DEFAULT_SHAPE_HEIGHT) / 2, 0)

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
		}))
	}, [document, state.canvasLimits])

	const deleteSelection = useCallback(() => {
		setState(prev => {
			if (!prev.selectedId) {
				return prev
			}

			document.removeShape(prev.selectedId)

			return {
				...prev,
				selectedId: null,
				dragState: {mode: 'none'},
			}
		})
	}, [document])

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
				origin: {...hit.frame},
			},
		}))
	}, [state.shapes, state.selectedId])

	const mouseMove = useCallback((point: Point) => {
		const {
			dragState,
			selectedId,
			canvasLimits,
		} = state

		if (!selectedId) {
			return
		}

		const handler = getDragHandler(dragState.mode)

		handler.handleMove({
			document,
			selectedId,
			dragState,
			canvasLimits,
			shapes: state.shapes,
		}, point)
	}, [document, state])

	const mouseUp = useCallback(() => {
		const {
			dragState,
			selectedId,
			canvasLimits,
		} = state

		if (!selectedId || !dragState.origin) {
			setState(prev => ({
				...prev,
				dragState: {mode: 'none'},
			}))

			return
		}

		const handler = getDragHandler(dragState.mode)

		handler.handleUp({
			document,
			selectedId,
			dragState,
			canvasLimits,
			shapes: state.shapes,
		})

		setState(prev => ({
			...prev,
			dragState: {mode: 'none'},
		}))
	}, [document, state])

	const updateSelectionAfterCommand = useCallback((affectedId: string | null) => {
		setState(prev => ({
			...prev,
			selectedId: affectedId,
			dragState: {mode: 'none'},
		}))
	}, [])

	const undo = useCallback(() => {
		const affectedId = document.undo()
		updateSelectionAfterCommand(affectedId)
	}, [document, updateSelectionAfterCommand])

	const redo = useCallback(() => {
		const affectedId = document.redo()
		updateSelectionAfterCommand(affectedId)
	}, [document, updateSelectionAfterCommand])

	return {
		state,
		setCanvasLimits,
		addShape,
		deleteSelection,
		clearSelection,
		undo,
		redo,
		canUndo: () => document.canUndo(),
		canRedo: () => document.canRedo(),
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
