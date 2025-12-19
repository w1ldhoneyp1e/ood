import {type EditorState} from '../viewmodel/useEditor'
import {drawSelection} from './selection'

const drawShapes = (offscreen: HTMLCanvasElement, view: EditorState) => {
	const ctx = offscreen.getContext('2d')

	if (!ctx) {
		return
	}

	ctx.clearRect(0, 0, offscreen.width, offscreen.height)
	view.shapes.forEach(shape => {
		ctx.fillStyle = shape.fill

		if (shape.type === 'rectangle') {
			ctx.fillRect(shape.frame.x, shape.frame.y, shape.frame.width, shape.frame.height)
		}
		else if (shape.type === 'ellipse') {
			ctx.beginPath()
			ctx.ellipse(
				shape.frame.x + shape.frame.width / 2,
				shape.frame.y + shape.frame.height / 2,
				shape.frame.width / 2,
				shape.frame.height / 2,
				0,
				0,
				Math.PI * 2,
			)
			ctx.fill()
		}
		else {
			ctx.beginPath()
			ctx.moveTo(shape.frame.x + shape.frame.width / 2, shape.frame.y)
			ctx.lineTo(shape.frame.x + shape.frame.width, shape.frame.y + shape.frame.height)
			ctx.lineTo(shape.frame.x, shape.frame.y + shape.frame.height)
			ctx.closePath()
			ctx.fill()
		}
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

