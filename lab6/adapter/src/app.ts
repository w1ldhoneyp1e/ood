import * as readline from 'readline'
import {ModernGraphicsRendererClassAdapter} from './adapter/ClassAdapter'
import {ModernGraphicsRendererAdapter} from './adapter/ObjectAdapter'
import {Canvas} from './graphicsLib/Canvas'
import {ModernGraphicsRenderer} from './modernGraphicsLib/ModernGraphicsRenderer'
import {CanvasPainter} from './shapeDrawingLib/CanvasPainter'
import {Rectangle} from './shapeDrawingLib/Rectangle'
import {Triangle} from './shapeDrawingLib/Triangle'

function paintPicture(painter: CanvasPainter): void {
	const triangle = new Triangle({
		x: 10,
		y: 15,
	}, {
		x: 100,
		y: 200,
	}, {
		x: 150,
		y: 250,
	})
	const rectangle = new Rectangle({
		x: 30,
		y: 40,
	}, 18, 24)
	painter.draw(rectangle)
	painter.draw(triangle)
}

function paintPictureOnCanvas(): void {
	const simpleCanvas = new Canvas()
	const painter = new CanvasPainter(simpleCanvas)
	paintPicture(painter)
}

function paintPictureOnModernGraphicsRenderer(): void {
	const renderer = new ModernGraphicsRenderer(process.stdout)
	const adapter = new ModernGraphicsRendererAdapter(renderer)
	const painter = new CanvasPainter(adapter)
	paintPicture(painter)
	adapter.endDraw()
}

function paintPictureOnModernGraphicsRendererWithClassAdapter(): void {
	const adapter = new ModernGraphicsRendererClassAdapter(process.stdout)
	const painter = new CanvasPainter(adapter)
	paintPicture(painter)
	adapter.endDraw()
}

function promptUser(rl: readline.Interface): Promise<string> {
	return new Promise(resolve => {
		rl.question('Используем новое API (y/n)? ', answer => {
			resolve(answer)
		})
	})
}

async function main(): Promise<void> {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	try {
		const userInput = await promptUser(rl)
		if (userInput === 'y' || userInput === 'Y') {
			paintPictureOnModernGraphicsRenderer()
		}
		else {
			paintPictureOnCanvas()
		}
	}
	catch (error) {
		console.error('Error:', error instanceof Error
			? error.message
			: 'Unknown error')
	}
	finally {
		rl.close()
	}
}

export {
	main,
	paintPicture,
	paintPictureOnCanvas,
	paintPictureOnModernGraphicsRenderer,
	paintPictureOnModernGraphicsRendererWithClassAdapter,
}
