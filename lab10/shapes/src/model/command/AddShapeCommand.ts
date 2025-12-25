import {getDrawStrategy} from '../draw/getDrawStrategy'
import {getHitTestStrategy} from '../hitTest/getHitTestStrategy'
import {
	type IShape,
	type Rect,
	type ShapeType,
} from '../types'
import {colorByIndex} from '../utils'
import {type ICommand} from './ICommand'

interface AddShapeCommandParams {
	shapes: IShape[],
	counter: number,
	type: ShapeType,
	frame: Rect,
	onNotify: () => void,
}

class AddShapeCommand implements ICommand {
	private shape: IShape | null = null

	constructor(
		private params: AddShapeCommandParams,
	) {}

	execute(): void {
		const shape: IShape = {
			id: `shape-${this.params.counter}`,
			type: this.params.type,
			fill: colorByIndex(this.params.counter),
			frame: {
				x: this.params.frame.x,
				y: this.params.frame.y,
				width: this.params.frame.width,
				height: this.params.frame.height,
			},
			draw: getDrawStrategy(this.params.type),
			hitTest: getHitTestStrategy(this.params.type),
			clone: () => ({
				id: shape.id,
				type: shape.type,
				fill: shape.fill,
				frame: {...shape.frame},
				draw: shape.draw,
				hitTest: shape.hitTest,
				clone: shape.clone,
			}),
		}

		this.shape = shape
		this.params.shapes.push(shape)
		this.params.onNotify()
	}

	undo(): void {
		if (!this.shape) {
			return
		}

		const index = this.params.shapes.findIndex(s => s.id === this.shape!.id)

		if (index !== -1) {
			this.params.shapes.splice(index, 1)
			this.params.onNotify()
		}
	}

	getShapeId(): string | null {
		return this.shape?.id ?? null
	}

	getAffectedShapeId(): string | null {
		return this.shape?.id ?? null
	}
}

export {
	AddShapeCommand,
	type AddShapeCommandParams,
}

