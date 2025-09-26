import {exec} from 'child_process'
import {createServer} from 'http'
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
	data: '',
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

const html = `
<!DOCTYPE html>
<html>
<head>
    <title>App</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 20px;
        }
        .container {
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Application</h1>
        <div id="content"></div>
    </div>

    <script>
        const ws = new WebSocket('ws://localhost:${PORT}');
        const content = document.getElementById('content');
        
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            content.innerHTML = data.data;
        };
    </script>
</body>
</html>
`

server.on('request', (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/html'})
	res.end(html)
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
		rl.prompt()
	})

	rl.on('close', () => {
		process.exit(0)
	})
}

server.listen(PORT, () => {
	const command = process.platform === 'win32'
		? 'start http://localhost:' + PORT
		: process.platform === 'darwin'
			? 'open http://localhost:' + PORT
			: 'xdg-open http://localhost:' + PORT

	exec(command)

	startInteractiveMode()
})
