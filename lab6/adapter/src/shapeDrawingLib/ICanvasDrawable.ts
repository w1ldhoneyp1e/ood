import {type ICanvas} from '../graphicsLib/ICanvas'

interface ICanvasDrawable {
	draw: (canvas: ICanvas) => void,
}

export {
	ICanvasDrawable,
}
