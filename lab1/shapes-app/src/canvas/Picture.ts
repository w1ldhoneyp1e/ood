import {Color} from '../Color'
import {type Shape} from '../shapes/Shape'
import {createShape} from '../shapes/ShapeFactory'

class Picture {
	private shapes = new Map<string, Shape>()
	private order: string[] = []

	addShape(shape: Shape): void {
		if (this.shapes.has(shape.id)) {
			throw new Error(`Shape with id '${shape.id}' already exists`)
		}
		this.shapes.set(shape.id, shape)
		this.order.push(shape.id)
	}

	getShape(id: string): Shape | undefined {
		return this.shapes.get(id)
	}

	deleteShape(id: string): void {
		if (!this.shapes.has(id)) {
			throw new Error(`Shape with id '${id}' not found`)
		}
		this.shapes.delete(id)
		this.order = this.order.filter(shapeId => shapeId !== id)
	}

	movePicture(dx: number, dy: number): void {
		this.shapes.forEach(shape => shape.move(dx, dy))
	}

	draw(canvas: any): void {
		this.order.forEach(id => {
			const shape = this.shapes.get(id)
			if (shape) {
				shape.draw(canvas)
			}
		})
	}

	listShapes(): string[] {
		return this.order.map((id, index) => {
			const shape = this.shapes.get(id)!
			return `${index + 1} ${shape.constructor.name.toLowerCase()} ${shape.id} ${shape.color.toString()} ${shape.getDescription()}`
		})
	}

	changeColor(id: string, color: string): void {
		const shape = this.getShape(id)
		if (!shape) {
			throw new Error(`Shape with id '${id}' not found`)
		}
		shape.color = new Color(color)
	}

	changeShape(id: string, type: string, params: (number | string)[]): void {
		const oldShape = this.getShape(id)
		if (!oldShape) {
			throw new Error(`Shape with id '${id}' not found`)
		}

		const newShape = createShape({
			type,
			id,
			color: oldShape.color.toString(),
			params,
		})
		this.shapes.set(id, newShape)
	}

	cloneShape(id: string, newId: string): void {
		const originalShape = this.getShape(id)
		if (!originalShape) {
			throw new Error(`Shape with id '${id}' not found`)
		}

		if (this.shapes.has(newId)) {
			throw new Error(`Shape with id '${newId}' already exists`)
		}

		const clonedShape = originalShape.clone(newId)
		this.addShape(clonedShape)
	}

	// clone(): Picture {
	// 	const clonedPicture = new Picture()

	// 	this.order.forEach(id => {
	// 		const shape = this.shapes.get(id)!
	// 		const clonedShape = shape.clone(id)
	// 		clonedPicture.addShape(clonedShape)
	// 	})

	// 	return clonedPicture
	// }
}

export {
	Picture,
}
