const ws = new WebSocket('ws://localhost:3000')
const content = document.getElementById('content')

ws.onmessage = event => {
	const data = JSON.parse(event.data)
	content!.innerHTML = data.data
}
