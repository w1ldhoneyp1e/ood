import {AddShapeCommand} from './command/AddShapeCommand'
import {CommandHistory} from './command/CommandHistory'
import {MoveShapeCommand} from './command/MoveShapeCommand'
import {RemoveShapeCommand} from './command/RemoveShapeCommand'
import {SetFrameCommand} from './command/SetFrameCommand'
import {
	type IShape,
	type Rect,
	type ShapeType,
} from './types'
import {clamp, normalizeSize} from './utils'

type DocumentListener = () => void

class Document {
	private shapes: IShape[] = []

	private listeners = new Set<DocumentListener>()

	private counter = 1

	private history = new CommandHistory()

	subscribe(listener: DocumentListener) {
		this.listeners.add(listener)

		return () => this.listeners.delete(listener)
	}

	getSnapshot() {
		return this.shapes.map(shape => shape.clone())
	}

	addShape(type: ShapeType, frame: Rect) {
		const command = new AddShapeCommand({
			shapes: this.shapes,
			counter: this.counter,
			type,
			frame,
			onNotify: () => this.notify(),
		})

		this.counter += 1
		this.history.execute(command)

		return command.getShapeId() ?? ''
	}

	removeShape(id: string) {
		const shape = this.shapes.find(s => s.id === id)

		if (!shape) {
			return false
		}

		const command = new RemoveShapeCommand(
			this.shapes,
			id,
			() => this.notify(),
		)

		this.history.execute(command)

		return true
	}

	setFrame(id: string, frame: Rect, createCommand: boolean = false, startFrame?: Rect) {
		const shape = this.shapes.find(item => item.id === id)

		if (!shape) {
			return false
		}

		const width = normalizeSize(frame.width, 10)
		const height = normalizeSize(frame.height, 10)

		if (createCommand && startFrame) {
			const command = new SetFrameCommand(
				shape,
				{
					x: frame.x,
					y: frame.y,
					width,
					height,
				},
				startFrame,
				() => this.notify(),
			)

			this.history.execute(command)

			return true
		}

		shape.frame = {
			x: frame.x,
			y: frame.y,
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

	moveShapeWithCommand(id: string, limits: Rect, startFrame: Rect) {
		const shape = this.shapes.find(item => item.id === id)

		if (!shape) {
			return false
		}

		const command = new MoveShapeCommand({
			shape,
			x: shape.frame.x,
			y: shape.frame.y,
			limits,
			startFrame,
			onNotify: () => this.notify(),
		})

		this.history.execute(command)

		return true
	}

	undo(): string | null {
		return this.history.undo()
	}

	redo(): string | null {
		return this.history.redo()
	}

	canUndo(): boolean {
		return this.history.canUndo()
	}

	canRedo(): boolean {
		return this.history.canRedo()
	}

	private notify() {
		queueMicrotask(() => {
			this.listeners.forEach(listener => listener())
		})
	}
}

export {
	Document,
	type DocumentListener,
}
