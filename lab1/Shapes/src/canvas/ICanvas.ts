interface ICanvas {
	setColor: (color: string) => void,
	moveTo: (x: number, y: number) => void,
	lineTo: (x: number, y: number) => void,
	drawEllipse: (cx: number, cy: number, rx: number, ry: number) => void,
	drawText: (left: number, top: number, fontSize: number, text: string) => void,
}

export {
	ICanvas,
}
