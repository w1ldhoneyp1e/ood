import {type Rect} from '../../model/types'
import {
	HANDLE_DRAW_SIZE,
	SELECTION_COLOR,
	SELECTION_LINE_DASH,
	SELECTION_LINE_WIDTH,
	SELECTION_STROKE_EXTRA,
	SELECTION_STROKE_OFFSET,
} from '../const'
import {getHandles} from '../viewmodel/utils'

const drawSelection = (ctx: CanvasRenderingContext2D, frame: Rect) => {
	ctx.save()
	ctx.strokeStyle = SELECTION_COLOR
	ctx.lineWidth = SELECTION_LINE_WIDTH
	ctx.setLineDash([...SELECTION_LINE_DASH])
	ctx.strokeRect(
		frame.x - SELECTION_STROKE_OFFSET,
		frame.y - SELECTION_STROKE_OFFSET,
		frame.width + SELECTION_STROKE_EXTRA,
		frame.height + SELECTION_STROKE_EXTRA,
	)
	ctx.restore()
	drawHandles(ctx, frame)
}

const drawHandles = (ctx: CanvasRenderingContext2D, frame: Rect) => {
	const half = HANDLE_DRAW_SIZE / 2
	const handles = getHandles(frame)

	handles.forEach(handle => {
		ctx.beginPath()
		ctx.fillStyle = SELECTION_COLOR
		ctx.rect(handle.x - half, handle.y - half, HANDLE_DRAW_SIZE, HANDLE_DRAW_SIZE)
		ctx.fill()
	})
}

export {
	drawHandles,
	drawSelection,
}

