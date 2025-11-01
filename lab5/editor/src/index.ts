import * as readline from 'readline'
import {CommandManager} from './classes/CommandManager'
import {Document} from './classes/Document'
import {CommandParser} from './parser/CommandParser'

async function main(): Promise<void> {
	const document = new Document()
	const parser = new CommandParser()
	const commandManager = new CommandManager(document)

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	while (true) {
		try {
			const input = await promptUser(rl)

			if (input.toLowerCase() === 'exit') {
				break
			}

			if (input.trim() === '') {
				continue
			}

			const parsed = parser.parseCommand(input)
			const result = commandManager.processCommand(parsed)
			console.log(result)
			console.log()

		}
		catch (error) {
			console.error('Произошла ошибка:', error instanceof Error
				? error.message
				: 'Неизвестная ошибка')
		}
	}

	rl.close()
}

function promptUser(rl: readline.Interface): Promise<string> {
	return new Promise(resolve => {
		rl.question('> ', answer => {
			resolve(answer)
		})
	})
}

main().catch(error => {
	console.error('Критическая ошибка:', error)
	process.exit(1)
})
