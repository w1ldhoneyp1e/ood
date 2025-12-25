import {type IShape, type Rect} from '../types'
import {clamp} from '../utils'
import {type ICommand} from './ICommand'

interface MoveShapeCommandParams {
	shape: IShape,
	x: number,
	y: number,
	limits: Rect,
	startFrame: Rect,
	onNotify: () => void,
}

class MoveShapeCommand implements ICommand {
	constructor(
		private params: MoveShapeCommandParams,
	) {}

	execute(): void {
		const width = this.params.shape.frame.width
		const height = this.params.shape.frame.height
		const nextX = clamp(this.params.x, 0, this.params.limits.width - width)
		const nextY = clamp(this.params.y, 0, this.params.limits.height - height)

		this.params.shape.frame = {
			x: nextX,
			y: nextY,
			width,
			height,
		}

		this.params.onNotify()
	}

	undo(): void {
		this.params.shape.frame = {...this.params.startFrame}
		this.params.onNotify()
	}

	getAffectedShapeId(): string | null {
		return this.params.shape.id
	}
}

export {
	MoveShapeCommand,
	type MoveShapeCommandParams,
}

