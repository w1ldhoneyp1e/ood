import {type Shape} from './Shape'

interface IShapeFactory {
	createShape: (description: string) => Shape,
}

export {
	IShapeFactory,
}

