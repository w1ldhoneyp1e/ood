import {
	type IShape,
	type Rect,
	type ShapeType,
} from './types'
import {
	clamp,
	cloneShape,
	colorByIndex,
	normalizeSize,
} from './utils'

type DocumentListener = () => void

class Document {
	private shapes: IShape[] = []

	private listeners = new Set<DocumentListener>()

	private counter = 1

	subscribe(listener: DocumentListener) {
		this.listeners.add(listener)

		return () => this.listeners.delete(listener)
	}

	getSnapshot() {
		return this.shapes.map(shape => cloneShape(shape))
	}

	addShape(type: ShapeType, frame: Rect) {
		const shape: IShape = {
			id: `shape-${this.counter}`,
			type,
			fill: colorByIndex(this.counter),
			frame: {
				x: frame.x,
				y: frame.y,
				width: frame.width,
				height: frame.height,
			},
		}

		this.counter += 1
		this.shapes.push(shape)
		this.notify()

		return shape.id
	}

	removeShape(id: string) {
		const nextShapes = this.shapes.filter(shape => shape.id !== id)

		if (nextShapes.length === this.shapes.length) {
			return false
		}

		this.shapes = nextShapes
		this.notify()

		return true
	}

	setFrame(id: string, frame: Rect) {
		const shape = this.shapes.find(item => item.id === id)

		if (!shape) {
			return false
		}

		const width = normalizeSize(frame.width, 10)
		const height = normalizeSize(frame.height, 10)
		const x = frame.x
		const y = frame.y

		shape.frame = {
			x,
			y,
			width,
			height,
		}
		this.notify()

		return true
	}

	moveShape(id: string, x: number, y: number, limits: Rect) {
		const shape = this.shapes.find(item => item.id === id)

		if (!shape) {
			return false
		}

		const width = shape.frame.width
		const height = shape.frame.height
		const nextX = clamp(x, 0, limits.width - width)
		const nextY = clamp(y, 0, limits.height - height)

		shape.frame = {
			x: nextX,
			y: nextY,
			width,
			height,
		}
		this.notify()

		return true
	}

	private notify() {
		this.listeners.forEach(listener => listener())
	}
}

export {
	Document,
	type DocumentListener,
}
