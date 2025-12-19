import {
	type IShape,
	type Point,
	type Rect,
} from '../../model/types'
import {clamp} from '../../model/utils'
import {
	FRAME_PADDING,
	HANDLE_HIT_SIZE,
	MIN_SHAPE_SIZE,
} from '../const'
import {type HandlePosition, HANDLES} from './types'

const resizeFrame = (origin: Rect, handle: HANDLES, point: Point, canvasLimits: Rect) => {
	const maxX = canvasLimits.width
	const maxY = canvasLimits.height
	let x = origin.x
	let y = origin.y
	let width = origin.width
	let height = origin.height
	const right = origin.x + origin.width
	const bottom = origin.y + origin.height

	if (handle === HANDLES.topLeft || handle === HANDLES.left || handle === HANDLES.bottomLeft) {
		const nextX = clamp(point.x, 0, right - MIN_SHAPE_SIZE)
		const nextWidth = right - nextX
		x = nextX
		width = nextWidth
	}

	if (handle === HANDLES.topRight || handle === HANDLES.right || handle === HANDLES.bottomRight) {
		const nextRight = clamp(point.x, origin.x + MIN_SHAPE_SIZE, maxX)
		width = nextRight - origin.x
	}

	if (handle === HANDLES.topLeft || handle === HANDLES.top || handle === HANDLES.topRight) {
		const nextY = clamp(point.y, 0, bottom - MIN_SHAPE_SIZE)
		const nextHeight = bottom - nextY
		y = nextY
		height = nextHeight
	}

	if (handle === HANDLES.bottomLeft || handle === HANDLES.bottom || handle === HANDLES.bottomRight) {
		const nextBottom = clamp(point.y, origin.y + MIN_SHAPE_SIZE, maxY)
		height = nextBottom - origin.y
	}

	const nextRightEdge = x + width
	const nextBottomEdge = y + height

	if (nextRightEdge > maxX) {
		const overflow = nextRightEdge - maxX
		width -= overflow
	}

	if (nextBottomEdge > maxY) {
		const overflow = nextBottomEdge - maxY
		height -= overflow
	}

	return {
		x,
		y,
		width,
		height,
	}
}

const hitted = (shapes: IShape[], selectionId: string | null, point: Point) => {
	if (selectionId) {
		const selected = shapes.find(shape => shape.id === selectionId)

		if (!selected) {
			return null
		}

		const selectedHandle = hitHandle(selected.frame, point)

		if (selectedHandle) {
			return {
				id: selected.id,
				frame: selected.frame,
				handle: selectedHandle,
			}
		}

		if (isOnFrame(selected.frame, point)) {
			return {
				id: selected.id,
				frame: selected.frame,
			}
		}
	}

	for (let index = shapes.length - 1; index >= 0; index -= 1) {
		const shape = shapes[index]

		if (isPointInsideShape(shape, point)) {
			return {
				id: shape.id,
				frame: shape.frame,
			}
		}
	}

	return null
}

const getHandles = (frame: Rect): HandlePosition[] => {
	const centerX = frame.x + frame.width / 2
	const centerY = frame.y + frame.height / 2

	return [
		{
			key: HANDLES.topLeft,
			x: frame.x,
			y: frame.y,
		},
		{
			key: HANDLES.top,
			x: centerX,
			y: frame.y,
		},
		{
			key: HANDLES.topRight,
			x: frame.x + frame.width,
			y: frame.y,
		},
		{
			key: HANDLES.right,
			x: frame.x + frame.width,
			y: centerY,
		},
		{
			key: HANDLES.bottomRight,
			x: frame.x + frame.width,
			y: frame.y + frame.height,
		},
		{
			key: HANDLES.bottom,
			x: centerX,
			y: frame.y + frame.height,
		},
		{
			key: HANDLES.bottomLeft,
			x: frame.x,
			y: frame.y + frame.height,
		},
		{
			key: HANDLES.left,
			x: frame.x,
			y: centerY,
		},
	]
}

const hitHandle = (frame: Rect, point: Point): HANDLES | null => {
	const half = HANDLE_HIT_SIZE / 2
	const handles = getHandles(frame)
	const found = handles.find(handle => {
		const left = handle.x - half
		const top = handle.y - half
		const right = left + HANDLE_HIT_SIZE
		const bottom = top + HANDLE_HIT_SIZE

		return point.x >= left && point.x <= right && point.y >= top && point.y <= bottom
	})

	return found?.key ?? null
}

const isOnFrame = (frame: Rect, point: Point) => {
	const left = frame.x - FRAME_PADDING
	const top = frame.y - FRAME_PADDING
	const right = frame.x + frame.width + FRAME_PADDING
	const bottom = frame.y + frame.height + FRAME_PADDING

	const insideX = point.x >= left && point.x <= right
	const insideY = point.y >= top && point.y <= bottom

	return insideX && insideY
}

const triangleArea = (a: Point, b: Point, c: Point) => {
	const area = (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)) / 2

	return Math.abs(area)
}

const isInsideRect = (frame: Rect, point: Point) => {
	const insideX = point.x >= frame.x && point.x <= frame.x + frame.width
	const insideY = point.y >= frame.y && point.y <= frame.y + frame.height

	return insideX && insideY
}

const isInsideEllipse = (frame: Rect, point: Point) => {
	const centerX = frame.x + frame.width / 2
	const centerY = frame.y + frame.height / 2
	const normX = (point.x - centerX) / (frame.width / 2)
	const normY = (point.y - centerY) / (frame.height / 2)

	return normX * normX + normY * normY <= 1
}

const isInsideTriangle = (frame: Rect, point: Point) => {
	const p1 = {
		x: frame.x + frame.width / 2,
		y: frame.y,
	}
	const p2 = {
		x: frame.x + frame.width,
		y: frame.y + frame.height,
	}
	const p3 = {
		x: frame.x,
		y: frame.y + frame.height,
	}
	const area = triangleArea(p1, p2, p3)
	const area1 = triangleArea(point, p2, p3)
	const area2 = triangleArea(p1, point, p3)
	const area3 = triangleArea(p1, p2, point)
	const total = area1 + area2 + area3

	return Math.abs(total - area) < 0.5
}

const isPointInsideShape = (shape: IShape, point: Point) => {
	if (shape.type === 'rectangle') {
		return isInsideRect(shape.frame, point)
	}

	if (shape.type === 'ellipse') {
		return isInsideEllipse(shape.frame, point)
	}

	return isInsideTriangle(shape.frame, point)
}

export {
	resizeFrame,
	hitted,
	hitHandle,
	getHandles,
	isOnFrame,
	triangleArea,
	isInsideRect,
	isInsideEllipse,
	isInsideTriangle,
	isPointInsideShape,
}
