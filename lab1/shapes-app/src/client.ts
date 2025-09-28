import {ShapesApp} from './app'

const canvasElement = document.getElementById('canvas') as HTMLCanvasElement

const ctx = canvasElement.getContext('2d')
if (!ctx) {
	throw new Error('Приехали')
}

const app = new ShapesApp(ctx)

const WS_PORT = 3000
const socket = new WebSocket(`ws://localhost:${WS_PORT}`)

socket.onopen = () => {
	console.log('Client connected')
}

socket.onclose = () => {
	console.warn('Client disconnected')
}

socket.onerror = error => {
	console.error('WS Error:', error)
}

socket.onmessage = event => {
	try {
		const message = JSON.parse(event.data)

		if (message.type === 'status') {
		}

		else if (message.type === 'output') {
			if (message.originalInput) {
				const inputLower = message.originalInput.toLowerCase()

				if (inputLower.startsWith('drawpicture') || inputLower.startsWith('drawshape')) {
					app.render()
				}
			}
		}
	}
	catch (e) {
		console.error('Failed to parse:', event.data, e)
	}
}
