import {type IShape, type Rect} from './types'

const clamp = (value: number, min: number, max: number) => {
	if (value < min) {
		return min
	}

	if (value > max) {
		return max
	}

	return value
}

const rectCenter = (rect: Rect) => {
	const x = rect.x + rect.width / 2
	const y = rect.y + rect.height / 2

	return {
		x,
		y,
	}
}

const translateRect = (rect: Rect, x: number, y: number) => ({
	x,
	y,
	width: rect.width,
	height: rect.height,
})

const normalizeSize = (value: number, min: number) => {
	if (value < min) {
		return min
	}

	return value
}

const cloneShape = (shape: IShape): IShape => ({
	id: shape.id,
	type: shape.type,
	fill: shape.fill,
	frame: {...shape.frame},
})

const shapePalette = [
	'#8ecae6', // yellow
	'#ffb703', // navy
	'#219ebc', // orange
	'#fb8500', // green
	'#90be6d', // pink
	'#ff6b6b', // blue
]

const colorByIndex = (index: number) => shapePalette[index % shapePalette.length]

export {
	clamp,
	normalizeSize,
	rectCenter,
	translateRect,
	cloneShape,
	shapePalette,
	colorByIndex,
}
