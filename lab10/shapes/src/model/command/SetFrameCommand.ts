import {type IShape, type Rect} from '../types'
import {normalizeSize} from '../utils'
import {type ICommand} from './ICommand'

class SetFrameCommand implements ICommand {
	constructor(
		private shape: IShape,
		private newFrame: Rect,
		private startFrame: Rect,
		private onNotify: () => void,
	) {}

	execute(): void {
		const width = normalizeSize(this.newFrame.width, 10)
		const height = normalizeSize(this.newFrame.height, 10)

		this.shape.frame = {
			x: this.newFrame.x,
			y: this.newFrame.y,
			width,
			height,
		}

		this.onNotify()
	}

	undo(): void {
		this.shape.frame = {...this.startFrame}
		this.onNotify()
	}

	getAffectedShapeId(): string | null {
		return this.shape.id
	}
}

export {
	SetFrameCommand,
}

