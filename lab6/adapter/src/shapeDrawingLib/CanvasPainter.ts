import {type ICanvas} from '../graphicsLib/ICanvas'
import {type ICanvasDrawable} from './ICanvasDrawable'

class CanvasPainter {
	private canvas: ICanvas

	constructor(canvas: ICanvas) {
		this.canvas = canvas
	}

	draw(drawable: ICanvasDrawable): void {
		drawable.draw(this.canvas)
	}
}

export {
	CanvasPainter,
}
