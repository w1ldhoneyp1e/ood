import {type ICanvas} from '../ICanvas'
import {type IShape} from '../types'

interface IDrawStrategy {
	draw: (shape: IShape, canvas: ICanvas) => void,
}

export {
	type IDrawStrategy,
}

