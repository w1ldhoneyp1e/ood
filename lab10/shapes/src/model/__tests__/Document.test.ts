import {Document} from '../Document'
import {type Rect, type ShapeType} from '../types'

describe('Document', () => {
	let document: Document

	beforeEach(() => {
		document = new Document()
	})

	describe('addShape', () => {
		it('должен добавлять фигуру и возвращать её id', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const id = document.addShape('rectangle', frame)

			expect(id).toBe('shape-1')
			const snapshot = document.getSnapshot()
			expect(snapshot).toHaveLength(1)
			expect(snapshot[0].id).toBe('shape-1')
			expect(snapshot[0].type).toBe('rectangle')
			expect(snapshot[0].frame).toEqual(frame)
		})

		it('должен увеличивать счётчик для каждой новой фигуры', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const id1 = document.addShape('rectangle', frame)
			const id2 = document.addShape('ellipse', frame)

			expect(id1).toBe('shape-1')
			expect(id2).toBe('shape-2')
		})

		it('должен поддерживать все типы фигур', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const types: ShapeType[] = ['rectangle', 'ellipse', 'triangle']

			types.forEach((type, index) => {
				const id = document.addShape(type, frame)
				expect(id).toBe(`shape-${index + 1}`)
			})

			const snapshot = document.getSnapshot()
			expect(snapshot).toHaveLength(3)
			expect(snapshot[0].type).toBe('rectangle')
			expect(snapshot[1].type).toBe('ellipse')
			expect(snapshot[2].type).toBe('triangle')
		})
	})

	describe('removeShape', () => {
		it('должен удалять фигуру по id', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const id = document.addShape('rectangle', frame)

			const result = document.removeShape(id)
			expect(result).toBe(true)

			const snapshot = document.getSnapshot()
			expect(snapshot).toHaveLength(0)
		})

		it('должен возвращать false если фигура не найдена', () => {
			const result = document.removeShape('non-existent-id')
			expect(result).toBe(false)
		})
	})

	describe('setFrame', () => {
		it('должен обновлять frame фигуры без создания команды', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const id = document.addShape('rectangle', frame)

			const newFrame: Rect = {
				x: 30,
				y: 40,
				width: 150,
				height: 80,
			}
			const result = document.setFrame(id, newFrame)

			expect(result).toBe(true)
			const snapshot = document.getSnapshot()
			expect(snapshot[0].frame).toEqual(newFrame)
		})

		it('должен нормализовать размеры до минимума 10', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const id = document.addShape('rectangle', frame)

			const newFrame: Rect = {
				x: 30,
				y: 40,
				width: 5,
				height: 3,
			}
			document.setFrame(id, newFrame)

			const snapshot = document.getSnapshot()
			expect(snapshot[0].frame.width).toBe(10)
			expect(snapshot[0].frame.height).toBe(10)
		})

		it('должен создавать команду при createCommand=true', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const id = document.addShape('rectangle', frame)
			const startFrame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}

			const newFrame: Rect = {
				x: 30,
				y: 40,
				width: 150,
				height: 80,
			}
			const result = document.setFrame(id, newFrame, true, startFrame)

			expect(result).toBe(true)
			expect(document.canUndo()).toBe(true)

			document.undo()
			const snapshot = document.getSnapshot()
			expect(snapshot[0].frame).toEqual(startFrame)
		})

		it('должен возвращать false если фигура не найдена', () => {
			const newFrame: Rect = {
				x: 30,
				y: 40,
				width: 150,
				height: 80,
			}
			const result = document.setFrame('non-existent-id', newFrame)

			expect(result).toBe(false)
		})
	})

	describe('moveShape', () => {
		it('должен перемещать фигуру в пределах лимитов', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const id = document.addShape('rectangle', frame)
			const limits: Rect = {
				x: 0,
				y: 0,
				width: 500,
				height: 500,
			}

			const result = document.moveShape(id, 50, 60, limits)

			expect(result).toBe(true)
			const snapshot = document.getSnapshot()
			expect(snapshot[0].frame.x).toBe(50)
			expect(snapshot[0].frame.y).toBe(60)
		})

		it('должен ограничивать перемещение границами', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const id = document.addShape('rectangle', frame)
			const limits: Rect = {
				x: 0,
				y: 0,
				width: 200,
				height: 200,
			}

			document.moveShape(id, 150, 200, limits)

			const snapshot = document.getSnapshot()
			expect(snapshot[0].frame.x).toBe(100)
			expect(snapshot[0].frame.y).toBe(150)
		})

		it('должен ограничивать перемещение нулём', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const id = document.addShape('rectangle', frame)
			const limits: Rect = {
				x: 0,
				y: 0,
				width: 500,
				height: 500,
			}

			document.moveShape(id, -10, -20, limits)

			const snapshot = document.getSnapshot()
			expect(snapshot[0].frame.x).toBe(0)
			expect(snapshot[0].frame.y).toBe(0)
		})

		it('должен возвращать false если фигура не найдена', () => {
			const limits: Rect = {
				x: 0,
				y: 0,
				width: 500,
				height: 500,
			}
			const result = document.moveShape('non-existent-id', 50, 60, limits)

			expect(result).toBe(false)
		})
	})

	describe('moveShapeWithCommand', () => {
		it('должен перемещать фигуру с созданием команды', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const id = document.addShape('rectangle', frame)
			const limits: Rect = {
				x: 0,
				y: 0,
				width: 500,
				height: 500,
			}
			const startFrame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}

			const result = document.moveShapeWithCommand(id, limits, startFrame)

			expect(result).toBe(true)
			expect(document.canUndo()).toBe(true)

			document.undo()
			const snapshot = document.getSnapshot()
			expect(snapshot[0].frame).toEqual(startFrame)
		})

		it('должен возвращать false если фигура не найдена', () => {
			const limits: Rect = {
				x: 0,
				y: 0,
				width: 500,
				height: 500,
			}
			const startFrame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const result = document.moveShapeWithCommand('non-existent-id', limits, startFrame)

			expect(result).toBe(false)
		})
	})

	describe('undo/redo', () => {
		it('должен отменять последнюю команду', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const id = document.addShape('rectangle', frame)

			expect(document.canUndo()).toBe(true)
			const affectedId = document.undo()

			expect(affectedId).toBe(id)
			expect(document.getSnapshot()).toHaveLength(0)
			expect(document.canUndo()).toBe(false)
		})

		it('должен повторять отменённую команду', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const id = document.addShape('rectangle', frame)

			document.undo()
			expect(document.canRedo()).toBe(true)

			const affectedId = document.redo()
			expect(affectedId).toBe(id)
			expect(document.getSnapshot()).toHaveLength(1)
		})

		it('должен возвращать null если нет команд для отмены', () => {
			expect(document.canUndo()).toBe(false)
			const result = document.undo()
			expect(result).toBeNull()
		})

		it('должен возвращать null если нет команд для повтора', () => {
			expect(document.canRedo()).toBe(false)
			const result = document.redo()
			expect(result).toBeNull()
		})

		it('должен правильно обрабатывать цепочку команд', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			document.addShape('rectangle', frame)
			document.addShape('ellipse', frame)

			expect(document.getSnapshot()).toHaveLength(2)

			document.undo()
			expect(document.getSnapshot()).toHaveLength(1)

			document.undo()
			expect(document.getSnapshot()).toHaveLength(0)

			document.redo()
			expect(document.getSnapshot()).toHaveLength(1)

			document.redo()
			expect(document.getSnapshot()).toHaveLength(2)
		})
	})

	describe('subscribe', () => {
		it('должен вызывать подписчиков при изменении', done => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			const unsubscribe = document.subscribe(() => {
				unsubscribe()
				done()
			})

			document.addShape('rectangle', frame)
		})

		it('должен позволять отписываться', done => {
			let callCount = 0
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}

			const unsubscribe = document.subscribe(() => {
				callCount++
			})

			document.addShape('rectangle', frame)

			queueMicrotask(() => {
				unsubscribe()
				document.addShape('ellipse', frame)

				queueMicrotask(() => {
					expect(callCount).toBe(1)
					done()
				})
			})
		})
	})

	describe('getSnapshot', () => {
		it('должен возвращать копии фигур', () => {
			const frame: Rect = {
				x: 10,
				y: 20,
				width: 100,
				height: 50,
			}
			document.addShape('rectangle', frame)

			const snapshot1 = document.getSnapshot()
			const snapshot2 = document.getSnapshot()

			expect(snapshot1).not.toBe(snapshot2)
			expect(snapshot1[0]).not.toBe(snapshot2[0])
			expect(snapshot1[0].frame).not.toBe(snapshot2[0].frame)
		})
	})
})

