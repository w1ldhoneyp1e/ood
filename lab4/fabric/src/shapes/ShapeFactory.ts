/* eslint-disable max-params */
import {Color} from '../Color'
import {type ParsedCommand, CommandParser} from '../commands/CommandParser'
import {Circle} from './Circle'
import {Ellipse} from './Ellipse'
import {type IShapeFactory} from './IShapeFactory'
import {Line} from './Line'
import {Rectangle} from './Rectangle'
import {RegularPolygon} from './RegularPolygon'
import {type Shape} from './Shape'
import {Text} from './Text'
import {Triangle} from './Triangle'

class ShapeFactory implements IShapeFactory {
	private parser: CommandParser

	constructor() {
		this.parser = new CommandParser()
	}

	createShape(description: string): Shape {
		const parsed = this.parser.parse(description)
		return this.createShapeFromParsed(parsed)
	}

	private createShapeFromParsed(parsed: ParsedCommand): Shape {
		const {
			type,
			color,
			args,
			text,
		} = parsed

		switch (type) {
			case 'rectangle':
				return this.createRectangle(color, args[0], args[1], args[2], args[3])
			case 'triangle':
				return this.createTriangle(color, args[0], args[1], args[2], args[3], args[4], args[5])
			case 'ellipse':
				return this.createEllipse(color, args[0], args[1], args[2], args[3])
			case 'polygon':
				return this.createPolygon(color, args[0], args[1], args[2], args[3])
			case 'circle':
				return this.createCircle(color, args[0], args[1], args[2])
			case 'line':
				return this.createLine(color, args[0], args[1], args[2], args[3])
			case 'text':
				return this.createText(color, args[0], args[1], args[2], text!)
			default:
				throw new Error(`Unknown shape type: ${type}`)
		}
	}
	private createRectangle(colorStr: string, left: number, top: number, right: number, bottom: number): Rectangle {
		const color = new Color(colorStr)
		return new Rectangle({
			color,
			left,
			top,
			right,
			bottom,
		})
	}

	private createTriangle(
		colorStr: string,
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		x3: number,
		y3: number,
	): Triangle {
		const color = new Color(colorStr)
		return new Triangle({
			color,
			x1,
			y1,
			x2,
			y2,
			x3,
			y3,
		})
	}

	private createEllipse(colorStr: string, cx: number, cy: number, rx: number, ry: number): Ellipse {
		const color = new Color(colorStr)
		return new Ellipse({
			color,
			cx,
			cy,
			rx,
			ry,
		})
	}

	private createPolygon(
		colorStr: string,
		cx: number,
		cy: number,
		radius: number,
		vertexCount: number,
	): RegularPolygon {
		const color = new Color(colorStr)
		return new RegularPolygon({
			color,
			cx,
			cy,
			radius,
			vertexCount,
		})
	}

	private createCircle(colorStr: string, cx: number, cy: number, radius: number): Circle {
		const color = new Color(colorStr)
		return new Circle({
			color,
			cx,
			cy,
			radius,
		})
	}

	private createLine(colorStr: string, x1: number, y1: number, x2: number, y2: number): Line {
		const color = new Color(colorStr)
		return new Line({
			color,
			x1,
			y1,
			x2,
			y2,
		})
	}

	private createText(colorStr: string, left: number, top: number, fontSize: number, text: string): Text {
		const color = new Color(colorStr)
		return new Text({
			color,
			left,
			top,
			fontSize,
			text,
		})
	}
}

export {
	ShapeFactory,
}
