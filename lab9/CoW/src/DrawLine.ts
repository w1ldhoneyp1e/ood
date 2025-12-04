import {type Image} from './Image'
import {type Point} from './types'

// https://ru.wikibooks.org/wiki/%D0%A0%D0%B5%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D0%B8_%D0%B0%D0%BB%D0%B3%D0%BE%D1%80%D0%B8%D1%82%D0%BC%D0%BE%D0%B2/%D0%90%D0%BB%D0%B3%D0%BE%D1%80%D0%B8%D1%82%D0%BC_%D0%91%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%85%D1%8D%D0%BC%D0%B0
function drawLine(image: Image, from: Point, to: Point, color: string): void {
	let x0 = from.x
	let y0 = from.y
	const x1 = to.x
	const y1 = to.y

	const dx = Math.abs(x1 - x0)
	const dy = Math.abs(y1 - y0)
	const sx = x0 < x1
		? 1
		: -1
	const sy = y0 < y1
		? 1
		: -1
	let err = dx - dy

	while (true) {
		image.setPixel(x0, y0, color)

		if (x0 === x1 && y0 === y1) {
			break
		}

		const e2 = 2 * err

		if (e2 > -dy) {
			err -= dy
			x0 += sx
		}

		if (e2 < dx) {
			err += dx
			y0 += sy
		}
	}
}

export {
	drawLine,
}

