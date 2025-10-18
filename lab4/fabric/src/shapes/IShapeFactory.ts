import {type Circle} from './Circle'
import {type Ellipse} from './Ellipse'
import {type Line} from './Line'
import {type Rectangle} from './Rectangle'
import {type RegularPolygon} from './RegularPolygon'
import {type Shape} from './Shape'
import {type Text} from './Text'
import {type Triangle} from './Triangle'

interface IShapeFactory {
	createShape: (description: string) => Shape,
}

export {
	IShapeFactory,
}

