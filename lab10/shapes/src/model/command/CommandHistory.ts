import {type ICommand} from './ICommand'

class CommandHistory {
	private history: ICommand[] = []
	private currentIndex = -1

	execute(command: ICommand): void {
		command.execute()

		this.history = this.history.slice(0, this.currentIndex + 1)
		this.history.push(command)
		this.currentIndex = this.history.length - 1
	}

	undo(): string | null {
		if (!this.canUndo()) {
			return null
		}

		const command = this.history[this.currentIndex]
		command.undo()
		this.currentIndex -= 1

		return command.getAffectedShapeId()
	}

	redo(): string | null {
		if (!this.canRedo()) {
			return null
		}

		this.currentIndex += 1
		const command = this.history[this.currentIndex]
		command.execute()

		return command.getAffectedShapeId()
	}

	canUndo(): boolean {
		return this.currentIndex >= 0
	}

	canRedo(): boolean {
		return this.currentIndex < this.history.length - 1
	}

	clear(): void {
		this.history = []
		this.currentIndex = -1
	}
}

export {
	CommandHistory,
}

