import {Ellipse} from '../shapes/Ellipse'
import {Group} from '../shapes/Group'
import {Rectangle} from '../shapes/Rectangle'
import {Triangle} from '../shapes/Triangle'
import {type Slide} from '../Slide'
import {FillStyle} from '../types/FillStyle'
import {Frame} from '../types/Frame'
import {LineStyle} from '../types/LineStyle'
import {RGBA} from '../types/RGBA'

export class CommandParser {
	parseCommand(command: string, currentSlide: Slide): Slide {
		const trimmed = command.trim()
		if (!trimmed) {
			return currentSlide
		}

		const parts = trimmed.split(/\s+/)
		if (parts.length === 0) {
			return currentSlide
		}

		const action = parts[0].toLowerCase()

		if (action === 'add') {
			return this.handleAdd(parts.slice(1), currentSlide)
		}

		if (action === 'create') {
			return this.handleCreate(parts.slice(1), currentSlide)
		}

		throw new Error(`Неизвестная команда: ${action}`)
	}

	private handleAdd(parts: string[], slide: Slide): Slide {
		if (parts.length === 0) {
			throw new Error('Не указан тип фигуры')
		}

		const shapeType = parts[0].toLowerCase()
		const args = parts.slice(1)

		let newSlide: Slide
		switch (shapeType) {
			case 'rectangle':
				newSlide = this.addRectangle(args, slide)
				break
			case 'ellipse':
				newSlide = this.addEllipse(args, slide)
				break
			case 'triangle':
				newSlide = this.addTriangle(args, slide)
				break
			default:
				throw new Error(`Неизвестный тип фигуры: ${shapeType}`)
		}

		return newSlide
	}

	private addRectangle(args: string[], slide: Slide): Slide {
		if (args.length < 7) {
			throw new Error('Недостаточно аргументов для прямоугольника. Формат: x y width height fillColor lineColor lineWidth')
		}

		const x = parseFloat(args[0])
		const y = parseFloat(args[1])
		const width = parseFloat(args[2])
		const height = parseFloat(args[3])
		const fillColor = this.parseColor(args[4])
		const lineColor = this.parseColor(args[5])
		const lineWidth = parseFloat(args[6])

		if (isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height) || isNaN(lineWidth)) {
			throw new Error('Некорректные числовые значения')
		}

		const id = slide.generateId()
		const rectangle = new Rectangle(
			id,
			new Frame(x, y, width, height),
			new FillStyle(true, fillColor),
			new LineStyle(true, lineColor, lineWidth),
		)

		slide.addShape(rectangle)

		return slide
	}

	private addEllipse(args: string[], slide: Slide): Slide {
		if (args.length < 7) {
			throw new Error('Недостаточно аргументов для эллипса. Формат: x y width height fillColor lineColor lineWidth')
		}

		const x = parseFloat(args[0])
		const y = parseFloat(args[1])
		const width = parseFloat(args[2])
		const height = parseFloat(args[3])
		const fillColor = this.parseColor(args[4])
		const lineColor = this.parseColor(args[5])
		const lineWidth = parseFloat(args[6])

		if (isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height) || isNaN(lineWidth)) {
			throw new Error('Некорректные числовые значения')
		}

		const id = slide.generateId()
		const ellipse = new Ellipse(
			id,
			new Frame(x, y, width, height),
			new FillStyle(true, fillColor),
			new LineStyle(true, lineColor, lineWidth),
		)

		slide.addShape(ellipse)

		return slide
	}

	private addTriangle(args: string[], slide: Slide): Slide {
		if (args.length < 7) {
			throw new Error('Недостаточно аргументов для треугольника. Формат: x y width height fillColor lineColor lineWidth')
		}

		const x = parseFloat(args[0])
		const y = parseFloat(args[1])
		const width = parseFloat(args[2])
		const height = parseFloat(args[3])
		const fillColor = this.parseColor(args[4])
		const lineColor = this.parseColor(args[5])
		const lineWidth = parseFloat(args[6])

		if (isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height) || isNaN(lineWidth)) {
			throw new Error('Некорректные числовые значения')
		}

		const id = slide.generateId()
		const triangle = new Triangle(
			id,
			new Frame(x, y, width, height),
			new FillStyle(true, fillColor),
			new LineStyle(true, lineColor, lineWidth),
		)

		slide.addShape(triangle)

		return slide
	}

	private handleCreate(parts: string[], slide: Slide): Slide {
		if (parts.length === 0) {
			throw new Error('Не указан тип объекта для создания')
		}

		const objectType = parts[0].toLowerCase()
		const args = parts.slice(1)

		if (objectType === 'group') {
			return this.createGroup(args, slide)
		}

		throw new Error(`Неизвестный тип объекта: ${objectType}`)
	}

	private createGroup(args: string[], slide: Slide): Slide {
		if (args.length < 2) {
			throw new Error('Недостаточно аргументов для создания группы. Формат: create group <id1> <id2> ...')
		}

		const groupId = slide.generateId()
		const group = new Group(groupId)

		const shapeIds = args
		for (const shapeId of shapeIds) {
			const shape = slide.getShapeById(shapeId)
			if (!shape) {
				throw new Error(`Фигура с ID "${shapeId}" не найдена`)
			}
			group.addShape(shape)
			slide.removeShape(shape)
		}

		slide.addShape(group)

		return slide
	}

	private parseColor(colorStr: string): RGBA {
		if (colorStr.startsWith('#')) {
			return this.parseHexColor(colorStr)
		}

		if (colorStr.startsWith('rgb')) {
			return this.parseRgbColor(colorStr)
		}

		throw new Error(`Некорректный формат цвета: ${colorStr}`)
	}

	private parseHexColor(hex: string): RGBA {
		const cleanHex = hex.replace('#', '')
		if (cleanHex.length !== 6) {
			throw new Error(`Некорректный hex цвет: ${hex}`)
		}

		const r = parseInt(cleanHex.substring(0, 2), 16)
		const g = parseInt(cleanHex.substring(2, 4), 16)
		const b = parseInt(cleanHex.substring(4, 6), 16)

		return new RGBA(r, g, b, 1)
	}

	private parseRgbColor(rgb: string): RGBA {
		const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
		if (!match) {
			throw new Error(`Некорректный RGB цвет: ${rgb}`)
		}

		const r = parseInt(match[1], 10)
		const g = parseInt(match[2], 10)
		const b = parseInt(match[3], 10)
		const a = match[4]
			? parseFloat(match[4])
			: 1

		return new RGBA(r, g, b, a)
	}
}

