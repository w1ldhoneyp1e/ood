import {type ICanvas} from './canvas/ICanvas'
import {type IShape} from './shapes/IShape'

class Slide {
	private shapes: IShape[] = []
	private shapeMap = new Map<string, IShape>()

	addShape(id: string, shape: IShape): void {
		if (this.shapeMap.has(id)) {
			throw new Error(`Фигура с ID "${id}" уже существует`)
		}
		this.shapes.push(shape)
		this.shapeMap.set(id, shape)
	}

	removeShape(shape: IShape): void {
		const index = this.shapes.indexOf(shape)
		if (index !== -1) {
			this.shapes.splice(index, 1)
			for (const [shapeId, shapeValue] of this.shapeMap.entries()) {
				if (shapeValue === shape) {
					this.shapeMap.delete(shapeId)
					break
				}
			}
		}
	}

	getShapes(): readonly IShape[] {
		return this.shapes
	}

	getShapeById(id: string): IShape | undefined {
		return this.shapeMap.get(id)
	}

	getAllShapesWithIds(): [string, IShape][] {
		return Array.from(this.shapeMap.entries())
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

