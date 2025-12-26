import {CommandHistory} from '../CommandHistory'
import {type ICommand} from '../ICommand'

class MockCommand implements ICommand {
	private executed = false
	private undone = false

	constructor(
		private shapeId: string,
	) {}

	execute(): void {
		this.executed = true
		this.undone = false
	}

	undo(): void {
		this.undone = true
		this.executed = false
	}

	getAffectedShapeId(): string | null {
		return this.shapeId
	}

	isExecuted(): boolean {
		return this.executed
	}

	isUndone(): boolean {
		return this.undone
	}
}

describe('CommandHistory', () => {
	let history: CommandHistory

	beforeEach(() => {
		history = new CommandHistory()
	})

	describe('execute', () => {
		it('должен выполнять команду', () => {
			const command = new MockCommand('shape-1')
			history.execute(command)

			expect(command.isExecuted()).toBe(true)
		})

		it('должен добавлять команду в историю', () => {
			const command = new MockCommand('shape-1')
			history.execute(command)

			expect(history.canUndo()).toBe(true)
		})
	})

	describe('undo', () => {
		it('должен отменять последнюю команду', () => {
			const command = new MockCommand('shape-1')
			history.execute(command)

			const affectedId = history.undo()

			expect(affectedId).toBe('shape-1')
			expect(command.isUndone()).toBe(true)
			expect(history.canUndo()).toBe(false)
		})

		it('должен возвращать null если нет команд для отмены', () => {
			const result = history.undo()
			expect(result).toBeNull()
		})

		it('должен правильно обрабатывать несколько команд', () => {
			const command1 = new MockCommand('shape-1')
			const command2 = new MockCommand('shape-2')

			history.execute(command1)
			history.execute(command2)

			expect(history.canUndo()).toBe(true)

			const id1 = history.undo()
			expect(id1).toBe('shape-2')
			expect(command2.isUndone()).toBe(true)
			expect(command1.isExecuted()).toBe(true)

			const id2 = history.undo()
			expect(id2).toBe('shape-1')
			expect(command1.isUndone()).toBe(true)
		})
	})

	describe('redo', () => {
		it('должен повторять отменённую команду', () => {
			const command = new MockCommand('shape-1')
			history.execute(command)
			history.undo()

			expect(history.canRedo()).toBe(true)

			const affectedId = history.redo()
			expect(affectedId).toBe('shape-1')
			expect(command.isExecuted()).toBe(true)
		})

		it('должен возвращать null если нет команд для повтора', () => {
			const result = history.redo()
			expect(result).toBeNull()
		})

		it('должен правильно обрабатывать цепочку отмен и повторов', () => {
			const command1 = new MockCommand('shape-1')
			const command2 = new MockCommand('shape-2')
			const command3 = new MockCommand('shape-3')

			history.execute(command1)
			history.execute(command2)
			history.execute(command3)

			history.undo()
			history.undo()

			expect(history.canRedo()).toBe(true)

			const id1 = history.redo()
			expect(id1).toBe('shape-2')
			expect(command2.isExecuted()).toBe(true)

			const id2 = history.redo()
			expect(id2).toBe('shape-3')
			expect(command3.isExecuted()).toBe(true)
		})
	})

	describe('canUndo', () => {
		it('должен возвращать false если нет команд', () => {
			expect(history.canUndo()).toBe(false)
		})

		it('должен возвращать true если есть команды для отмены', () => {
			const command = new MockCommand('shape-1')
			history.execute(command)

			expect(history.canUndo()).toBe(true)
		})

		it('должен возвращать false после отмены всех команд', () => {
			const command = new MockCommand('shape-1')
			history.execute(command)
			history.undo()

			expect(history.canUndo()).toBe(false)
		})
	})

	describe('canRedo', () => {
		it('должен возвращать false если нет отменённых команд', () => {
			expect(history.canRedo()).toBe(false)
		})

		it('должен возвращать true если есть команды для повтора', () => {
			const command = new MockCommand('shape-1')
			history.execute(command)
			history.undo()

			expect(history.canRedo()).toBe(true)
		})

		it('должен возвращать false после повтора всех команд', () => {
			const command = new MockCommand('shape-1')
			history.execute(command)
			history.undo()
			history.redo()

			expect(history.canRedo()).toBe(false)
		})
	})

	describe('clear', () => {
		it('должен очищать историю', () => {
			const command1 = new MockCommand('shape-1')
			const command2 = new MockCommand('shape-2')

			history.execute(command1)
			history.execute(command2)
			history.undo()

			history.clear()

			expect(history.canUndo()).toBe(false)
			expect(history.canRedo()).toBe(false)
		})
	})

	describe('branching', () => {
		it('должен удалять будущие команды при выполнении новой команды после отмены', () => {
			const command1 = new MockCommand('shape-1')
			const command2 = new MockCommand('shape-2')
			const command3 = new MockCommand('shape-3')

			history.execute(command1)
			history.execute(command2)
			history.undo()

			history.execute(command3)

			expect(history.canRedo()).toBe(false)
			expect(history.canUndo()).toBe(true)

			history.undo()
			expect(command3.isUndone()).toBe(true)
			expect(command1.isExecuted()).toBe(true)
		})
	})
})

