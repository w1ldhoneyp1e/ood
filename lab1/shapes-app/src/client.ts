import {ShapesApp} from './app'

const canvasElement = document.getElementById('canvas') as HTMLCanvasElement
const commandInput = document.getElementById('commandInput') as HTMLInputElement
const executeBtn = document.getElementById('executeBtn') as HTMLButtonElement
const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement
const outputDiv = document.getElementById('output') as HTMLDivElement

const ctx = canvasElement.getContext('2d')
if (!ctx) {
	throw new Error('Failed to get canvas context')
}

const app = new ShapesApp(ctx)

function addOutput(text: string): void {
	outputDiv.textContent += `${text}\n`
	outputDiv.scrollTop = outputDiv.scrollHeight
}

function executeCommand(): void {
	const command = commandInput.value.trim()
	if (!command) {
		return
	}

	addOutput(command)

	try {
		const result = app.processInput(command)
		addOutput(result)

		const commandLower = command.toLowerCase()
		if (commandLower.startsWith('drawpicture') || commandLower.startsWith('drawshape')) {
			app.render()
		}

		commandInput.value = ''
	}
	catch (error) {
		addOutput(`Error: ${error}`)
	}
}

function clearCanvas(): void {
	ctx?.clearRect(0, 0, canvasElement.width, canvasElement.height)
	addOutput('Canvas cleared')
}

executeBtn.addEventListener('click', executeCommand)

clearBtn.addEventListener('click', clearCanvas)

commandInput.addEventListener('keypress', event => {
	if (event.key === 'Enter') {
		executeCommand()
	}
})

commandInput.focus()
