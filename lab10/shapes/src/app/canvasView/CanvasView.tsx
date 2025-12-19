import {useCallback, useRef} from 'react'
import {type Point} from '../../model/types'
import {type EditorState} from '../viewmodel/useEditor'
import {
	copyToCanvas,
	drawOverlayLayer,
	drawShapes,
} from './render'
import {useCanvasDraw, useCanvasResize} from './useCanvas'

interface CanvasViewProps {
	state: EditorState,
	onDeleteRequest: () => void,
	onMouseDown: (point: Point) => void,
	onMouseMove: (point: Point) => void,
	onMouseUp: () => void,
	setCanvasLimits: (width: number, height: number) => void,
}

function CanvasView({
	state,
	onDeleteRequest,
	onMouseDown,
	onMouseMove,
	onMouseUp,
	setCanvasLimits,
}: CanvasViewProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const overlayRef = useRef<HTMLCanvasElement | null>(null)
	const offscreenRef = useRef<HTMLCanvasElement | null>(null)

	const drawMain = useCallback(() => {
		const canvas = canvasRef.current
		const offscreen = offscreenRef.current

		if (!canvas || !offscreen) {
			return
		}

		drawShapes(offscreen, state)
		copyToCanvas(offscreen, canvas)
	}, [state])

	const drawOverlay = useCallback(() => {
		const canvas = overlayRef.current

		if (!canvas) {
			return
		}

		drawOverlayLayer(canvas, state)
	}, [state])

	const ensureCanvasSize = useCallback(() => {
		const canvas = canvasRef.current
		const overlay = overlayRef.current

		if (!canvas || !overlay) {
			return
		}

		const rect = canvas.parentElement?.getBoundingClientRect()

		if (!rect) {
			return
		}

		const width = Math.floor(rect.width)
		const height = Math.floor(rect.height)
		const changed = canvas.width !== width || canvas.height !== height
		canvas.width = width
		canvas.height = height
		overlay.width = width
		overlay.height = height
		setCanvasLimits(width, height)

		if (!offscreenRef.current) {
			offscreenRef.current = document.createElement('canvas')
		}

		offscreenRef.current.width = width
		offscreenRef.current.height = height

		if (changed) {
			drawMain()
			drawOverlay()
		}
	}, [drawMain, drawOverlay, setCanvasLimits])

	const draw = useCallback(() => {
		ensureCanvasSize()
		drawMain()
		drawOverlay()
	}, [drawMain, drawOverlay, ensureCanvasSize])

	const getPoint = useCallback((event: React.MouseEvent): Point | null => {
		const canvas = canvasRef.current

		if (!canvas) {
			return null
		}

		const rect = canvas.getBoundingClientRect()
		const x = event.clientX - rect.left
		const y = event.clientY - rect.top

		return {
			x,
			y,
		}
	}, [])

	const handleKeyDown = useCallback((event: KeyboardEvent) => {
		if (event.key === 'Delete') {
			onDeleteRequest()
		}
	}, [onDeleteRequest])

	const handleMouseDown = useCallback((event: React.MouseEvent) => {
		const point = getPoint(event)

		if (!point) {
			return
		}

		onMouseDown(point)
	}, [getPoint, onMouseDown])

	const handleMouseMove = useCallback((event: React.MouseEvent) => {
		const point = getPoint(event)

		if (!point) {
			return
		}

		onMouseMove(point)
	}, [getPoint, onMouseMove])

	useCanvasResize(ensureCanvasSize, handleKeyDown)
	useCanvasDraw(draw, state)

	return (
		<div
			className="canvas-shell"
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseUp}
		>
			<canvas ref={canvasRef} className="canvas-main" />
			<canvas ref={overlayRef} className="canvas-overlay" />
		</div>
	)
}

export {
	CanvasView,
}

