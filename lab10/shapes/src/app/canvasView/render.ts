import {type EditorState} from '../viewmodel/useEditor'
import {Canvas2D} from './canvas/Canvas2D'
import {drawSelection} from './selection'

const drawShapes = (offscreen: HTMLCanvasElement, view: EditorState) => {
	const ctx = offscreen.getContext('2d')

	if (!ctx) {
		return
	}

	ctx.clearRect(0, 0, offscreen.width, offscreen.height)

	const canvas = new Canvas2D(ctx)

	view.shapes.forEach(shape => {
		shape.draw(shape, canvas)
	})
}

const copyToCanvas = (offscreen: HTMLCanvasElement, canvas: HTMLCanvasElement) => {
	const target = canvas.getContext('2d')

	if (!target) {
		return
	}

	target.clearRect(0, 0, canvas.width, canvas.height)
	target.drawImage(offscreen, 0, 0)
}

const drawOverlayLayer = (overlay: HTMLCanvasElement, view: EditorState) => {
	const ctx = overlay.getContext('2d')

	if (!ctx) {
		return
	}

	ctx.clearRect(0, 0, overlay.width, overlay.height)

	if (!view.selectedId) {
		return
	}

	const selected = view.shapes.find(shape => shape.id === view.selectedId)

	if (!selected) {
		return
	}

	drawSelection(ctx, selected.frame)
}

export {
	copyToCanvas,
	drawOverlayLayer,
	drawShapes,
}

