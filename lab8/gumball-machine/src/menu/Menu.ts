import type * as readline from 'readline'

interface ICommand {
	execute: (...args: any[]) => void,
}

class Menu {
	private commands = new Map<string, {
		command: ICommand | (() => void),
	}>()
	private rl: readline.Interface
	private running = false

	constructor(rl: readline.Interface) {
		this.rl = rl
	}

	addItem(shortcut: string, command: ICommand | (() => void)): void {
		this.commands.set(shortcut, {
			command,
		})
	}

	exit(): void {
		this.running = false
	}

	run(): void {
		this.running = true
		this.prompt()
	}

	private prompt(): void {
		if (!this.running) {
			this.rl.close()
			return
		}

		this.rl.question('', input => {
			this.executeCommand(input.trim())
			this.prompt()
		})
	}

	executeCommand(input: string): void {
		const parts = input.split(' ')
		const name = parts[0]
		const args = parts.slice(1)

		const item = this.commands.get(name)
		if (item) {
			if (typeof item.command === 'function') {
				item.command()
			}
			else {
				item.command.execute(...args)
			}
		}
		else {
			console.log('Unknown command')
		}
	}
}

export {
	Menu,
	ICommand,
}

