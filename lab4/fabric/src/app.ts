import {Designer} from './designer/Designer'
import {Canvas2D} from './gfx/Canvas2D'
import {Painter} from './painter/Painter'
import {ShapeFactory} from './shapes/ShapeFactory'

const canvasElement = document.getElementById('canvas') as HTMLCanvasElement
const commandInput = document.getElementById('command-input') as HTMLInputElement
const executeButton = document.getElementById('execute-button') as HTMLButtonElement
const clearButton = document.getElementById('clear-button') as HTMLButtonElement
const outputDiv = document.getElementById('output') as HTMLDivElement

const ctx = canvasElement.getContext('2d')
if (!ctx) {
	throw new Error('Failed to get canvas context')
}

const canvas2d = new Canvas2D(ctx)
const factory = new ShapeFactory()
const designer = new Designer(factory)
const painter = new Painter()

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
		const draft = designer.createDraft([command])
		painter.drawPicture(draft, canvas2d)
		addOutput(`Drawn ${draft.getShapeCount()} shape(s)`)

		commandInput.value = ''
	}
	catch (error) {
		addOutput(`Error: ${error}`)
	}
}

function clearCanvas(): void {
	ctx?.clearRect(0, 0, canvasElement.width, canvasElement.height)
	outputDiv.textContent = ''
	addOutput('Canvas cleared')
}

executeButton.addEventListener('click', executeCommand)

clearButton.addEventListener('click', clearCanvas)

commandInput.addEventListener('keypress', event => {
	if (event.key === 'Enter') {
		executeCommand()
	}
})

commandInput.focus()
