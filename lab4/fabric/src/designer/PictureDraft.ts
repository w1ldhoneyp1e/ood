import {type Shape} from '../shapes/Shape'

class PictureDraft {
	private shapes: Shape[] = []

	addShape(shape: Shape): void {
		this.shapes.push(shape)
	}

	getShapeCount(): number {
		return this.shapes.length
	}

	getShape(index: number): Shape {
		if (index < 0 || index >= this.shapes.length) {
			throw new Error(`Shape index out of bounds: ${index}`)
		}
		return this.shapes[index]
	}

	isEmpty(): boolean {
		return this.shapes.length === 0
	}
}

export {
	PictureDraft,
}

