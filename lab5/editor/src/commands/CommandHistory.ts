import {type ICommand} from '../interfaces/ICommand'

export class CommandHistory {
	private history: ICommand[] = []
	private currentIndex = -1
	private readonly maxHistorySize: number = 10

	addCommand(command: ICommand): void {
		this.history = this.history.slice(0, this.currentIndex + 1)

		this.history.push(command)
		this.currentIndex++

		if (this.history.length > this.maxHistorySize) {
			this.history.shift()
			this.currentIndex--
		}
	}

	undo(): void {
		if (this.canUndo()) {
			const command = this.history[this.currentIndex]
			command.undo()
			this.currentIndex--
		}
	}

	redo(): void {
		if (this.canRedo()) {
			this.currentIndex++
			const command = this.history[this.currentIndex]
			command.execute()
		}
	}

	canUndo(): boolean {
		return this.currentIndex >= 0
	}

	canRedo(): boolean {
		return this.currentIndex < this.history.length - 1
	}
}
