import {createServer} from 'http'
import readline from 'readline'
import {WebSocketServer} from 'ws'
import {ShapesApp} from '../src/app'

const PORT = 3000
const server = createServer()
const wss = new WebSocketServer({server})

const app = new ShapesApp()
const clients: any[] = []

wss.on('connection', ws => {
	console.log('New WebSocket connection')

	clients.push(ws)
	ws.send(JSON.stringify({
		type: 'status',
		data: 'Connected',
	}))

	ws.on('close', () => {
		console.log('WebSocket connection closed')

		const index = clients.indexOf(ws)
		if (index > -1) {
			clients.splice(index, 1)
		}
	})
})

function updateAllClients(message: string): void {
	clients.forEach(client => {
		if (client.readyState === 1) {
			client.send(JSON.stringify({
				type: 'output',
				data: message,
			}))
		}
	})
}

function startInteractiveMode(): void {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	console.log('Shapes App started. Enter commands:')

	rl.on('line', (input: string) => {
		try {
			const result = app.processInput(input)

			clients.forEach(client => {
				if (client.readyState === 1) {
					client.send(JSON.stringify({
						type: 'output',
						data: result,
						originalInput: input,
					}))
				}
			})
		}
		catch (error) {
			console.log('Error:', error)
			updateAllClients(`Error: ${error}`)
		}
	})
}

server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`)
	startInteractiveMode()
})
