import {CommandHistory} from '../commands/CommandHistory'
import {type ICommand} from '../interfaces/ICommand'

class MockCommand implements ICommand {
	private executed = false
	private undone = false

	constructor(public description: string) {}

	execute(): void {
		this.executed = true
		this.undone = false
	}

	undo(): void {
		this.undone = true
		this.executed = false
	}

	isExecuted(): boolean {
		return this.executed
	}

	isUndone(): boolean {
		return this.undone
	}
}

describe('CommandHistory', () => { // undo empty history
	let history: CommandHistory

	beforeEach(() => {
		history = new CommandHistory()
	})

	test('start with no commands', () => {
		expect(history.canUndo()).toBe(false)
		expect(history.canRedo()).toBe(false)
	})

	test('undo on empty history does nothing', () => {
		expect(history.canUndo()).toBe(false)
		history.undo()
		expect(history.canUndo()).toBe(false)
	})

	test('redo on empty history does nothing', () => {
		expect(history.canRedo()).toBe(false)
		history.redo()
		expect(history.canRedo()).toBe(false)
	})

	test('add and execute command', () => {
		const command = new MockCommand('Test command')

		history.addCommand(command)
		command.execute()

		expect(command.isExecuted()).toBe(true)
		expect(history.canUndo()).toBe(true)
		expect(history.canRedo()).toBe(false)
	})

	test('undo command', () => {
		const command = new MockCommand('Test command')

		history.addCommand(command)
		command.execute()
		history.undo()

		expect(command.isUndone()).toBe(true)
		expect(history.canUndo()).toBe(false)
		expect(history.canRedo()).toBe(true)
	})

	test('redo command', () => {
		const command = new MockCommand('Test command')

		history.addCommand(command)
		command.execute()
		history.undo()
		history.redo()

		expect(command.isExecuted()).toBe(true)
		expect(history.canUndo()).toBe(true)
		expect(history.canRedo()).toBe(false)
	})

	test('limit history size', () => {
		for (let i = 0; i < 12; i++) {
			const command = new MockCommand(`Command ${i}`)
			history.addCommand(command)
			command.execute()
		}

		expect(history.canUndo()).toBe(true)

		for (let i = 0; i < 10; i++) {
			history.undo()
		}

		expect(history.canUndo()).toBe(false)
	})

	test('clear redo history when new command is added', () => {
		const command1 = new MockCommand('Command 1')
		const command2 = new MockCommand('Command 2')

		history.addCommand(command1)
		command1.execute()
		history.undo()

		expect(history.canRedo()).toBe(true)

		history.addCommand(command2)
		command2.execute()

		expect(history.canRedo()).toBe(false)
		expect(history.canUndo()).toBe(true)
	})

	test('keep exactly last 10 commands when history limit exceeded', () => {
		const commands: MockCommand[] = []
		for (let i = 0; i < 12; i++) {
			const command = new MockCommand(`Command ${i}`)
			commands.push(command)
			history.addCommand(command)
			command.execute()
		}

		expect(history.canUndo()).toBe(true)

		for (let i = 0; i < 10; i++) {
			history.undo()
		}

		expect(history.canUndo()).toBe(false)

		for (let i = 0; i < 10; i++) {
			history.redo()
		}

		expect(history.canRedo()).toBe(false)
		expect(history.canUndo()).toBe(true)

		expect(commands[11].isExecuted()).toBe(true)

		for (let i = 2; i <= 11; i++) {
			expect(commands[i].isExecuted()).toBe(true)
		}
	})

	test('keep correct command available after redo history is cleared', () => {
		const command1 = new MockCommand('Command 1')
		const command2 = new MockCommand('Command 2')
		const command3 = new MockCommand('Command 3')

		history.addCommand(command1)
		command1.execute()
		history.addCommand(command2)
		command2.execute()

		history.undo()
		history.undo()

		expect(history.canRedo()).toBe(true)
		expect(history.canUndo()).toBe(false)

		history.addCommand(command3)
		command3.execute()

		expect(history.canRedo()).toBe(false)
		expect(history.canUndo()).toBe(true)

		history.undo()
		expect(command3.isUndone()).toBe(true)
		expect(history.canUndo()).toBe(false)

		expect(history.canRedo()).toBe(true)
		history.redo()
		expect(command3.isExecuted()).toBe(true)
		expect(history.canRedo()).toBe(false)

		expect(command1.isUndone()).toBe(true)
		expect(command2.isUndone()).toBe(true)
	})
})
