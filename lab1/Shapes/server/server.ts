import {exec} from 'child_process'
import {existsSync, readFileSync} from 'fs'
import {createServer} from 'http'
import {join, resolve} from 'path'
import readline from 'readline'

const ws = await import('ws')
const {WebSocketServer} = ws

const PORT = 3000
const server = createServer()
const wss = new WebSocketServer({server})

interface AppState {
	data: string,
}

const appState: AppState = {
	data: 'Ready',
}

const clients: any[] = []

wss.on('connection', (_ws: any) => {
	clients.push(_ws)
	_ws.send(JSON.stringify({
		type: 'INIT',
		data: appState,
	}))

	_ws.on('close', () => {
		const index = clients.indexOf(_ws)
		if (index > -1) {
			clients.splice(index, 1)
		}
	})
})

function updateAllClients(): void {
	const message = JSON.stringify({
		type: 'UPDATE',
		data: appState,
	})
	clients.forEach(client => {
		if (client.readyState === 1) {
			client.send(message)
		}
	})
}

const rootDir = resolve(process.cwd())
const publicDir = join(rootDir, 'public')

server.on('request', (req, res) => {
	const path = req.url === '/'
		? '/index.html'
		: req.url!
	const filePath = join(publicDir, path)

	if (existsSync(filePath)) {
		const content = readFileSync(filePath)
		res.writeHead(200)
		res.end(content)
	}
	else {
		res.writeHead(404)
		res.end('Not found')
	}
})

function processCommand(input: string): void {
	appState.data = input
	updateAllClients()
}

function startInteractiveMode(): void {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	rl.on('line', (input: string) => {
		processCommand(input)
	})

	rl.on('close', () => {
		process.exit(0)
	})
}

server.listen(PORT, () => {
	const command = process.platform === 'win32'
		? `start http://localhost:${PORT}`
		: process.platform === 'darwin'
			? `open http://localhost:${PORT}`
			: `xdg-open http://localhost:${PORT}`

	exec(command)
	console.log(`Server running at http://localhost:${PORT}`)
	startInteractiveMode()
})
