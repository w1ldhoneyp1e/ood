import {type IShape} from '../types'
import {type ICommand} from './ICommand'

class RemoveShapeCommand implements ICommand {
	private shape: IShape | null = null
	private index = -1

	constructor(
		private shapes: IShape[],
		private id: string,
		private onNotify: () => void,
	) {}

	execute(): void {
		this.index = this.shapes.findIndex(shape => shape.id === this.id)

		if (this.index === -1) {
			return
		}

		this.shape = this.shapes[this.index].clone()
		this.shapes.splice(this.index, 1)
		this.onNotify()
	}

	undo(): void {
		if (!this.shape || this.index === -1) {
			return
		}

		this.shapes.splice(this.index, 0, this.shape.clone())
		this.onNotify()
	}

	getAffectedShapeId(): string | null {
		return this.id
	}
}

export {
	RemoveShapeCommand,
}

