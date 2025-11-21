import {Ellipse} from '../shapes/Ellipse'
import {Group} from '../shapes/Group'
import {Rectangle} from '../shapes/Rectangle'
import {FillStyle} from '../types/FillStyle'
import {Frame} from '../types/Frame'
import {LineStyle} from '../types/LineStyle'
import {RGBA} from '../types/RGBA'

describe('Group', () => {
	describe('Frame', () => {
		test('пустая группа должна возвращать фрейм (0, 0, 0, 0)', () => {
			const group = new Group()
			const frame = group.getFrame()

			expect(frame.left).toBe(0)
			expect(frame.top).toBe(0)
			expect(frame.width).toBe(0)
			expect(frame.height).toBe(0)
		})

		test('фрейм группы должен охватывать все фигуры', () => {
			const group = new Group()
			const rect1 = new Rectangle(
				new Frame(10, 10, 20, 30),
				new FillStyle(false, undefined),
				new LineStyle(false, undefined, 0),
			)
			const rect2 = new Rectangle(
				new Frame(50, 40, 30, 20),
				new FillStyle(false, undefined),
				new LineStyle(false, undefined, 0),
			)
			group.addShape(rect1)
			group.addShape(rect2)

			const frame = group.getFrame()

			expect(frame.left).toBe(10)
			expect(frame.top).toBe(10)
			expect(frame.right).toBe(80)
			expect(frame.bottom).toBe(60)
		})

		test('при изменении фрейма группы фигуры должны масштабироваться пропорционально', () => {
			const group = new Group()
			const rect = new Rectangle(
				new Frame(10, 10, 20, 30),
				new FillStyle(false, undefined),
				new LineStyle(false, undefined, 0),
			)
			group.addShape(rect)

			const newFrame = new Frame(0, 0, 40, 60)
			group.setFrame(newFrame)

			const rectFrame = rect.getFrame()
			expect(rectFrame.left).toBe(0)
			expect(rectFrame.top).toBe(0)
			expect(rectFrame.width).toBe(40)
			expect(rectFrame.height).toBe(60)
		})

		test('при изменении фрейма группы несколько фигур должны масштабироваться и смещаться', () => {
			const group = new Group()
			const rect1 = new Rectangle(
				new Frame(10, 10, 20, 20),
				new FillStyle(false, undefined),
				new LineStyle(false, undefined, 0),
			)
			const rect2 = new Rectangle(
				new Frame(50, 50, 20, 20),
				new FillStyle(false, undefined),
				new LineStyle(false, undefined, 0),
			)
			group.addShape(rect1)
			group.addShape(rect2)

			const originalFrame = group.getFrame()
			const newFrame = new Frame(0, 0, originalFrame.width * 2, originalFrame.height * 2)
			group.setFrame(newFrame)

			const frame1 = rect1.getFrame()
			const frame2 = rect2.getFrame()

			expect(frame1.left).toBe(0)
			expect(frame1.top).toBe(0)
			expect(frame1.width).toBe(40)
			expect(frame1.height).toBe(40)

			expect(frame2.left).toBe(80)
			expect(frame2.top).toBe(80)
			expect(frame2.width).toBe(40)
			expect(frame2.height).toBe(40)
		})
	})

	describe('FillStyle', () => {
		test('если все фигуры имеют одинаковую заливку, группа должна возвращать это значение', () => {
			const group = new Group()
			const color = new RGBA(255, 0, 0, 1)
			const rect1 = new Rectangle(
				new Frame(0, 0, 10, 10),
				new FillStyle(true, color),
				new LineStyle(false, undefined, 0),
			)
			const rect2 = new Rectangle(
				new Frame(20, 20, 10, 10),
				new FillStyle(true, color),
				new LineStyle(false, undefined, 0),
			)
			group.addShape(rect1)
			group.addShape(rect2)

			const style = group.getFillStyle()

			expect(style.enabled).toBe(true)
			expect(style.color).toBeDefined()
			expect(style.color?.equals(color)).toBe(true)
		})

		test('если фигуры имеют разную заливку, группа должна возвращать undefined для цвета', () => {
			const group = new Group()
			const rect1 = new Rectangle(
				new Frame(0, 0, 10, 10),
				new FillStyle(true, new RGBA(255, 0, 0, 1)),
				new LineStyle(false, undefined, 0),
			)
			const rect2 = new Rectangle(
				new Frame(20, 20, 10, 10),
				new FillStyle(true, new RGBA(0, 255, 0, 1)),
				new LineStyle(false, undefined, 0),
			)
			group.addShape(rect1)
			group.addShape(rect2)

			const style = group.getFillStyle()

			expect(style.enabled).toBe(true)
			expect(style.color).toBeUndefined()
		})

		test('при установке заливки группы все фигуры должны получить новую заливку', () => {
			const group = new Group()
			const rect1 = new Rectangle(
				new Frame(0, 0, 10, 10),
				new FillStyle(true, new RGBA(255, 0, 0, 1)),
				new LineStyle(false, undefined, 0),
			)
			const rect2 = new Rectangle(
				new Frame(20, 20, 10, 10),
				new FillStyle(true, new RGBA(0, 255, 0, 1)),
				new LineStyle(false, undefined, 0),
			)
			group.addShape(rect1)
			group.addShape(rect2)

			const newColor = new RGBA(0, 0, 255, 1)
			group.setFillStyle(new FillStyle(true, newColor))

			expect(rect1.getFillStyle().color?.equals(newColor)).toBe(true)
			expect(rect2.getFillStyle().color?.equals(newColor)).toBe(true)
		})
	})

	describe('LineStyle', () => {
		test('если все фигуры имеют одинаковую обводку, группа должна возвращать это значение', () => {
			const group = new Group()
			const color = new RGBA(0, 0, 255, 1)
			const width = 2
			const rect1 = new Rectangle(
				new Frame(0, 0, 10, 10),
				new FillStyle(false, undefined),
				new LineStyle(true, color, width),
			)
			const rect2 = new Rectangle(
				new Frame(20, 20, 10, 10),
				new FillStyle(false, undefined),
				new LineStyle(true, color, width),
			)
			group.addShape(rect1)
			group.addShape(rect2)

			const style = group.getLineStyle()

			expect(style.enabled).toBe(true)
			expect(style.color).toBeDefined()
			expect(style.color?.equals(color)).toBe(true)
			expect(style.lineWidth).toBe(width)
		})

		test('если фигуры имеют разную обводку, группа должна возвращать undefined для цвета и 0 для ширины', () => {
			const group = new Group()
			const rect1 = new Rectangle(
				new Frame(0, 0, 10, 10),
				new FillStyle(false, undefined),
				new LineStyle(true, new RGBA(255, 0, 0, 1), 2),
			)
			const rect2 = new Rectangle(
				new Frame(20, 20, 10, 10),
				new FillStyle(false, undefined),
				new LineStyle(true, new RGBA(0, 255, 0, 1), 3),
			)
			group.addShape(rect1)
			group.addShape(rect2)

			const style = group.getLineStyle()

			expect(style.enabled).toBe(true)
			expect(style.color).toBeUndefined()
			expect(style.lineWidth).toBe(0)
		})

		test('при установке обводки группы все фигуры должны получить новую обводку', () => {
			const group = new Group()
			const rect1 = new Rectangle(
				new Frame(0, 0, 10, 10),
				new FillStyle(false, undefined),
				new LineStyle(true, new RGBA(255, 0, 0, 1), 1),
			)
			const rect2 = new Rectangle(
				new Frame(20, 20, 10, 10),
				new FillStyle(false, undefined),
				new LineStyle(true, new RGBA(0, 255, 0, 1), 2),
			)
			group.addShape(rect1)
			group.addShape(rect2)

			const newColor = new RGBA(0, 0, 255, 1)
			const newWidth = 5
			group.setLineStyle(new LineStyle(true, newColor, newWidth))

			expect(rect1.getLineStyle().color?.equals(newColor)).toBe(true)
			expect(rect1.getLineStyle().lineWidth).toBe(newWidth)
			expect(rect2.getLineStyle().color?.equals(newColor)).toBe(true)
			expect(rect2.getLineStyle().lineWidth).toBe(newWidth)
		})
	})

	describe('Вложенные группы', () => {
		test('фрейм группы с вложенной группой должен охватывать все фигуры', () => {
			const innerGroup = new Group()
			const rect1 = new Rectangle(
				new Frame(10, 10, 20, 20),
				new FillStyle(false, undefined),
				new LineStyle(false, undefined, 0),
			)
			innerGroup.addShape(rect1)

			const outerGroup = new Group()
			outerGroup.addShape(innerGroup)
			const rect2 = new Rectangle(
				new Frame(50, 50, 20, 20),
				new FillStyle(false, undefined),
				new LineStyle(false, undefined, 0),
			)
			outerGroup.addShape(rect2)

			const frame = outerGroup.getFrame()

			expect(frame.left).toBe(10)
			expect(frame.top).toBe(10)
			expect(frame.right).toBe(70)
			expect(frame.bottom).toBe(70)
		})
	})
})

