import {Ellipse} from '../shapes/Ellipse'
import {Group} from '../shapes/Group'
import {Rectangle} from '../shapes/Rectangle'
import {Triangle} from '../shapes/Triangle'
import {FillStyle} from '../types/FillStyle'
import {Frame} from '../types/Frame'
import {LineStyle} from '../types/LineStyle'
import {RGBA} from '../types/RGBA'

describe('Clone', () => {
	test('клонирование Rectangle создает независимую копию', () => {
		const original = new Rectangle(
			'rect1',
			new Frame(10, 20, 30, 40),
			new FillStyle(true, new RGBA(255, 0, 0, 1)),
			new LineStyle(true, new RGBA(0, 0, 0, 1), 2),
		)

		const cloned = original.clone() as Rectangle

		expect(cloned.getFrame().left).toBe(original.getFrame().left)
		expect(cloned.getFrame().top).toBe(original.getFrame().top)
		expect(cloned.getFrame().width).toBe(original.getFrame().width)
		expect(cloned.getFrame().height).toBe(original.getFrame().height)

		cloned.setFrame(new Frame(100, 200, 300, 400))

		expect(original.getFrame().left).toBe(10)
		expect(original.getFrame().top).toBe(20)
		expect(cloned.getFrame().left).toBe(100)
		expect(cloned.getFrame().top).toBe(200)
	})

	test('клонирование Ellipse создает независимую копию', () => {
		const original = new Ellipse(
			'ellipse1',
			new Frame(50, 60, 70, 80),
			new FillStyle(true, new RGBA(0, 255, 0, 1)),
			new LineStyle(true, new RGBA(0, 0, 0, 1), 1),
		)

		const cloned = original.clone() as Ellipse

		expect(cloned.getFrame().width).toBe(original.getFrame().width)
		expect(cloned.getFrame().height).toBe(original.getFrame().height)

		cloned.setFillStyle(new FillStyle(false, undefined))

		expect(original.getFillStyle().enabled).toBe(true)
		expect(cloned.getFillStyle().enabled).toBe(false)
	})

	test('клонирование Triangle создает независимую копию', () => {
		const original = new Triangle(
			'triangle1',
			new Frame(100, 100, 50, 50),
			new FillStyle(true, new RGBA(0, 0, 255, 1)),
			new LineStyle(false, undefined, 0),
		)

		const cloned = original.clone() as Triangle

		expect(cloned.getFrame().left).toBe(original.getFrame().left)

		cloned.setLineStyle(new LineStyle(true, new RGBA(255, 255, 255, 1), 5))

		expect(original.getLineStyle().enabled).toBe(false)
		expect(cloned.getLineStyle().enabled).toBe(true)
	})

	test('клонирование Group создает независимую копию со всеми фигурами', () => {
		const group = new Group('group1')
		const rect = new Rectangle(
			'rect1',
			new Frame(10, 10, 20, 20),
			new FillStyle(true, new RGBA(255, 0, 0, 1)),
			new LineStyle(true, new RGBA(0, 0, 0, 1), 1),
		)
		const ellipse = new Ellipse(
			'ellipse1',
			new Frame(50, 50, 30, 30),
			new FillStyle(true, new RGBA(0, 255, 0, 1)),
			new LineStyle(false, undefined, 0),
		)
		group.addShape(rect)
		group.addShape(ellipse)

		const cloned = group.clone() as Group

		expect(cloned.getShapes().length).toBe(2)
		expect(cloned.getFrame().left).toBe(group.getFrame().left)

		const clonedRect = cloned.getShapes()[0] as Rectangle
		clonedRect.setFrame(new Frame(100, 100, 200, 200))

		expect(rect.getFrame().left).toBe(10)
		expect(clonedRect.getFrame().left).toBe(100)
	})

	test('клонирование вложенной группы создает полную независимую копию', () => {
		const innerGroup = new Group('innerGroup')
		const rect = new Rectangle(
			'rect1',
			new Frame(10, 10, 20, 20),
			new FillStyle(true, new RGBA(255, 0, 0, 1)),
			new LineStyle(false, undefined, 0),
		)
		innerGroup.addShape(rect)

		const outerGroup = new Group('outerGroup')
		outerGroup.addShape(innerGroup)
		const ellipse = new Ellipse(
			'ellipse1',
			new Frame(50, 50, 30, 30),
			new FillStyle(true, new RGBA(0, 255, 0, 1)),
			new LineStyle(false, undefined, 0),
		)
		outerGroup.addShape(ellipse)

		const cloned = outerGroup.clone() as Group

		expect(cloned.getShapes().length).toBe(2)
		const clonedInnerGroup = cloned.getShapes()[0] as Group
		expect(clonedInnerGroup.getShapes().length).toBe(1)

		const clonedRect = clonedInnerGroup.getShapes()[0] as Rectangle
		clonedRect.setFrame(new Frame(100, 100, 200, 200))

		expect(rect.getFrame().left).toBe(10)
		expect(clonedRect.getFrame().left).toBe(100)
	})
})

