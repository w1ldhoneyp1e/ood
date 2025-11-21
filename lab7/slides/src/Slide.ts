import {type ICanvas} from './canvas/ICanvas'
import {type IShape} from './shapes/IShape'

class Slide {
	private shapes: IShape[] = []

	addShape(shape: IShape): void {
		this.shapes.push(shape)
	}

	removeShape(shape: IShape): void {
		const index = this.shapes.indexOf(shape)
		if (index !== -1) {
			this.shapes.splice(index, 1)
		}
	}

	getShapes(): readonly IShape[] {
		return this.shapes
	}

	draw(canvas: ICanvas): void {
		for (const shape of this.shapes) {
			shape.draw(canvas)
		}
	}
}

export {
	Slide,
}

