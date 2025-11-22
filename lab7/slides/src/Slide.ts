import {type ICanvas} from './canvas/ICanvas'
import {type IShape} from './shapes/IShape'

class Slide {
	private shapes: IShape[] = []
	private shapeMap = new Map<string, IShape>()
	private nextId = 1

	addShape(shape: IShape): void {
		this.shapes.push(shape)
		this.shapeMap.set(shape.getId(), shape)
	}

	removeShape(shape: IShape): void {
		const index = this.shapes.indexOf(shape)
		if (index !== -1) {
			this.shapes.splice(index, 1)
			this.shapeMap.delete(shape.getId())
		}
	}

	getShapes(): readonly IShape[] {
		return this.shapes
	}

	getShapeById(id: string): IShape | undefined {
		return this.shapeMap.get(id)
	}

	generateId(): string {
		return `shape_${this.nextId++}`
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

